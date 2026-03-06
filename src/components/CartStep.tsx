import { useCheckout } from "@/context/CheckoutContext";
import { Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StickyBottomBar from "@/components/StickyBottomBar";

const CartStep = () => {
  const { cartData, loading, subtotal, total, setStep, updateQuantity } = useCheckout();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!cartData) return null;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex gap-4 p-4 sm:p-5 bg-card rounded-2xl shadow-card border hover:shadow-elevated transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.product_name}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover bg-muted"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base leading-snug">{item.product_name}</h3>
                  <p className="text-primary font-bold mt-1 text-lg">₹{item.product_price}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-bold text-base sm:text-lg whitespace-nowrap self-start">
                ₹{item.product_price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl shadow-card border p-6 h-fit lg:sticky lg:top-24">
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
              <div className="flex justify-between text-primary">
                <span>Discount</span>
                <span>-₹{cartData.discount_applied}</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between text-base font-bold">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <StickyBottomBar>
        <div className="flex-1" />
        <Button onClick={() => setStep("shipping")} className="h-12 px-8 text-base font-semibold rounded-xl">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </StickyBottomBar>
    </div>
  );
};

export default CartStep;
