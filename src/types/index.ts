export type CapacityStatus = 'available' | 'near_limit' | 'full';

export interface OperatingHours {
  weekdays: string;
  saturday?: string;
  sunday?: string;
}

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  operatingHours: OperatingHours;
  acceptedMaterials: string[];
  unacceptedMaterials: string[];
  servicesOffered: string[];
  capacityStatus: CapacityStatus;
  capacityPercentage: number;
  isVerified: boolean;
  isFree: boolean;
  costDescription?: string;
  receivingConditions: string;
  lastUpdated: string;
  phone?: string;
  responsibleName?: string;
}

export interface MaterialCategoryInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  examples: string[];
  properDisposalGuide: string;
  safetyHazards?: string;
  isHazardous: boolean;
  reuseRecommendation: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  tag: string;
  badgeColor: string;
  subtitle: string;
  summary: string;
  fullContent: string[];
  keyRecommendations: string[];
  source: string;
  technicalValidation: string;
  iconType: 'environment' | 'health' | 'circular';
}

export interface DisposalRecord {
  id: string;
  protocolCode: string;
  materialCategory: string;
  quantityUnits?: number;
  estimatedWeightKg: number;
  pointId: string;
  pointName: string;
  timestamp: string;
  isVerified: boolean;
  avoidedSoilContaminationLiters: number;
}

export interface EnvironmentalStats {
  totalDisposalsCount: number;
  activePointsCount: number;
  totalCollectedKg: number;
  last30DaysKg: number;
  recycledVerifiedKg: number;
  dataSource: string;
  period: string;
  lastUpdated: string;
  methodologyNote: string;
}

export interface PointSearchFilters {
  locationQuery?: string;
  materialType?: string;
  onlyAvailable?: boolean;
  onlyFree?: boolean;
  isOpenNow?: boolean;
  maxDistanceKm?: number;
}
