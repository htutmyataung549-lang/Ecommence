import { Product } from "@/types";
import ProductError from "./ProductError";
import ProductCard from "./ProductCard";
import { productService } from "../services/productService";

export default async function ProductList() {
  const response = await productService.getAll(20, 0);
  const products: Product[] = response.success ? response.data : [];

  return (
    <section id="shop-section" className="bg-slate-900 text-white py-12 scroll-mt-24">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Latest Products from Platzi API
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              This section showcases a diverse range of products fetched directly from the Platzi API, providing users with a comprehensive view of available items.
            </p>
          </div>
          
          <span className="text-slate-300 text-sm font-medium mt-2 md:mt-0 bg-slate-800 px-3 py-1.5 rounded-md shadow-sm border border-slate-700">
            Total: <strong className="text-white font-bold">{products.length}</strong> found.
          </span>
        </div>

        {!response.success || products.length === 0 ? (
          <ProductError message={response.message} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}