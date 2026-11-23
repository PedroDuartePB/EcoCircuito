import { CollectionPoint, CapacityStatus } from '../types';
import { searchService } from './searchService';
import { apiGateway } from './apiClient';

// Capacity & Location Service (corresponds to ILocation / CapacityService in UML)
class CapacityService {
  // Update capacity level of a point (Manager RF06)
  public async updateCapacity(pointId: string, percentage: number): Promise<CollectionPoint> {
    const point = await searchService.getPointById(pointId);
    if (!point) {
      throw new Error(`Ponto de coleta com ID ${pointId} não encontrado.`);
    }

    let status: CapacityStatus = 'available';
    if (percentage >= 90) {
      status = 'full';
    } else if (percentage >= 70) {
      status = 'near_limit';
    }

    const updatedPoint: CollectionPoint = {
      ...point,
      capacityPercentage: percentage,
      capacityStatus: status,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    // Forward to BFF / Gateway
    await apiGateway.request<CollectionPoint>(
      `/api/v1/capacity/${pointId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ capacityPercentage: percentage, capacityStatus: status }),
      },
      updatedPoint
    );

    // Sync with local search service & storage
    searchService.updatePointLocal(updatedPoint);

    // If capacity is full, dispatch event simulating PubSub Event Broker
    if (status === 'full') {
      window.dispatchEvent(
        new CustomEvent('ecocircuito:capacity_full', {
          detail: { pointId, pointName: point.name },
        })
      );
    }

    return updatedPoint;
  }

  // Get simulated manager dashboard metrics for a point
  public getPointManagementMetrics(pointId: string) {
    return {
      pointId,
      overallCapacityPercent: 62,
      categories: [
        { name: 'Pilhas e baterias', fillPercent: 78, alertLevel: 'warning' as const },
        { name: 'Celulares e tablets', fillPercent: 48, alertLevel: 'normal' as const },
        { name: 'Cabos e pequenos aparelhos', fillPercent: 88, alertLevel: 'critical' as const },
        { name: 'Computadores e notebooks', fillPercent: 55, alertLevel: 'normal' as const },
      ],
      weeklyIntakeKg: [
        { day: 'Seg', kg: 42 },
        { day: 'Ter', kg: 65 },
        { day: 'Qua', kg: 51 },
        { day: 'Qui', kg: 89 },
        { day: 'Sex', kg: 110 },
        { day: 'Sáb', kg: 74 },
        { day: 'Dom', kg: 20 },
      ],
      pendingTransfersToRecycler: 2,
    };
  }
}

export const capacityService = new CapacityService();
