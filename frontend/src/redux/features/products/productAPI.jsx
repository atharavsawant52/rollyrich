export async function fetchProducts() {
  const response = await fetch('/data/products.json');
  const data = await response.json();
  return data;
}
