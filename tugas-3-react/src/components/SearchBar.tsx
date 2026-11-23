import { CloseIcon, SearchIcon } from './Icons';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-9 pl-10 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Cari nama produk"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Bersihkan pencarian"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="text-sm font-medium text-slate-500">
        <span>{totalCount} produk</span>
      </div>
    </div>
  );
}
