import { CollectionPoint, PointSearchFilters } from '../types';
import { INITIAL_COLLECTION_POINTS } from '../data/mockData';
import { apiGateway } from './apiClient';

// Search & Map Service (corresponds to ISearch / SearchService in UML)
class SearchService {
  private points: CollectionPoint[] = [];

  constructor() {
    // Load persisted local points or initial mock
    const saved = localStorage.getItem('ecocircuito_points');
    if (saved) {
      try {
        this.points = JSON.parse(saved);
      } catch {
        this.points = [...INITIAL_COLLECTION_POINTS];
      }
    } else {
      this.points = [...INITIAL_COLLECTION_POINTS];
    }
  }

  // Calculate distance between two coordinates using Haversine formula (km)
  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }

  // Impartial Search & Filter Algorithm (RF01, RF09)
  // No sponsored boost, no company favoritism. Prioritizes proximity & capacity availability.
  public async searchPoints(filters: PointSearchFilters, userCoords?: { latitude: number; longitude: number }): Promise<CollectionPoint[]> {
    const response = await apiGateway.request<CollectionPoint[]>('/api/v1/search/points', undefined, this.points);
    let results = [...response.data];

    // If user provided coordinates, recalculate dynamic distances
    if (userCoords) {
      results = results.map((pt) => ({
        ...pt,
        distanceKm: this.calculateDistance(userCoords.latitude, userCoords.longitude, pt.latitude, pt.longitude),
      }));
    }

    // 1. Text filter (City, Neighborhood, Address, Name, State)
    if (filters.locationQuery && filters.locationQuery.trim() !== '') {
      const qTokens = filters.locationQuery
        .toLowerCase()
        .replace(/[,.-]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 0);

      results = results.filter((p) => {
        const fullString = `${p.name} ${p.address} ${p.neighborhood} ${p.city} ${p.state}`.toLowerCase();
        return qTokens.every((token) => fullString.includes(token)) ||
               qTokens.some((token) => token.length >= 3 && fullString.includes(token));
      });
    }

    // 2. Material type filter (RF10)
    if (filters.materialType && filters.materialType !== 'all') {
      const mat = filters.materialType.toLowerCase();
      results = results.filter((p) =>
        p.acceptedMaterials.some((m) => m.toLowerCase().includes(mat))
      );
    }

    // 3. Only available capacity filter (RF06, RF09)
    if (filters.onlyAvailable) {
      results = results.filter((p) => p.capacityStatus !== 'full');
    }

    // 4. Free of charge filter
    if (filters.onlyFree) {
      results = results.filter((p) => p.isFree);
    }

    // 5. Impartial ranking criteria (RF09):
    // Ranking rule:
    // a) Available points with open capacity first.
    // b) Points near limit second.
    // c) Full points at the end (not recommended for new disposals).
    // Within the same availability bucket, sort strictly by physical distance.
    results.sort((a, b) => {
      const capacityWeight = { available: 0, near_limit: 1, full: 2 };
      const capA = capacityWeight[a.capacityStatus];
      const capB = capacityWeight[b.capacityStatus];

      if (capA !== capB) {
        return capA - capB;
      }

      const distA = a.distanceKm ?? 999;
      const distB = b.distanceKm ?? 999;
      return distA - distB;
    });

    return results;
  }

  public async getPointById(id: string): Promise<CollectionPoint | null> {
    const pt = this.points.find((p) => p.id === id) || null;
    return pt;
  }

  // Update a point's capacity (synced from CapacityService)
  public updatePointLocal(updated: CollectionPoint): void {
    this.points = this.points.map((p) => (p.id === updated.id ? updated : p));
    localStorage.setItem('ecocircuito_points', JSON.stringify(this.points));
  }
}

export const searchService = new SearchService();
