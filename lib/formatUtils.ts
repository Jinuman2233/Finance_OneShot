/**
 * Global numeric formatting helpers.
 * Table cells MUST use formatTableNumber (exactly 2 decimal places).
 */

/** Format any number for <table> cells: always 2 decimal places. */
export function formatTableNumber(value: number): string {
  const n = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Currency-style display outside tables (whole won, no decimals). */
export function formatWon(value: number): string {
  const n = Number.isFinite(value) ? Math.round(value) : 0;
  return new Intl.NumberFormat("ko-KR").format(n);
}
