import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Clock, MapPin, Gift, Mail } from "lucide-react";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Truck className="w-12 h-12 text-wellness-green" />
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                                Shipping Policy
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Last updated: 12 February 2026
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 delay-200">

                        {/* Delivery Area */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-wellness-green" />
                                Delivery Area
                            </h2>
                            <div className="bg-gradient-to-r from-wellness-pink/10 to-wellness-green/10 p-6 rounded-2xl border-l-4 border-wellness-pink">
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    We currently deliver only within <strong className="text-wellness-pink">Hyderabad and surrounding areas</strong>.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    We are working to expand to more cities soon.
                                </p>
                            </div>
                        </section>

                        {/* Processing & Delivery Time */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-wellness-green" />
                                Processing & Delivery Time
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Order Processing</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Orders are typically processed within <strong>1–2 business days</strong>.
                                    </p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Delivery Time</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Delivery usually takes <strong>2–5 business days</strong> within Hyderabad, depending on your location.
                                    </p>
                                </div>
                                <div className="bg-wellness-green/10 border border-wellness-green/30 rounded-xl p-6">
                                    <p className="text-gray-700 leading-relaxed flex items-start gap-2">
                                        <span className="text-2xl">📱</span>
                                        <span>You will receive updates via <strong>WhatsApp or phone</strong> about your order status.</span>
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Free Shipping */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Gift className="w-6 h-6 text-wellness-pink" />
                                Free Shipping
                            </h2>
                            <div className="bg-gradient-to-br from-wellness-green/20 to-wellness-pink/20 p-8 rounded-2xl border-2 border-wellness-green/30">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-wellness-green mb-2">🎉 Free Shipping!</p>
                                    <p className="text-xl text-gray-800 mb-4">
                                        On orders above <strong className="text-wellness-pink text-2xl">₹999</strong>
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        For orders below this amount, a nominal delivery charge may apply.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-2xl">
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Questions About Shipping?
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For questions about shipping, please contact us:
                            </p>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-wellness-green" />
                                <div>
                                    <p className="font-semibold text-gray-800">Email:</p>
                                    <a href="mailto:support@nhcservice.in" className="text-wellness-green hover:underline">
                                        support@nhcservice.in
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Back to Home */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-wellness-green hover:text-wellness-pink transition-colors font-semibold"
                            >
                                ← Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
