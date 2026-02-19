import { Button } from "@/components/Button";
import { Check, Truck, Shield, Heart, MapPin } from "lucide-react";
import phase1LadduProduct from "@/assets/phase_1_transprant.png";
import phase2LadduProduct from "@/assets/Phase_2_transprant.png";
const features = [{
  icon: Check,
  text: "30-Day Money Back Guarantee"
}, {
  icon: Truck,
  text: "Free Shipping on Orders Above ₹999"
}, {
  icon: Shield,
  text: "100% Natural & Safe"
}, {
  icon: Heart,
  text: "Made with Love & Care"
}];
export function CTASection() {
  const scrollToChecker = () => {
    const element = document.getElementById('cycle-phase-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <section id="contact" className="py-20 wellness-gradient relative overflow-hidden">
    {/* Background Decorations */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-wellness-pink/20 rounded-full blur-2xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-wellness-yellow/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
          Start Your Journey to
          <span className="text-wellness-green block">Balanced Hormones</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
          Take the first step towards natural hormone balance with our specially crafted seed cycling laddus
        </p>
      </div>

      {/* Individual Product Blocks */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Phase I Laddu */}
        <div className="bg-yellow-100 rounded-3xl shadow-card p-8 text-center">
          <img
            src={phase1LadduProduct}
            alt="Phase I Laddu"
            className="w-48 h-48 mx-auto mb-6 object-cover rounded-full"
          />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
            Phase I Laddu
          </h3>
          <p className="text-muted-foreground mb-4">
            Flaxseeds & pumpkin seeds for follicular phase (Days 1-14)
          </p>
          <div className="text-3xl font-bold text-wellness-green mb-6">₹390</div>
          <Button variant="wellness" size="lg" onClick={scrollToChecker}>
            Order Now
          </Button>
        </div>

        {/* Phase II Laddu */}
        <div className="bg-pink-100 rounded-3xl shadow-card p-8 text-center">
          <img
            src={phase2LadduProduct}
            alt="Phase II Laddu"
            className="w-64 h-64 mx-auto mb-6 object-cover rounded-full bg-pink-100"
          />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
            Phase II Laddu
          </h3>
          <p className="text-muted-foreground mb-4">
            Sesame & sunflower seeds for luteal phase (Days 15-28)
          </p>
          <div className="text-3xl font-bold text-wellness-green mb-6">₹390</div>
          <Button variant="wellness" size="lg" onClick={scrollToChecker}>
            Order Now
          </Button>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-wellness-yellow/30 border border-wellness-yellow/40 rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-6 h-6 text-wellness-green flex-shrink-0" />
            <div className="text-center">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Delivery Information
              </h3>
              <p className="text-base text-foreground">
                Currently delivering only within Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>;
}