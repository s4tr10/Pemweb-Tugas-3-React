import { useEffect } from 'react';
import type { Product } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';
import { Button } from './atoms/Button';
import { CloseIcon, TrashIcon } from './Icons';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="animate-modal-enter w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="-mb-2 flex justify-end">
          <button
            type="button"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="px-2 pb-5 text-center">
          <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <TrashIcon className="h-6 w-6" />
          </div>

          <h2
            id="delete-modal-title"
            className="text-lg font-bold text-slate-900"
          >
            Hapus Produk?
          </h2>
          <p className="mt-1 mb-5 text-xs text-slate-500">
            Produk yang dihapus tidak dapat dikembalikan.
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-left">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              ID: {product.id}
            </span>
            <h4 className="mt-0.5 text-sm font-bold text-slate-900">
              {product.name}
            </h4>
            <p className="mt-0.5 text-sm font-bold text-blue-600">
              {formatRupiah(product.price)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Hapus Produk
          </Button>
        </div>
      </div>
    </div>
  );
}
