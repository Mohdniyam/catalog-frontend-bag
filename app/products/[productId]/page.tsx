import Link from "next/link";
import { getMrpPrice, getOffPercentage } from "@/src/utils/pricing";
import AddToCartButton from "@/src/components/AddToCartButton";

interface Product {
  ProductId: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://api.newgeebags.com/api/v1/admin/getProducts",
  );

  const products: Product[] = await res.json();

  return products.map((product) => ({
    productId: product.ProductId,
  }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Get ALL products
  const res = await fetch(
    "https://api.newgeebags.com/api/v1/admin/getProducts",
  );

  const products: Product[] = await res.json();

  // Find single product
  const product = products.find((item) => item.ProductId === productId);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <section className="">
      <div className="px-4 mt-4">
        <Link href={"/"} className="text-primary font-semibold">
          Home
        </Link>
        / {product.name}
      </div>
      <div className="grid md:grid-cols-2 gap-12 container mx-auto px-6 pt-12 pb-18">
        <div className="flex justify-self-end">
          <div className="w-96 h-96 bg-white flex items-center justify-center rounded-sm p-0.5 ">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-cover"
            />
          </div>
        </div>

        <div className="">
          <h1 className="text-2xl text-primary font-bold ">{product.name}</h1>
          <span className="flex items-center gap-2 text-sm my-4">
            ⭐⭐⭐⭐⭐ <p>(6 customer reviews)</p>
          </span>
          <div className="flex items-center gap-2">
            <span className="">
              MRP: ₹<del>{getMrpPrice(Number(product.price))}</del>
            </span>
            <span className="text-green-600 font-semibold text-sm">
              {getOffPercentage(product.price)}% off
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-primary font-semibold my-4">Deal of the Day:</p>
            <span className="text-2xl font-semibold text-black">
              ₹{product.price}
            </span>
          </div>
          <p className="text-gray-600 text-sm pr-36">{product.description}</p>

          <div className="flex flex-col gap-3 mt-4">
            <AddToCartButton productId={product.ProductId} />
            <button className="w-1/2 text-sm font-semibold uppercase text-white px-20 sm:px-12 py-3 transition duration-300 ease-in-out bg-primary hover:bg-primary/90 border border-primary cursor-pointer">
              Buy it Now
            </button>
            <hr />
            <div className="flex gap-6 text-sm text-gray-600">
              <span>🟢 in Stock</span>
              <span>Free Shipping</span>
              <span>10-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
