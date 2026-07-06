import { Product } from "@/types";

export const PLATZI_PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    title: "Classic Aventur Black T-Shirt",
    price: 35,
    description: "The Olimpia Tunnel neck premium cotton t-shirt features a modern fit, crafted from high-quality breathable fabric. Perfect for everyday casual wear.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600"
    ],
    creationAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
      creationAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  },
  {
    id: 2,
    title: "Sleek ANC Wireless Headphones",
    price: 125,
    description: "Experience pure sound with ultimate comfort. Equipped with Active Noise Cancellation (ANC), 40-hour battery life, and crystal-clear microphone quality.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600"
    ],
    creationAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600",
      creationAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  },
  {
    id: 3,
    title: "Retro Leather Low-Top Sneakers",
    price: 85,
    description: "A combination of vintage aesthetics and modern comfort. Features full-grain leather upper, durable rubber cupsole, and cushioned insole.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600"
    ],
    creationAt: "2026-01-02T00:00:00.000Z",
    updatedAt: "2026-01-03T00:00:00.000Z",
    category: {
      id: 3,
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
      creationAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  },
  {
    id: 4,
    title: "Minimalist Walnut Wooden Desk",
    price: 250,
    description: "Upgrade your workspace with this elegant solid walnut desk. Responsibly sourced premium wood, sturdy steel legs, and pre-drilled cable management holes.",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600"
    ],
    creationAt: "2026-01-03T00:00:00.000Z",
    updatedAt: "2026-01-03T00:00:00.000Z",
    category: {
      id: 4,
      name: "Furniture",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600",
      creationAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  }
];