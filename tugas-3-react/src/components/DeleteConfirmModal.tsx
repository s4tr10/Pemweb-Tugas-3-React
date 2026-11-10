import { useEffect } from 'react';
import { Product } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';
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
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-simple">
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <CloseIcon className="icon-sm" />
          </button>
        </div>

        <div className="delete-modal-body">
          <div className="delete-icon-wrapper">
            <TrashIcon className="delete-icon" />
          </div>

          <h2 className="delete-modal-title">Hapus Produk?</h2>
          <p className="delete-modal-subtitle">
            Produk yang dihapus tidak dapat dikembalikan.
          </p>

          <div className="delete-product-preview">
            <span className="product-id">ID: {product.id}</span>
            <h4 className="preview-product-name">{product.name}</h4>
            <p className="preview-product-price">{formatRupiah(product.price)}</p>
          </div>
        </div>

        <div className="modal-actions delete-modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}
