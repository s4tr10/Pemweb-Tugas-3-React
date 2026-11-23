import { Link } from 'react-router';
import {
  ArrowRightIcon,
  GridIcon,
  ListIcon,
  PackageIcon,
  SettingsIcon,
} from '../components/Icons';
import type { Product, ViewMode } from '../types/product';
import { formatRupiah } from '../utils/formatCurrency';

interface DashboardPageProps {
  products: Product[];
  viewMode: ViewMode;
}

export function DashboardPage({ products, viewMode }: DashboardPageProps) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + item.price, 0);
  const averagePrice =
    totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;
  const highestPrice =
    totalProducts > 0 ? Math.max(...products.map((item) => item.price)) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ringkasan katalog produk dan navigasi cepat pengelolaan inventaris.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <SettingsIcon className="h-4 w-4" />
            <span>Pengaturan</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <PackageIcon className="h-4 w-4" />
            <span>Kelola Produk</span>
          </Link>
        </div>
      </div>

      <section
        aria-label="Statistik produk"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Total Produk
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalProducts}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Item aktif dalam katalog
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Total Nilai Katalog
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {formatRupiah(totalValue)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Akumulasi seluruh harga produk
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Rata-Rata Harga
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {formatRupiah(averagePrice)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tertinggi: {formatRupiah(highestPrice)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Mode Tampilan
          </p>
          <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-900">
            {viewMode === 'grid' ? (
              <GridIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <ListIcon className="h-5 w-5 text-blue-600" />
            )}
            <span className="capitalize">{viewMode}</span>
          </div>
          <Link
            to="/settings"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <span>Ubah di Pengaturan</span>
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Ringkasan Daftar Produk
            </h2>
            <p className="text-xs text-slate-500">
              Pilih produk untuk melihat detail atau buka halaman produk untuk
              operasi CRUD lengkap.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            <span>Lihat Semua</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            Belum ada produk tersimpan. Tambahkan produk melalui halaman Produk.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {products.slice(0, 5).map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 px-6 py-3.5 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex w-14 justify-center rounded-md bg-slate-100 py-1 text-xs font-semibold text-slate-600">
                    ID: {product.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-blue-600">
                    {formatRupiah(product.price)}
                  </span>
                  <Link
                    to={`/products/${product.id}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600"
                  >
                    Detail
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
