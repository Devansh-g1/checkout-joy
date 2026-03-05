import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartData, CartItem, fetchCartData } from "@/data/mockData";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

type Step = "cart" | "shipping" | "payment" | "success";

interface CheckoutState {
  cartData: CartData | null;
  loading: boolean;
  step: Step;
  shippingAddress: ShippingAddress | null;
  setStep: (s: Step) => void;
  setShippingAddress: (a: ShippingAddress) => void;
  updateQuantity: (id: number, qty: number) => void;
  subtotal: number;
  total: number;
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be inside CheckoutProvider");
  return ctx;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("cart");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    fetchCartData().then((data) => {
      setCartData(data);
      setLoading(false);
    });
  }, []);

  const updateQuantity = (id: number, qty: number) => {
    if (!cartData) return;
    setCartData({
      ...cartData,
      cartItems: cartData.cartItems.map((item) =>
        item.product_id === id ? { ...item, quantity: Math.max(1, qty) } : item
      ),
    });
  };

  const subtotal = cartData?.cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) ?? 0;
  const total = subtotal + (cartData?.shipping_fee ?? 0) - (cartData?.discount_applied ?? 0);

  return (
    <CheckoutContext.Provider
      value={{ cartData, loading, step, shippingAddress, setStep, setShippingAddress, updateQuantity, subtotal, total }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
