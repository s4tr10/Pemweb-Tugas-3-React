import { SearchIcon } from './Icons';

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
    <div className="search-toolbar">
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Cari nama produk"
        />
      </div>
      <div className="search-count">
        <span>{totalCount} produk</span>
      </div>
    </div>
  );
}
