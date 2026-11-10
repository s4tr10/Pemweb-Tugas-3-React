interface FooterSummaryProps {
  displayedCount: number;
  totalCount: number;
}

export function FooterSummary({
  displayedCount,
  totalCount,
}: FooterSummaryProps) {
  return (
    <footer className="footer-summary">
      <p>
        Menampilkan {displayedCount} dari {totalCount} produk
      </p>
    </footer>
  );
}
