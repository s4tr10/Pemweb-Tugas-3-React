import { Link, NavLink } from 'react-router';
import { DashboardIcon, PackageIcon, SettingsIcon } from './Icons';

const navLinkBase =
  'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150';

function getNavLinkClass({ isActive }: { isActive: boolean }): string {
  return isActive
    ? `${navLinkBase} bg-blue-50 text-blue-700 font-semibold`
    : `${navLinkBase} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <PackageIcon className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight tracking-tight">
              Manajemen Produk
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              Sistem Inventaris Katalog
            </span>
          </div>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="flex flex-wrap items-center gap-1.5"
        >
          <NavLink to="/" end className={getNavLinkClass}>
            <DashboardIcon className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/products" className={getNavLinkClass}>
            <PackageIcon className="h-4 w-4" />
            <span>Produk</span>
          </NavLink>
          <NavLink to="/settings" className={getNavLinkClass}>
            <SettingsIcon className="h-4 w-4" />
            <span>Pengaturan</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
