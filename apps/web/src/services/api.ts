import { mockProducts, mockSystems, mockMarkets, mockMedia } from './mockData';
import type { ProductData, SystemData, MarketData, MediaData } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

async function fetchApi<T>(endpoint: string): Promise<T> {
  if (USE_MOCK) {
    return getMockData<T>(endpoint);
  }
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const json = await res.json();
  return json.data ?? json;
}

function getMockData<T>(endpoint: string): T {
  if (endpoint.startsWith('/products/') && endpoint.split('/').length === 3) {
    const slug = endpoint.split('/')[2];
    return mockProducts.find(p => p.slug === slug) as unknown as T;
  }
  if (endpoint === '/products') return { items: mockProducts, total: mockProducts.length, page: 1, limit: 20, totalPages: 1 } as unknown as T;
  if (endpoint.startsWith('/systems/') && endpoint.split('/').length === 3) {
    const slug = endpoint.split('/')[2];
    return mockSystems.find(s => s.slug === slug) as unknown as T;
  }
  if (endpoint === '/systems') return mockSystems as unknown as T;
  if (endpoint === '/markets') return mockMarkets as unknown as T;
  if (endpoint.startsWith('/media')) return mockMedia as unknown as T;
  if (endpoint === '/health') return { status: 'ok', service: 'technobit-api' } as unknown as T;
  return [] as unknown as T;
}

export const api = {
  getProducts: (filters?: Record<string, string>) => {
    const params = filters ? '?' + new URLSearchParams(filters).toString() : '';
    return fetchApi<{ items: ProductData[]; total: number; page: number; limit: number; totalPages: number }>(`/products${params}`);
  },
  getProduct: (slug: string) => fetchApi<ProductData>(`/products/${encodeURIComponent(slug)}`),
  getSystems: () => fetchApi<SystemData[]>('/systems'),
  getSystem: (slug: string) => fetchApi<SystemData>(`/systems/${encodeURIComponent(slug)}`),
  getMarkets: () => fetchApi<MarketData[]>('/markets'),
  getMedia: (type?: string) => fetchApi<MediaData[]>(type ? `/media?type=${encodeURIComponent(type)}` : '/media'),
  getFeaturedMedia: () => fetchApi<MediaData[]>('/media/featured'),
  submitSupport: (data: Record<string, string>) => {
    if (USE_MOCK) return Promise.resolve({ success: true });
    return fetch(`${API_URL}/support-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json());
  },
  healthCheck: () => fetchApi<{ status: string }>('/health'),
};
