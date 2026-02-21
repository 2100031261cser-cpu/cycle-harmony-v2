import { Button } from "@/components/Button";
export function CTASection() {
  const scrollToChecker = () => {
    const element = document.getElementById('cycle-phase-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <section id="contact" className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center">
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
          Start Your Journey to
          <span className="text-wellness-green block">Balanced Hormones</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
          Take the first step towards natural hormone balance with our specially crafted seed cycling laddus
        </p>

        <div className="flex justify-center">
          <Button variant="wellness" size="lg" onClick={scrollToChecker} className="px-12 py-8 text-xl shadow-hero hover:scale-105 transition-all">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  </section>;
}