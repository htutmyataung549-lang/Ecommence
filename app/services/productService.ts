const BASE_URL = "https://api.escuelajs.co/api/v1";

export const productService = {
  getAll: async (limit: number = 10, offset: number = 0) => {
    try {
      const res = await fetch(`${BASE_URL}/products?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error("API Fetching Error");
      const data = await res.json();
      return { success: true, message: "Success", data };
    } catch (error: unknown) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown Error Occurred" 
      };
    }
  },

  getById: async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      return { success: true, message: "Success", data };
    } catch (error: unknown) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown Error Occurred" 
      };    
    }
  }
};