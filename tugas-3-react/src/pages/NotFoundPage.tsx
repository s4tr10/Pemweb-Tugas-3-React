import { Link } from 'react-router';
import { ArrowLeftIcon } from '../components/Icons';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
        <p className="text-sm font-bold tracking-widest text-blue-600 uppercase">
          Kesalahan 404
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Alamat URL yang Anda tuju tidak cocok dengan halaman mana pun dalam
          aplikasi Manajemen Produk.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Kembali ke Produk</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Ke Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
