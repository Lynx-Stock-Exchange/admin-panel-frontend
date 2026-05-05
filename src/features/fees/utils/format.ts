export function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(3)}%`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function shortenId(id: string): string {
  return id.length > 13 ? `${id.slice(0, 8)}…` : id;
}
