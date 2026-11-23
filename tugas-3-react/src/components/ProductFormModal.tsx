import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Product } from '../types/product';
import { Button } from './atoms/Button';
import { CloseIcon } from './Icons';

interface ProductFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  product: Product | null;
  onClose: () => void;
  onSubmit: (data: { name: string; price: number }) => void;
}

export function ProductFormModal({
  isOpen,
  mode,
  product,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const isEdit = mode === 'edit';
  const [name, setName] = useState(isEdit && product ? product.name : '');
  const [price, setPrice] = useState<string>(
    isEdit && product ? product.price.toString() : '',
  );
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);

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

  if (!isOpen) return null;

  const title = isEdit ? 'Edit Produk' : 'Tambah Produk';
  const subtitle = isEdit
    ? 'Perbarui informasi produk yang dipilih.'
    : 'Masukkan informasi produk baru.';
  const submitText = isEdit ? 'Simpan Perubahan' : 'Simpan Produk';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let hasError = false;
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorName('Nama produk wajib diisi.');
      hasError = true;
    } else {
      setErrorName(null);
    }

    const parsedPrice = Number(price);
    if (!price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorPrice('Harga harus lebih dari 0.');
      hasError = true;
    } else {
      setErrorPrice(null);
    }

    if (hasError) return;

    onSubmit({
      name: trimmedName,
      price: parsedPrice,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="animate-modal-enter w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2
              id="product-modal-title"
              className="text-lg font-bold text-slate-900"
            >
              {title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isEdit && product && (
            <div className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              ID: {product.id}
            </div>
          )}

          <div>
            <label
              htmlFor="product-name"
              className="mb-1.5 block text-xs font-semibold text-slate-800"
            >
              Nama Produk
            </label>
            <input
              id="product-name"
              type="text"
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errorName
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorName) setErrorName(null);
              }}
              autoFocus
            />
            {errorName && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errorName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="product-price"
              className="mb-1.5 block text-xs font-semibold text-slate-800"
            >
              Harga (Rp)
            </label>
            <input
              id="product-price"
              type="number"
              min="1"
              step="1"
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errorPrice
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errorPrice) setErrorPrice(null);
              }}
            />
            <p
              className={`mt-1.5 text-xs ${
                errorPrice ? 'font-medium text-red-600' : 'text-slate-400'
              }`}
            >
              Harga harus lebih dari 0.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
