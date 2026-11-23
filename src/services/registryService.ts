import { DisposalRecord } from '../types';
import { apiGateway } from './apiClient';
import { contentService } from './contentService';

// Tracking & Registry Service (corresponds to IRegistry / RegistryService in UML)
// Implements 100% Anonymous Disposal Registry (RF11, RF12) & Anti-Abuse Rate Limiting
class RegistryService {
  private readonly STORAGE_KEY = 'ecocircuito_anonymous_disposals';
  private readonly RATE_LIMIT_KEY = 'ecocircuito_rate_limit_timestamps';
  private readonly MAX_DISPOSALS_PER_HOUR = 6;

  // Check rate limit to prevent automated spam (Ethical US / RF11)
  private checkRateLimit(): boolean {
    const raw = localStorage.getItem(this.RATE_LIMIT_KEY);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    // Filter only timestamps in the last hour
    timestamps = timestamps.filter((t) => now - t < oneHour);

    if (timestamps.length >= this.MAX_DISPOSALS_PER_HOUR) {
      return false; // Rate limit exceeded
    }

    timestamps.push(now);
    localStorage.setItem(this.RATE_LIMIT_KEY, JSON.stringify(timestamps));
    return true;
  }

  // Register an anonymous disposal (RF11, RF12)
  public async registerAnonymousDisposal(payload: {
    materialCategory: string;
    quantityUnits?: number;
    estimatedWeightKg?: number;
    pointId: string;
    pointName: string;
  }): Promise<DisposalRecord> {
    // 1. Rate limiting check
    if (!this.checkRateLimit()) {
      throw new Error(
        'Limite de registros temporários atingido por segurança. Para proteger o sistema contra automações indevidas, aguarde alguns minutos antes de registrar novamente.'
      );
    }

    // 2. Validate input
    if (!payload.materialCategory) {
      throw new Error('Por favor, selecione a categoria de material descartado.');
    }
    if (!payload.pointId) {
      throw new Error('Por favor, selecione o ponto de coleta onde realizou o descarte.');
    }

    // 3. Compute metrics & generate anonymous protocol code
    const weight = payload.estimatedWeightKg && payload.estimatedWeightKg > 0 
      ? payload.estimatedWeightKg 
      : (payload.quantityUnits || 1) * 0.45; // average estimated kg

    // Avoided soil contamination: ~1000L of groundwater protected per kg of e-waste safely disposed
    const avoidedLiters = Math.round(weight * 1250);

    // Random non-reversible alphanumeric token (no identity link)
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const protocolCode = `ECO-${new Date().getFullYear()}-${randomHex}`;

    const newRecord: DisposalRecord = {
      id: `disp-${Date.now()}-${randomHex}`,
      protocolCode,
      materialCategory: payload.materialCategory,
      quantityUnits: payload.quantityUnits || 1,
      estimatedWeightKg: parseFloat(weight.toFixed(2)),
      pointId: payload.pointId,
      pointName: payload.pointName,
      timestamp: new Date().toISOString(),
      isVerified: true,
      avoidedSoilContaminationLiters: avoidedLiters,
    };

    // Forward to Gateway / BFF
    const response = await apiGateway.request<DisposalRecord>(
      '/api/v1/registry/disposals',
      {
        method: 'POST',
        body: JSON.stringify(newRecord),
      },
      newRecord
    );

    // Save in local anonymous registry DB
    this.saveToLocalDb(response.data);

    // Increment collective stats
    contentService.incrementStats(response.data.estimatedWeightKg);

    return response.data;
  }

  private saveToLocalDb(record: DisposalRecord): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    const list: DisposalRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(record);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  }

  public getAnonymousDisposals(): DisposalRecord[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}

export const registryService = new RegistryService();
