import { useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, CheckCircle2, Package, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";
import StickyBottomBar from "@/components/StickyBottomBar";

const PaymentStep = () => {
  const { cartData, selectedAddress, subtotal, total, setStep, step } = useCheckout();
  const [paying, setPaying] = useState(false);

  if (step === "success") {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-[scale-in_0.4s_ease-out]">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">Order Successful!</h2>
        <p className="text-muted-foreground mb-10 text-base">
          Thank you for your purchase. Your order has been placed and will be shipped soon.
        </p>
        <Button onClick={() => setStep("cart")} variant="outline" className="h-12 rounded-xl px-8">
          Back to Cart
        </Button>
      </div>
    );
  }

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setStep("success");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <h2 className="text-2xl sm:text-3xl font-display font-bold">Review & Pay</h2>

      {/* Order items */}
      <div className="bg-card rounded-2xl shadow-card border p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Order Items</h3>
        </div>
        <div className="space-y-3">
          {cartData?.cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover bg-muted" />
                <span>
                  {item.product_name} <span className="text-muted-foreground">× {item.quantity}</span>
                </span>
              </div>
              <span className="font-semibold">₹{item.product_price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹{cartData?.shipping_fee}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {selectedAddress && (
        <div className="bg-card rounded-2xl shadow-card border p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Shipping Address</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-0.5">
            <p className="text-foreground font-medium">{selectedAddress.fullName}</p>
            <p>{selectedAddress.email} · {selectedAddress.phone}</p>
            <p>{selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pinCode}</p>
          </div>
        </div>
      )}

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <StickyBottomBar>
        <Button variant="outline" onClick={() => setStep("shipping")} className="h-12 rounded-xl px-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={handlePay} disabled={paying} className="flex-1 h-12 rounded-xl text-base font-semibold">
          {paying ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Processing…
            </span>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" /> Pay Securely – ₹{total}
            </>
          )}
        </Button>
      </StickyBottomBar>
    </div>
  );
};

export default PaymentStep;
