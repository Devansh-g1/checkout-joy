import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartData, fetchCartData } from "@/data/mockData";

export interface ShippingAddress {
  id: string;
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
  savedAddresses: ShippingAddress[];
  selectedAddressId: string | null;
  setStep: (s: Step) => void;
  addAddress: (a: ShippingAddress) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  selectedAddress: ShippingAddress | null;
  updateQuantity: (id: number, qty: number) => void;
  subtotal: number;
  total: number;
}

const LS_KEY = "ecocart_state";

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function persistState(data: { step: Step; savedAddresses: ShippingAddress[]; selectedAddressId: string | null; cartData: CartData | null }) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be inside CheckoutProvider");
  return ctx;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const persisted = loadPersistedState();

  const [cartData, setCartData] = useState<CartData | null>(persisted?.cartData ?? null);
  const [loading, setLoading] = useState(!persisted?.cartData);
  const [step, setStep] = useState<Step>(persisted?.step ?? "cart");
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>(persisted?.savedAddresses ?? []);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(persisted?.selectedAddressId ?? null);

  useEffect(() => {
    if (!persisted?.cartData) {
      fetchCartData().then((data) => {
        setCartData(data);
        setLoading(false);
      });
    }
  }, []);

  // Persist on changes
  useEffect(() => {
    persistState({ step, savedAddresses, selectedAddressId, cartData });
  }, [step, savedAddresses, selectedAddressId, cartData]);

  const updateQuantity = (id: number, qty: number) => {
    if (!cartData) return;
    setCartData({
      ...cartData,
      cartItems: cartData.cartItems.map((item) =>
        item.product_id === id ? { ...item, quantity: Math.max(1, qty) } : item
      ),
    });
  };

  const addAddress = (a: ShippingAddress) => {
    setSavedAddresses((prev) => [...prev, a]);
    setSelectedAddressId(a.id);
  };

  const removeAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) setSelectedAddressId(null);
  };

  const selectAddress = (id: string) => setSelectedAddressId(id);

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) ?? null;

  const subtotal = cartData?.cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) ?? 0;
  const total = subtotal + (cartData?.shipping_fee ?? 0) - (cartData?.discount_applied ?? 0);

  return (
    <CheckoutContext.Provider
      value={{
        cartData, loading, step, savedAddresses, selectedAddressId, selectedAddress,
        setStep, addAddress, removeAddress, selectAddress, updateQuantity, subtotal, total,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
