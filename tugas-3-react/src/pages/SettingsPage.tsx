import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/atoms/Button';
import {
  ArrowRightIcon,
  CheckIcon,
  GridIcon,
  ListIcon,
  RotateCcwIcon,
} from '../components/Icons';
import type { ViewMode } from '../types/product';

interface SettingsPageProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onResetProducts: () => void;
}

export function SettingsPage({
  viewMode,
  onChangeViewMode,
  onResetProducts,
}: SettingsPageProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  function handleReset() {
    onResetProducts();
    setConfirmReset(false);
    setResetDone(true);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Atur preferensi tata letak katalog produk dan pengelolaan penyimpanan
          lokal.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="mb-5">
          <h2 className="text-base font-bold text-slate-900">
            Tampilan Daftar Produk
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pilih format tampilan katalog pada halaman Produk. Perubahan
            langsung diterapkan dan disimpan secara otomatis di{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
              localStorage
            </code>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChangeViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            className={`group flex cursor-pointer flex-col rounded-xl border p-5 text-left transition-all ${
              viewMode === 'grid'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/15'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
            }`}
          >
            <div className="mb-4 flex w-full items-center justify-between">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <GridIcon className="h-5 w-5" />
              </span>
              {viewMode === 'grid' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  <CheckIcon className="h-3 w-3" />
                  <span>Aktif</span>
                </span>
              )}
            </div>

            <div className="mb-4 grid w-full grid-cols-3 gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <div className="h-8 rounded bg-slate-200/90" />
              <div className="h-8 rounded bg-slate-200/90" />
              <div className="h-8 rounded bg-slate-200/90" />
            </div>

            <span className="text-sm font-bold text-slate-900">
              Tampilan Grid
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Menampilkan kartu produk secara responsif (1 hingga 3 kolom sesuai
              ukuran layar).
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('list')}
            aria-pressed={viewMode === 'list'}
            className={`group flex cursor-pointer flex-col rounded-xl border p-5 text-left transition-all ${
              viewMode === 'list'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/15'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
            }`}
          >
            <div className="mb-4 flex w-full items-center justify-between">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <ListIcon className="h-5 w-5" />
              </span>
              {viewMode === 'list' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  <CheckIcon className="h-3 w-3" />
                  <span>Aktif</span>
                </span>
              )}
            </div>

            <div className="mb-4 flex w-full flex-col gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <div className="h-2.5 w-full rounded bg-slate-200/90" />
              <div className="h-2.5 w-full rounded bg-slate-200/90" />
              <div className="h-2.5 w-4/5 rounded bg-slate-200/90" />
            </div>

            <span className="text-sm font-bold text-slate-900">
              Tampilan List
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Menampilkan produk dalam baris memanjang yang ringkas untuk
              pemindaian cepat.
            </span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500">
            Mode aktif saat ini:{' '}
            <span className="font-semibold text-slate-800 capitalize">
              {viewMode}
            </span>
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            <span>Lihat di Halaman Produk</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Reset Data Produk
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Mengembalikan daftar produk di penyimpanan lokal ke 5 data bawaan
              awal.
            </p>
          </div>

          {!confirmReset ? (
            <Button
              variant="outline-danger"
              onClick={() => {
                setConfirmReset(true);
                setResetDone(false);
              }}
              className="shrink-0"
            >
              <RotateCcwIcon className="h-4 w-4" />
              <span>Reset Data Awal</span>
            </Button>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConfirmReset(false)}
              >
                Batal
              </Button>
              <Button variant="danger" size="sm" onClick={handleReset}>
                Konfirmasi Reset
              </Button>
            </div>
          )}
        </div>

        {resetDone && (
          <p className="mt-3 text-xs font-medium text-emerald-700">
            Data produk berhasil dikembalikan ke kondisi awal.
          </p>
        )}
      </section>
    </div>
  );
}
