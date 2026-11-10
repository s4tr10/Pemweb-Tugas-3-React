import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Product } from '../types/product';
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
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('');
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && product) {
        setName(product.name);
        setPrice(product.price.toString());
      } else {
        setName('');
        setPrice('');
      }
      setErrorName(null);
      setErrorPrice(null);
    }
  }, [isOpen, mode, product]);

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

  const isEdit = mode === 'edit';
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
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
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
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">{subtitle}</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <CloseIcon className="icon-sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {isEdit && product && (
            <div className="form-info-id">
              <span>ID: {product.id}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="product-name" className="form-label">
              Nama Produk
            </label>
            <input
              id="product-name"
              type="text"
              className={`form-input ${errorName ? 'input-error' : ''}`}
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorName) setErrorName(null);
              }}
              autoFocus
            />
            {errorName && <p className="form-error-text">{errorName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="product-price" className="form-label">
              Harga (Rp)
            </label>
            <input
              id="product-price"
              type="number"
              min="1"
              step="1"
              className={`form-input ${errorPrice ? 'input-error' : ''}`}
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errorPrice) setErrorPrice(null);
              }}
            />
            <p className={`form-help-text ${errorPrice ? 'form-error-text' : ''}`}>
              Harga harus lebih dari 0.
            </p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
