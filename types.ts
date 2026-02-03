export interface Property {
  id: string;
  name: string;
  location: string;
  roi: number;
  value: string;
  image: string;
  tags: string[];
}

export interface ChartDataPoint {
  year: string;
  revenue: number;
  marketAverage: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: GroundingSource[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
}

export interface MarketTrend {
  title: string;
  description: string;
}

export interface AssetAnalysis {
  marketMoat: string;
  revenueDrivers: string[];
  riskMitigation: string;
  exitStrategy: string;
}

export enum ViewState {
  HOME = 'HOME',
  PORTFOLIO = 'PORTFOLIO',
  INSIGHTS = 'INSIGHTS',
  CONTACT = 'CONTACT'
}