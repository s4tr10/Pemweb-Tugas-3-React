import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button } from '../components/atoms/Button';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  PackageIcon,
} from '../components/Icons';
import { ProductFormModal } from '../components/ProductFormModal';
import type { Product } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';

interface ProductDetailPageProps {
  products: Product[];
  onUpdateProduct: (id: number, data: { name: string; price: number }) => void;
  onDeleteProduct: (id: number) => void;
}

export function ProductDetailPage({
  products,
  onUpdateProduct,
  onDeleteProduct,
}: ProductDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <AlertCircleIcon className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Produk Tidak Ditemukan
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Produk dengan ID <span className="font-semibold text-slate-700">{id}</span> tidak tersedia dalam daftar produk saat ini.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Kembali ke Daftar Produk</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleSaveEdit(data: { name: string; price: number }) {
    if (!product) return;
    onUpdateProduct(product.id, data);
    setIsEditOpen(false);
  }

  function handleConfirmDelete() {
    if (!product) return;
    onDeleteProduct(product.id);
    setIsDeleteOpen(false);
    navigate('/products');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Kembali ke Daftar Produk</span>
        </Link>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <PackageIcon className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-flex items-center rounded-md bg-slate-200/80 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-slate-700 uppercase">
                  ID: {product.id}
                </span>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-medium text-slate-500">Harga Satuan</p>
              <p className="mt-0.5 text-2xl font-bold text-blue-600">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Informasi Produk
          </h2>

          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <dt className="text-xs font-medium text-slate-500">ID Produk</dt>
              <dd className="mt-1 text-base font-semibold text-slate-900">
                #{product.id}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                Nama Produk
              </dt>
              <dd className="mt-1 text-base font-semibold text-slate-900">
                {product.name}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                Harga Terformat
              </dt>
              <dd className="mt-1 text-base font-semibold text-blue-600">
                {formatRupiah(product.price)}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                Status Data
              </dt>
              <dd className="mt-1 text-base font-semibold text-emerald-700">
                Tersedia di Katalog
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Daftar Produk</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <Button
                variant="outline-primary"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Produk
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setIsDeleteOpen(true)}
              >
                Hapus Produk
              </Button>
            </div>
          </div>
        </div>
      </article>

      {isEditOpen && (
        <ProductFormModal
          key={`detail-edit-${product.id}`}
          isOpen={true}
          mode="edit"
          product={product}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleSaveEdit}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        product={product}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
