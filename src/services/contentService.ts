import { MaterialCategoryInfo, EducationalArticle, EnvironmentalStats } from '../types';
import { MATERIAL_CATEGORIES, EDUCATIONAL_ARTICLES, INITIAL_STATS } from '../data/mockData';
import { apiGateway } from './apiClient';

// Content & Education Service (corresponds to IContent / ContentService in UML)
class ContentService {
  private stats: EnvironmentalStats;

  constructor() {
    const saved = localStorage.getItem('ecocircuito_stats');
    if (saved) {
      try {
        this.stats = JSON.parse(saved);
      } catch {
        this.stats = { ...INITIAL_STATS };
      }
    } else {
      this.stats = { ...INITIAL_STATS };
    }
  }

  public async getCategories(): Promise<MaterialCategoryInfo[]> {
    const res = await apiGateway.request<MaterialCategoryInfo[]>(
      '/api/v1/content/categories',
      undefined,
      MATERIAL_CATEGORIES
    );
    return res.data;
  }

  public async getEducationalArticles(): Promise<EducationalArticle[]> {
    const res = await apiGateway.request<EducationalArticle[]>(
      '/api/v1/content/articles',
      undefined,
      EDUCATIONAL_ARTICLES
    );
    return res.data;
  }

  public async getEnvironmentalStats(): Promise<EnvironmentalStats> {
    const res = await apiGateway.request<EnvironmentalStats>(
      '/api/v1/content/stats',
      undefined,
      this.stats
    );
    return res.data;
  }

  public incrementStats(weightKg: number): void {
    this.stats = {
      ...this.stats,
      totalDisposalsCount: this.stats.totalDisposalsCount + 1,
      totalCollectedKg: Math.round(this.stats.totalCollectedKg + weightKg),
      last30DaysKg: Math.round(this.stats.last30DaysKg + weightKg),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem('ecocircuito_stats', JSON.stringify(this.stats));
  }
}

export const contentService = new ContentService();
