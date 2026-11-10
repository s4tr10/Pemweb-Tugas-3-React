import { Product } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-header">
        <span className="product-id">ID: {product.id}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatRupiah(product.price)}</p>
      </div>

      <div className="product-card-actions">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
