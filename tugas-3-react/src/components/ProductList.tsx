import type { Product, ViewMode } from '../types/product';
import { PackageIcon } from './Icons';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductList({
  products,
  viewMode,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <PackageIcon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          Tidak ada produk ditemukan
        </h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
          Tidak ada produk yang cocok dengan pencarian Anda. Silakan coba kata
          kunci lain atau tambahkan produk baru.
        </p>
      </div>
    );
  }

  const containerClass =
    viewMode === 'list'
      ? 'flex flex-col gap-3'
      : 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section aria-label="Daftar produk" className={containerClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
