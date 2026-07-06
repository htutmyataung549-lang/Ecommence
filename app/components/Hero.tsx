import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <span className="bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider">
            New Season Arrivals 2026
          </span>

          <h1 className="text-4xl mt-4 md:text-6xl font-black tracking-tight leading-none">
            Shop Your Favorite Products <br />
            <span className="text-blue-500">All in One Place</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl">
            Discover the latest fashion, electronics, and accessories powered by the
            Platzi Fake Store API. Enjoy premium quality products at affordable prices
            with a seamless and secure shopping experience.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#shop-section"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200 text-sm md:text-base"
            >
              Shop Now
            </a>

            <Link
              href="/cart"
              className="border border-gray-600 hover:border-white text-gray-300 hover:text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm md:text-base"
            >
              View Cart
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-none relative aspect-square md:h-[400px] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="Premium E-commerce Shopping Experience"
            fill
            priority
            className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}