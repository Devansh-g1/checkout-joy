export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export const fetchCartData = (): Promise<CartData> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          cartItems: [
            {
              product_id: 101,
              product_name: "Bamboo Toothbrush (Pack of 4)",
              product_price: 299,
              quantity: 2,
              image: "https://via.placeholder.com/150",
            },
            {
              product_id: 102,
              product_name: "Reusable Cotton Produce Bags",
              product_price: 450,
              quantity: 1,
              image: "https://via.placeholder.com/150",
            },
          ],
          shipping_fee: 50,
          discount_applied: 0,
        }),
      400
    )
  );
