import { useMemo, useState } from 'react';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { FooterSummary } from '../components/FooterSummary';
import { Header } from '../components/Header';
import { ProductFormModal } from '../components/ProductFormModal';
import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';
import type { ModalType, Product, ViewMode } from '../types/product';

interface ProductsPageProps {
  products: Product[];
  viewMode: ViewMode;
  onCreateProduct: (data: { name: string; price: number }) => void;
  onUpdateProduct: (id: number, data: { name: string; price: number }) => void;
  onDeleteProduct: (id: number) => void;
}

export function ProductsPage({
  products,
  viewMode,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(trimmed),
    );
  }, [products, searchTerm]);

  function handleOpenCreate() {
    setSelectedProduct(null);
    setModalType('create');
  }

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setModalType('edit');
  }

  function handleOpenDelete(product: Product) {
    setSelectedProduct(product);
    setModalType('delete');
  }

  function handleCloseModal() {
    setModalType(null);
    setSelectedProduct(null);
  }

  function handleSaveProduct(data: { name: string; price: number }) {
    if (modalType === 'edit' && selectedProduct) {
      onUpdateProduct(selectedProduct.id, data);
    } else if (modalType === 'create') {
      onCreateProduct(data);
    }
    handleCloseModal();
  }

  function handleConfirmDelete() {
    if (!selectedProduct) return;
    onDeleteProduct(selectedProduct.id);
    handleCloseModal();
  }

  return (
    <div>
      <Header onAddProduct={handleOpenCreate} viewMode={viewMode} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={filteredProducts.length}
      />

      <ProductList
        products={filteredProducts}
        viewMode={viewMode}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <FooterSummary
        displayedCount={filteredProducts.length}
        totalCount={products.length}
      />

      {modalType === 'create' && (
        <ProductFormModal
          key="modal-create"
          isOpen={true}
          mode="create"
          product={null}
          onClose={handleCloseModal}
          onSubmit={handleSaveProduct}
        />
      )}

      {modalType === 'edit' && selectedProduct && (
        <ProductFormModal
          key={`modal-edit-${selectedProduct.id}`}
          isOpen={true}
          mode="edit"
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleSaveProduct}
        />
      )}

      <DeleteConfirmModal
        isOpen={modalType === 'delete'}
        product={selectedProduct}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
