import { useCheckout } from "@/context/CheckoutContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartStep = () => {
  const { cartData, loading, subtotal, total, setStep, updateQuantity } = useCheckout();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-28 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!cartData) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-display font-bold">Your Cart</h2>
        {cartData.cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex gap-4 p-4 bg-card rounded-xl shadow-card border"
          >
            <img
              src={item.image}
              alt={item.product_name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-muted"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base truncate">{item.product_name}</h3>
              <p className="text-primary font-bold mt-1">₹{item.product_price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-border transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-border transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="font-bold text-sm sm:text-base whitespace-nowrap">
              ₹{item.product_price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-card rounded-xl shadow-card border p-6 h-fit lg:sticky lg:top-8">
        <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">₹{cartData.shipping_fee}</span>
          </div>
          {cartData.discount_applied > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>-₹{cartData.discount_applied}</span>
            </div>
          )}
          <div className="border-t pt-3 flex justify-between text-base font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <Button onClick={() => setStep("shipping")} className="w-full mt-6 h-12 text-base font-semibold">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartStep;
