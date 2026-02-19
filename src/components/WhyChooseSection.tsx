import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "100% Natural Ingredients",
    our: true,
    other: false,
  },
  {
    feature: "No Artificial Preservatives",
    our: true,
    other: false,
  },
  {
    feature: "Doctor-Friendly Formula",
    our: true,
    other: false,
  },
  {
    feature: "Tasty & Enjoyable",
    our: true,
    other: false,
  },
  {
    feature: "Easy to Digest",
    our: true,
    other: false,
  },
  {
    feature: "Traditional Ayurvedic Base",
    our: true,
    other: false,
  },
  {
    feature: "No Side Effects",
    our: true,
    other: false,
  },
  {
    feature: "Sustainable & Eco-Friendly",
    our: true,
    other: false,
  }
];

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute top-10 right-20 w-56 h-56 bg-wellness-green-light/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-wellness-yellow/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose Our Laddus?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlike synthetic supplements or processed snacks, our laddus offer a natural, delicious approach to hormone balance
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-200">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-2 md:p-8 border border-white/50">
            {/* Desktop Header */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Features
                </h3>
              </div>
              <div className="text-center">
                <h3 className="font-heading text-xl font-semibold text-wellness-green mb-2">
                  Our Laddus
                </h3>
              </div>
              <div className="text-center">
                <h3 className="font-heading text-xl font-semibold text-muted-foreground mb-2">
                  Other Products
                </h3>
              </div>
            </div>

            {/* Mobile: Stacked Cards */}
            <div className="md:hidden space-y-3 mb-6">
              {comparisons.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-wellness-green/10 to-wellness-pink/10 rounded-xl p-4 shadow-sm">
                  <div className="text-foreground font-medium text-sm flex-1">
                    {item.feature}
                  </div>
                  <div className="flex gap-4 items-center ml-4">
                    <Check className="w-5 h-5 text-wellness-green flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden md:block space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-8 items-center py-4 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-wellness-green/5 hover:to-wellness-pink/5 transition-all duration-300 rounded-lg px-4">
                  <div className="text-foreground font-medium">
                    {item.feature}
                  </div>
                  <div className="flex justify-center">
                    <Check className="w-6 h-6 text-wellness-green" />
                  </div>
                  <div className="flex justify-center">
                    <X className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}