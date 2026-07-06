import { create } from "zustand";
import { Product, CartItem } from "@/types";
import { productService } from "../services/productService";

interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;

  fetchCart: () => void;
  addToCart: (product: Product, quantity?: number) => Promise<{ success: boolean; message: string }>;
  updateQuantity: (productId: number, quantity: number) => { success: boolean; message: string };
  removeFromCart: (productId: number) => { success: boolean; message: string };
  clearCart: () => { success: boolean; message: string };
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  loading: false,
  error: null,

  fetchCart: () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("platzi_cart");
      if (localData) {
        set({ cart: JSON.parse(localData) });
      }
    }
  },

  addToCart: async (product: Product, quantity: number = 1) => {
    set({ loading: true, error: null });
    
    const res = await productService.getById(product.id);
    if (!res.success || !res.data) {
      set({ loading: false, error: "It seems like the product is not available" });
      return { success: false, message: "Item not available" };
    }

    const verifiedProduct = res.data as Product;
    const currentCart = get().cart;
    const exists = currentCart.find((item) => item.productId === verifiedProduct.id);

    let updatedCart: CartItem[] = [];

    if (exists) {
      updatedCart = currentCart.map((item) =>
        item.productId === verifiedProduct.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      );
    } else {
      const newItem: CartItem = {
        id: verifiedProduct.id,
        productId: verifiedProduct.id,
        quantity: quantity,
        product: verifiedProduct,
      };
      updatedCart = [...currentCart, newItem];
    }

    set({ cart: updatedCart, loading: false });
    localStorage.setItem("platzi_cart", JSON.stringify(updatedCart));
    return { success: true, message: "Item added to cart" };
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) return get().removeFromCart(productId);

    const updatedCart = get().cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    set({ cart: updatedCart });
    localStorage.setItem("platzi_cart", JSON.stringify(updatedCart));
    return { success: true, message: "Quantity updated successfully" };
  },

  removeFromCart: (productId: number) => {
    const updatedCart = get().cart.filter((item) => item.productId !== productId);
    set({ cart: updatedCart });
    localStorage.setItem("platzi_cart", JSON.stringify(updatedCart));
    return { success: true, message: "Item removed from cart" };
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("platzi_cart");
    return { success: true, message: "Cart cleared successfully" };
  },

  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));