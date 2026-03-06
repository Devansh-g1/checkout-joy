import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import CartStep from "@/components/CartStep";
import ShippingStep from "@/components/ShippingStep";
import PaymentStep from "@/components/PaymentStep";
import { Leaf } from "lucide-react";

const CheckoutFlow = () => {
  const { step } = useCheckout();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">EcoCart</span>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {step !== "success" && <StepIndicator />}
        {step === "cart" && <CartStep />}
        {step === "shipping" && <ShippingStep />}
        {step === "payment" && <PaymentStep />}
        {step === "success" && <PaymentStep />}
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <CheckoutProvider>
      <CheckoutFlow />
    </CheckoutProvider>
  );
};

export default Index;
