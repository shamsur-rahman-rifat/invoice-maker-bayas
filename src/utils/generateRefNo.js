export function generateRefNo(type) {
  const prefix = "TB";
  const docCode = type === "invoice" ? "IN" : "QU";

  const year = new Date().getFullYear().toString().slice(-2);

  // Get last number from localStorage
  const key = `tb-${docCode}-${year}`;
  const lastNumber = Number(localStorage.getItem(key)) || 0;

  const nextNumber = lastNumber + 1;
  localStorage.setItem(key, nextNumber);

  const serial = String(nextNumber).padStart(3, "0");

  return `${prefix}/${docCode}/${year}/${serial}`;
}
