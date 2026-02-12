import WishlistClient from "./WishlistClient";
import { Product } from "./types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://api.newgeebags.com/api/v1/admin/getProducts",
      { cache: "no-store" },
    );

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products;

    return [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();

  return <WishlistClient products={products} />;
}
