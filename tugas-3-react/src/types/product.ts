export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductFormData {
  name: string;
  price: number | '';
}

export type ModalType = 'create' | 'edit' | 'delete' | null;

export type ViewMode = 'grid' | 'list';
