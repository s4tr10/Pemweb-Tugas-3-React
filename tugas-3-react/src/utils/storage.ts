import { INITIAL_PRODUCTS } from '../data/initialProducts';
import type { Product, ViewMode } from '../types/product';

const PRODUCTS_STORAGE_KEY = 'manajemen-produk:products';
const VIEW_MODE_STORAGE_KEY = 'manajemen-produk:view-mode';

function isValidProduct(item: unknown): item is Product {
  if (typeof item !== 'object' || item === null) return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    Number.isFinite(candidate.id) &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    Number.isFinite(candidate.price)
  );
}

export function loadProducts(): Product[] {
  try {
    const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isValidProduct)) {
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  try {
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Abaikan error kuota atau mode privat browser
  }
}

export function loadViewMode(): ViewMode {
  try {
    const raw = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (raw === 'grid' || raw === 'list') {
      return raw;
    }
    return 'grid';
  } catch {
    return 'grid';
  }
}

export function saveViewMode(viewMode: ViewMode): void {
  try {
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  } catch {
    // Abaikan error kuota atau mode privat browser
  }
}
