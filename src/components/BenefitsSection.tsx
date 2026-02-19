import { Flower2, Sparkles, Moon, Leaf, Shield } from "lucide-react";

const benefits = [
  {
    icon: Flower2,
    title: "Balance PCOD/PCOS",
    description: "Supports hormonal balance and helps regulate menstrual cycles"
  },
  {
    icon: Sparkles,
    title: "Fertility Support",
    description: "Care for your reproductive system with nourishing nutrients that support your fertility journey."
  },
  {
    icon: Shield,
    title: "PMS Relief",
    description: "Reduce mood swings, bloating, and other uncomfortable PMS symptoms"
  },
  {
    icon: Sparkles,
    title: "Glowing Skin",
    description: "Achieve clearer, more radiant skin through balanced hormones"
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Improve sleep quality and reduce nighttime restlessness"
  },
  {
    icon: Leaf,
    title: "Natural Nutrients",
    description: "Rich in omega-3s, lignans, vitamins, and minerals your body needs"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-green-50 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-wellness-pink/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-wellness-green-light/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-wellness-yellow/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Benefits of Seed Cycling Laddus
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how our specially crafted laddus can transform your monthly cycle and overall well-being
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-wellness-green/20 to-wellness-pink/20 rounded-2xl mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-wellness-green" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}