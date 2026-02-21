import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, Check } from "lucide-react";
import phase1Image from "@/assets/phase_1_transprant.png";
import phase2Image from "@/assets/Phase_2_transprant.png";
import { CycleCompanion } from "@/components/CycleCompanion";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

const products = [
    {
        id: 1,
        name: "Phase I Laddu",
        description: "Specially crafted with flaxseeds and pumpkin seeds to support your follicular phase. These nutrient-dense laddus help boost estrogen levels naturally and support healthy ovulation.",
        price: 499,
        originalPrice: 599,
        image: phase1Image,
        days: "Days 1-14",
        ingredients: "Flaxseeds, Pumpkin Seeds, Jaggery, Ghee",
        benefits: [
            "Supports healthy estrogen balance",
            "Helps regulate ovulation (beneficial for PCOD/PCOS)",
            "Reduces inflammation and hormonal imbalance",
            "Rich in omega-3 fatty acids for skin and metabolic support"
        ],
        rating: 4.8,
        reviews: 156,
        badge: "Best Seller",
        badgeColor: "bg-green-500",
        quantity: 15
    },
    {
        id: 2,
        name: "Phase II Laddu",
        description: "Formulated with sesame seeds and sunflower seeds to nourish your luteal phase. These delicious laddus help support progesterone production and reduce PMS symptoms.",
        price: 499,
        originalPrice: 599,
        image: phase2Image,
        days: "Days 15-28",
        ingredients: "Sesame Seeds, Sunflower Seeds, Jaggery, Ghee",
        benefits: [
            "Supports natural progesterone production",
            "Helps reduce PMS and mood swings",
            "Supports better sleep and stress balance",
            "Rich in vitamin E and antioxidants for reproductive health"
        ],
        rating: 4.9,
        reviews: 143,
        badge: "Popular",
        badgeColor: "bg-pink-500",
        quantity: 15
    }
];

export default function ShopNow() {
    const handleAddToCart = (productName: string) => {
        // Scroll to the local cycle-phase-checker section
        const element = document.getElementById('cycle-phase-checker');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        Shop Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Seed Cycling</span> Laddus
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Natural hormone support through the power of seeds. Choose the perfect laddu for your cycle phase.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <FadeIn>
                {/* Products Grid */}
                <FadeIn>
                    <section className="py-20 px-4">
                        <div className="container mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                                {products.map((product) => (
                                    <div className="perspective-1000 group h-full">
                                        <div className="relative h-full bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 shadow-2xl transition-all duration-500 transform preserve-3d group-hover:rotate-x-2 group-hover:rotate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
                                            {/* Noise Texture Overlay */}
                                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

                                            {/* Badge */}
                                            <div className="absolute top-6 right-6 z-30 transform translate-z-30 group-hover:translate-z-40 transition-transform duration-500">
                                                <span className={`${product.badgeColor} text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg tracking-widest uppercase`}>
                                                    {product.badge}
                                                </span>
                                            </div>

                                            {/* Product Image Container */}
                                            <div className="bg-gradient-to-br from-gray-50/50 to-white/50 p-12 flex justify-center items-center relative overflow-hidden h-96">
                                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 drop-shadow-2xl z-20 relative"
                                                    style={{ transform: 'translateZ(50px)' }}
                                                />
                                                {/* Floating Particles */}
                                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-300 rounded-full opacity-0 group-hover:opacity-80 animate-ping delay-100 blur-[1px]"></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-pink-300 rounded-full opacity-0 group-hover:opacity-80 animate-ping delay-300 blur-[1px]"></div>
                                            </div>

                                            <CardHeader className="pb-4 pt-6 px-8 relative z-20">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <CardTitle className="text-3xl font-heading font-bold text-gray-900 mb-2">
                                                            {product.name}
                                                        </CardTitle>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-500 font-medium">
                                                                ({product.reviews} reviews)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full whitespace-nowrap">
                                                        {product.days}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-wellness-green mt-2">
                                                    Quantity: {product.quantity} Laddus
                                                </p>
                                            </CardHeader>

                                            <CardContent className="space-y-8 relative z-20 px-8 pb-8">
                                                <CardDescription className="text-gray-600 text-lg leading-relaxed font-light">
                                                    {product.description}
                                                </CardDescription>

                                                {/* Ingredients */}
                                                <div className="bg-white/40 rounded-2xl p-5 border border-white/60 shadow-sm backdrop-blur-sm">
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                                        Key Ingredients
                                                    </p>
                                                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{product.ingredients}</p>
                                                </div>

                                                {/* Benefits */}
                                                <div className="space-y-4">
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                                        Benifits
                                                    </p>
                                                    <ul className="grid gap-3">
                                                        {product.benefits.slice(0, 3).map((benefit, index) => (
                                                            <li key={index} className="flex items-start gap-4 text-sm text-gray-700 group/item">
                                                                <div className="mt-1 bg-green-100/80 p-1.5 rounded-full group-hover/item:bg-green-200 transition-colors">
                                                                    <Check className="h-3.5 w-3.5 text-green-700 block" />
                                                                </div>
                                                                <span className="leading-relaxed">{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Divider */}
                                                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                                                {/* Price and CTA */}
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Price</span>
                                                        <div className="flex items-baseline gap-3">
                                                            <span className="text-4xl font-heading font-bold text-gray-900">₹{product.price}</span>
                                                            <span className="text-lg text-gray-400 line-through decoration-gray-300">₹{product.originalPrice}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200 shadow-sm">
                                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% SAVE
                                                        </span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => handleAddToCart(product.name)}
                                                    className="w-full bg-gray-900 hover:bg-black text-white py-7 text-lg font-medium rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group-hover:ring-4 group-hover:ring-gray-100"
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <ShoppingCart className="h-5 w-5" />
                                                        Add to Cart
                                                    </span>
                                                </Button>
                                            </CardContent>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeIn>
            </FadeIn>


            {/* Cycle Companion (Order Form) */}
            <FadeIn>
                <CycleCompanion />
            </FadeIn>

            <Footer />
        </div >
    );
}

