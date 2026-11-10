import { PlusIcon } from './Icons';

interface HeaderProps {
  onAddProduct: () => void;
}

export function Header({ onAddProduct }: HeaderProps) {
  return (
    <header className="page-header">
      <div className="header-text">
        <h1 className="header-title">Manajemen Produk</h1>
        <p className="header-subtitle">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onAddProduct}
      >
        <PlusIcon className="icon-sm" />
        <span>Tambah Produk</span>
      </button>
    </header>
  );
}
