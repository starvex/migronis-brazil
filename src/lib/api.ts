const API_BASE = 'https://migronis-admin-api-production.up.railway.app/api';

export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  type: 'apartment' | 'house' | 'land' | 'commercial';
  status: 'active' | 'sold' | 'reserved';
  created_at: string;
  updated_at: string;
}

export interface PropertiesResponse {
  data: Property[];
  total: number;
  limit: number;
  offset: number;
}

export interface Settings {
  chat_widget?: string;
  crm_code?: string;
  gtm_id?: string;
  site_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export async function getProperties(type?: string): Promise<PropertiesResponse> {
  const url = type 
    ? `${API_BASE}/properties?type=${type}`
    : `${API_BASE}/properties`;
  
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }
  
  return res.json();
}

export async function getProperty(id: string | number): Promise<Property> {
  const res = await fetch(`${API_BASE}/properties/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch property');
  }
  
  return res.json();
}

export async function getSettings(): Promise<Settings> {
  const res = await fetch(`${API_BASE}/settings`);
  
  if (!res.ok) {
    return {};
  }
  
  return res.json();
}
