interface FooterSummaryProps {
  displayedCount: number;
  totalCount: number;
}

export function FooterSummary({
  displayedCount,
  totalCount,
}: FooterSummaryProps) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">
      <p>
        Menampilkan {displayedCount} dari {totalCount} produk
      </p>
    </div>
  );
}
