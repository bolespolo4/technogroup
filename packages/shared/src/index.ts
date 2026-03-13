// ============================================================
// Enums
// ============================================================

export enum UserRole {
  PUBLIC = 'public',
  REGISTERED = 'registered',
  PARTNER = 'partner',
  ADMIN = 'admin',
}

export enum DocumentType {
  TDS = 'TDS',
  CAD = 'CAD',
  GUIDE = 'GUIDE',
  CERT = 'CERT',
}

export enum DocumentAccessLevel {
  PUBLIC = 'PUBLIC',
  REGISTERED = 'REGISTERED',
  PARTNER = 'PARTNER',
}

export enum MarketStatus {
  ACTIVE = 'ACTIVE',
  AGENT = 'AGENT',
  DEVELOPMENT = 'DEVELOPMENT',
}

export enum MediaType {
  NEWS = 'NEWS',
  EVENT = 'EVENT',
  AWARD = 'AWARD',
  VIDEO = 'VIDEO',
  EXHIBITION = 'EXHIBITION',
  PROJECT = 'PROJECT',
}

export enum SupportType {
  TECHNICAL = 'TECHNICAL',
  COMMERCIAL = 'COMMERCIAL',
  INSTALLATION = 'INSTALLATION',
  CERTIFICATION = 'CERTIFICATION',
  OTHER = 'OTHER',
}

// ============================================================
// Core Entity Types
// ============================================================

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  file_url: string;
  access_level: DocumentAccessLevel;
  language: string;
  version: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  family: string;
  description: string;
  intended_use: string;
  usp: string;
  application_method: string;
  polymer_modification: string;
  reinforcement: string;
  surface_finish: string;
  certifications: string[];
  images: string[];
  documents: Document[];
  compatible_systems: string[];
  meta_title: string;
  meta_description: string;
  is_published: boolean;
}

export interface System {
  id: string;
  slug: string;
  name: string;
  description: string;
  climate_notes: string;
  diagram_url: string;
  products: Product[];
  documents: Document[];
  meta_title: string;
  meta_description: string;
}

export interface Market {
  id: string;
  country_code: string;
  country_name: string;
  status: MarketStatus;
  projects_count: number;
  sqm_exported: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  country: string;
  country_flag: string;
  system_id: string;
  system_name: string;
  year: number;
  images: string[];
  description: string;
  is_featured: boolean;
  is_international: boolean;
}

export interface MediaPost {
  id: string;
  slug: string;
  type: MediaType;
  title: string;
  body_json: Record<string, unknown>;
  excerpt: string;
  cover_image: string;
  published_at: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
}

export interface SupportRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  support_type: SupportType;
  systems: string[];
  product_families: string[];
  description: string;
  attachment_url?: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  country: string;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  last_login: string;
}

// ============================================================
// API DTOs
// ============================================================

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  company: string;
  country: string;
  role?: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ProductFilters {
  family?: string;
  system?: string;
  polymer?: string;
  reinforcement?: string;
  surface?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface TechnicalHubSearchParams {
  q?: string;
  type?: 'product' | 'system' | 'document';
  application?: string;
  polymer?: string;
  reinforcement?: string;
  surface?: string;
  method?: string;
  certification?: string;
}

export interface CreateSupportRequestDto {
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  support_type: SupportType;
  systems: string[];
  product_families: string[];
  description: string;
  attachment_url?: string;
}

export interface HealthResponse {
  status: string;
  database: string;
  redis: string;
}
