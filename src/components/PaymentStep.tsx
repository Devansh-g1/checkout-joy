import { useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, CheckCircle2, Package, MapPin } from "lucide-react";
import { useState } from "react";

const PaymentStep = () => {
  const { cartData, shippingAddress, subtotal, total, setStep, step } = useCheckout();
  const [paying, setPaying] = useState(false);

  if (step === "success") {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-3">Order Successful!</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been placed and will be shipped soon.
        </p>
        <Button onClick={() => setStep("cart")} variant="outline" className="h-11">
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
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-display font-bold">Review & Pay</h2>

      {/* Order items */}
      <div className="bg-card rounded-xl shadow-card border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Order Items</h3>
        </div>
        <div className="space-y-3">
          {cartData?.cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between text-sm">
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span className="font-medium">₹{item.product_price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-3 space-y-1 text-sm">
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
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {shippingAddress && (
        <div className="bg-card rounded-xl shadow-card border p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Shipping Address</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-0.5">
            <p className="text-foreground font-medium">{shippingAddress.fullName}</p>
            <p>{shippingAddress.email}</p>
            <p>{shippingAddress.phone}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} – {shippingAddress.pinCode}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => setStep("shipping")} className="h-12">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={handlePay} disabled={paying} className="flex-1 h-12 text-base font-semibold">
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
      </div>
    </div>
  );
};

export default PaymentStep;
