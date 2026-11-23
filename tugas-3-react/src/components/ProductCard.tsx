import { Link } from 'react-router';
import type { Product, ViewMode } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';
import { Button } from './atoms/Button';

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({
  product,
  viewMode,
  onEdit,
  onDelete,
}: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <article className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:shadow-sm sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
          <span className="inline-flex w-fit items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-600 uppercase">
            ID: {product.id}
          </span>
          <div>
            <Link
              to={`/products/${product.id}`}
              className="text-base font-bold text-slate-900 transition-colors hover:text-blue-600"
            >
              {product.name}
            </Link>
            <p className="text-sm font-bold text-blue-600">
              {formatRupiah(product.price)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Detail
          </Link>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(product)}
          >
            Hapus
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          ID: {product.id}
        </span>
      </div>

      <div className="mb-5">
        <h3 className="text-lg leading-snug font-bold text-slate-900">
          <Link
            to={`/products/${product.id}`}
            className="transition-colors hover:text-blue-600"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-lg font-bold text-blue-600">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          Detail
        </Link>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(product)}
        >
          Hapus
        </Button>
      </div>
    </article>
  );
}
