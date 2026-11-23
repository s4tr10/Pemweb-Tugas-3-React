import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>Aplikasi Manajemen Produk</p>
          <p>React Router v7 &amp; Tailwind CSS v4</p>
        </div>
      </footer>
    </div>
  );
}
