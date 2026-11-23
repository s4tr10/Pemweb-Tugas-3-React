import { Link } from 'react-router';
import type { ViewMode } from '../types/product';
import { Button } from './atoms/Button';
import { GridIcon, ListIcon, PlusIcon } from './Icons';

interface HeaderProps {
  onAddProduct: () => void;
  viewMode: ViewMode;
}

export function Header({ onAddProduct, viewMode }: HeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Manajemen Produk
          </h1>
          <Link
            to="/settings"
            title="Ubah mode tampilan di Pengaturan"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            {viewMode === 'grid' ? (
              <GridIcon className="h-3.5 w-3.5" />
            ) : (
              <ListIcon className="h-3.5 w-3.5" />
            )}
            <span>Tampilan {viewMode === 'grid' ? 'Grid' : 'List'}</span>
          </Link>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>

      <Button
        variant="primary"
        onClick={onAddProduct}
        className="w-full shrink-0 sm:w-auto"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Tambah Produk</span>
      </Button>
    </div>
  );
}
