import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, AlertTriangle, ShoppingCart, DollarSign, Users, Scale, Mail } from "lucide-react";

export default function TermsConditions() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-12 h-12 text-wellness-green" />
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                                Terms & Conditions
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground">
                            Please read these terms carefully before using our services
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Last updated: February 12, 2026
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 delay-200">

                        {/* Acceptance of Terms */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-wellness-green" />
                                Acceptance of Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Welcome to NHC Service. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms & Conditions apply to all visitors, users, and others who access or use our services. We reserve the right to update, change, or replace any part of these Terms & Conditions at any time without prior notice.
                            </p>
                        </section>

                        {/* Product Information Disclaimer */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6 text-wellness-pink" />
                                Product Information Disclaimer
                            </h2>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4 rounded-r-lg">
                                <p className="text-gray-800 font-bold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    Important Health Disclaimer
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Our products are designed for general wellness support and are not intended to diagnose, treat, cure, or prevent any disease or medical condition. They are not a substitute for professional medical advice, diagnosis, or treatment.
                                </p>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                The information provided on this website and product labels is for educational purposes only. Individual results may vary, and we do not guarantee specific health outcomes.
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please consult with a qualified healthcare professional before starting any new wellness regimen, especially if you:
                            </p>

                            <ul className="space-y-2 ml-6 list-disc mb-4">
                                <li className="text-gray-700 leading-relaxed">
                                    Have existing medical conditions or are taking prescription medications
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Are pregnant, nursing, or planning to become pregnant
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Have allergies or sensitivities to any ingredients
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Are under 18 years of age
                                </li>
                            </ul>

                            <p className="text-gray-700 leading-relaxed">
                                If you experience any adverse reactions or have concerns about our products, discontinue use immediately and consult with a healthcare professional.
                            </p>
                        </section>

                        {/* Orders & Payments */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6 text-wellness-green" />
                                Orders & Payments
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you place an order through our website, you are making an offer to purchase products subject to our acceptance. All orders are subject to:
                            </p>
                            <ul className="space-y-3 ml-6">
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Product availability:</strong> We reserve the right to refuse or cancel any order if products are unavailable or if there are errors in pricing or product information.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Order confirmation:</strong> Your order is confirmed only after we send you an order confirmation email. We may cancel orders that appear fraudulent or placed with incorrect information.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Payment processing:</strong> We use secure payment gateways (Razorpay) to process your payments. All payment information is encrypted and secure.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Order modifications:</strong> Once an order is confirmed, modifications may not always be possible. Please contact us immediately if you need to make changes.
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                We strive to process and ship orders promptly. However, delivery times may vary based on your location and product availability. We will keep you informed about your order status via email or phone.
                            </p>
                        </section>

                        {/* Pricing */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <DollarSign className="w-6 h-6 text-wellness-green" />
                                Pricing
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All prices displayed on our website are in Indian Rupees (₹) and are subject to change without prior notice. The price you pay is the price displayed at the time of order confirmation.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc mb-4">
                                <li className="text-gray-700 leading-relaxed">
                                    Modify prices at any time
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Correct pricing errors, even after an order has been placed
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Offer promotional discounts or special pricing that may be limited in duration
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                If a pricing error is discovered after your order is confirmed, we will notify you and provide options to proceed with the corrected price or cancel your order.
                            </p>
                        </section>

                        {/* User Responsibilities */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-wellness-green" />
                                User Responsibilities
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                As a user of our services, you agree to:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li className="text-gray-700 leading-relaxed">
                                    Provide accurate, current, and complete information when placing orders
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Maintain the security of your account information and password (if applicable)
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Use our products responsibly and in accordance with product instructions
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Consult with healthcare professionals when necessary before using our products
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Notify us immediately of any unauthorized use of your account or any other breach of security
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Not use our products for any illegal or unauthorized purpose
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Not attempt to gain unauthorized access to any part of our website or systems
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Limitation of Liability
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To the fullest extent permitted by law, NHC Service shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc mb-4">
                                <li className="text-gray-700 leading-relaxed">
                                    Your use or inability to use our products or services
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Any unauthorized access to or use of our servers and/or any personal information stored therein
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Any interruption or cessation of transmission to or from our website
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our total liability to you for all claims arising from or related to the use of our products or services shall not exceed the amount you paid to us in the twelve (12) months prior to the action giving rise to liability.
                            </p>
                            <p className="text-gray-600 text-sm italic">
                                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
                            </p>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Scale className="w-6 h-6 text-wellness-green" />
                                Governing Law
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Any disputes arising out of or relating to these Terms & Conditions or our products and services shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, India.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                NHC Service operates under Indian laws and regulations. We comply with all applicable local, state, and national laws governing the sale and distribution of wellness products in India.
                            </p>
                        </section>

                        {/* Additional Terms */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Additional Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc mb-4">
                                <li className="text-gray-700 leading-relaxed">
                                    Modify or discontinue any aspect of our website or services at any time
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Refuse service to anyone for any reason at any time
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Update these Terms & Conditions at any time, with changes taking effect immediately upon posting
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Limit the quantities of products available for purchase
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                If any provision of these Terms & Conditions is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                            </p>
                        </section>

                        {/* Questions About Terms */}
                        <section className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-2xl">
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Questions About Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about these Terms & Conditions, please contact us at:
                            </p>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-wellness-green" />
                                <div>
                                    <p className="font-semibold text-gray-800">Email:</p>
                                    <a href="mailto:nhccycleharmony@gmail.com" className="text-wellness-green hover:underline">
                                        nhccycleharmony@gmail.com
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Agreement Notice */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-700 font-semibold mb-2">
                                By using this website, you agree to these Terms & Conditions.
                            </p>
                            <p className="text-gray-700 italic">
                                Thank you for choosing NHC Service for your wellness journey.
                            </p>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center pt-4">
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
