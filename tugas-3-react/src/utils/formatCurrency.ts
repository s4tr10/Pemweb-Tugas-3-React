/**
 * Memformat angka menjadi format mata uang Rupiah (contoh: 5000 -> Rp5.000)
 */
export function formatRupiah(value: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value);

  return `Rp${formatted}`;
}
