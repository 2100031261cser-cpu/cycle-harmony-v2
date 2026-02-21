import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RefreshCw, CheckCircle, XCircle, Clock, Mail, Phone, AlertCircle } from "lucide-react";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <RefreshCw className="w-12 h-12 text-wellness-green" />
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                                Refund & Cancellation Policy
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground">
                            Your satisfaction is our priority
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Last updated: February 12, 2026
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 delay-200">

                        {/* Introduction */}
                        <section>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At NHC Service, we are committed to providing you with high-quality wellness products and exceptional customer service. We understand that sometimes you may need to cancel an order or request a refund, and we want to make this process as smooth and transparent as possible.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This policy applies to all orders placed through our website or via WhatsApp. Please read this policy carefully to understand your rights and our procedures regarding cancellations and refunds.
                            </p>
                        </section>

                        {/* Order Cancellation Policy */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <XCircle className="w-6 h-6 text-wellness-pink" />
                                Order Cancellation Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You may cancel your order under the following circumstances:
                            </p>
                            <ul className="space-y-3 ml-6">
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Before shipment:</strong> If your order has not yet been shipped, you can cancel it by contacting us immediately. We will process the cancellation and issue a full refund.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>After shipment:</strong> Once your order has been shipped, cancellation may not be possible. In such cases, you may need to return the product following our return policy.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>WhatsApp orders:</strong> Orders placed via WhatsApp follow the same cancellation policy. Please contact us through WhatsApp or email to request cancellation.
                                </li>
                            </ul>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-lg">
                                <p className="text-gray-800 flex items-start gap-2">
                                    <span className="text-xl">💡</span>
                                    <span><strong>Quick Tip:</strong> To cancel an order, please contact us as soon as possible. The sooner you reach out, the higher the chance of successful cancellation before shipment.</span>
                                </p>
                            </div>
                        </section>

                        {/* Refund Eligibility */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-wellness-green" />
                                Refund Eligibility
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We offer refunds in the following situations:
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
                                <h3 className="font-semibold text-lg text-green-800 mb-3">✓ Eligible for Refund</h3>
                                <ul className="space-y-2 ml-6 list-disc">
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Damaged products:</strong> Products received in damaged condition due to shipping or handling
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Incorrect products:</strong> Wrong items delivered that differ from what was ordered
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Defective products:</strong> Products that are faulty or not functioning as intended
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Missing items:</strong> Incomplete orders with missing products
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <p className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                    Important Notice
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    To be eligible for a refund, you must report any issues (damaged, incorrect, or defective products) within <strong>48 hours of delivery</strong>. Please inspect your order upon receipt and contact us immediately if you notice any problems.
                                </p>
                            </div>
                        </section>

                        {/* Refund Process */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Refund Process
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To request a refund, please follow these steps:
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-wellness-green text-white rounded-full flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Contact us immediately</h3>
                                        <p className="text-gray-700 leading-relaxed">Reach out to us via email at <a href="mailto:nhccycleharmony@gmail.com" className="text-wellness-green hover:underline">nhccycleharmony@gmail.com</a> or phone within 48 hours of delivery. Include your order number and a description of the issue.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-wellness-green text-white rounded-full flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Provide evidence</h3>
                                        <p className="text-gray-700 leading-relaxed">Send us photos or videos clearly showing the damage, defect, or incorrect item. This helps us process your request faster.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-wellness-green text-white rounded-full flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Return the product (if required)</h3>
                                        <p className="text-gray-700 leading-relaxed">In some cases, we may ask you to return the product. We will provide you with return instructions and cover the return shipping costs for eligible refunds.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-wellness-green text-white rounded-full flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Verification</h3>
                                        <p className="text-gray-700 leading-relaxed">Once we receive your request and verify the issue, we will process your refund.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-wellness-green text-white rounded-full flex items-center justify-center font-bold">5</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Refund processing</h3>
                                        <p className="text-gray-700 leading-relaxed">Refunds will be processed to your original payment method within 7 working days after verification.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-lg">
                                <p className="text-gray-800 flex items-start gap-2">
                                    <span className="text-xl">📧</span>
                                    <span><strong>Contact Information:</strong> For refund requests, please include your order number, photos of the issue, and a brief description in your email to ensure quick processing.</span>
                                </p>
                            </div>
                        </section>

                        {/* Non-Refundable Cases */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <XCircle className="w-6 h-6 text-red-500" />
                                Non-Refundable Cases
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please note that refunds will not be provided in the following situations:
                            </p>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <ul className="space-y-2 ml-6 list-disc">
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Opened or consumed products:</strong> Products that have been opened, used, or consumed are not eligible for refunds due to health and safety reasons.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Change of mind:</strong> Refunds are not available simply because you changed your mind about the purchase after receiving the product.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Late reporting:</strong> Issues reported after 48 hours of delivery may not be eligible for refunds, as we cannot verify the condition of the product at the time of delivery.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Normal wear and tear:</strong> Minor cosmetic issues that do not affect the product's functionality or safety.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Improper storage:</strong> Products damaged due to improper storage or handling by the customer after delivery.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <strong>Allergic reactions:</strong> Refunds are not available for allergic reactions, as customers are responsible for checking ingredients before purchase.
                                    </li>
                                </ul>
                            </div>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                We recommend carefully reviewing product descriptions, ingredients, and usage instructions before making a purchase to ensure the product meets your needs.
                            </p>
                        </section>

                        {/* Refund Timeline */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-wellness-green" />
                                Refund Timeline
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Here's what you can expect regarding refund processing times:
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-wellness-green mb-2">1</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Request Submission</h3>
                                    <p className="text-sm text-gray-700">Within 48 hours of delivery</p>
                                </div>
                                <div className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-wellness-green mb-2">2</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Verification & Processing</h3>
                                    <p className="text-sm text-gray-700">1-3 working days after request submission</p>
                                </div>
                                <div className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-wellness-green mb-2">3</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Refund Credit</h3>
                                    <p className="text-sm text-gray-700">Within 7 working days to your original payment method</p>
                                </div>
                            </div>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <p className="text-gray-800 flex items-start gap-2">
                                    <span className="text-xl">⏱️</span>
                                    <span><strong>Processing Time:</strong> Refunds will be processed to your original payment method within 7 working days after we verify and approve your refund request. The actual time for the refund to appear in your account may vary depending on your bank or payment provider (typically 3-5 additional business days).</span>
                                </p>
                            </div>
                        </section>

                        {/* WhatsApp Orders */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                WhatsApp Orders
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Orders placed via WhatsApp are covered by the same refund and cancellation policy. Whether you order through our website or WhatsApp, you have the same rights and protections.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To request a refund or cancellation for a WhatsApp order:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li className="text-gray-700 leading-relaxed">
                                    Contact us via WhatsApp with your order details
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Or email us at <a href="mailto:nhccycleharmony@gmail.com" className="text-wellness-green hover:underline">nhccycleharmony@gmail.com</a> with your order information
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Follow the same refund process and timeline as website orders
                                </li>
                            </ul>
                        </section>

                        {/* Contact for Support */}
                        <section className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-2xl">
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Contact for Support
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions, concerns, or need assistance with cancellations or refunds, our customer support team is here to help. Please don't hesitate to reach out to us:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-wellness-green" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Email</p>
                                        <a href="mailto:nhccycleharmony@gmail.com" className="text-wellness-green hover:underline">
                                            nhccycleharmony@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-wellness-green" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Phone</p>
                                        <p className="text-gray-700">+91 93471 22416</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/50 p-4 rounded-lg mt-4">
                                <p className="text-gray-800 flex items-start gap-2">
                                    <span className="text-xl">💬</span>
                                    <span><strong>We're Here to Help:</strong> Our customer support team is available to assist you with any questions or concerns. We aim to respond to all inquiries within 24-48 hours during business days.</span>
                                </p>
                            </div>
                        </section>

                        {/* Additional Information */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Additional Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to modify this Refund & Cancellation Policy at any time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about our refund and cancellation procedures.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any questions about this policy or need clarification on any aspect of our refund and cancellation process, please contact our support team using the information provided above.
                            </p>
                        </section>

                        {/* Thank You */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-700 italic">
                                Thank you for choosing NHC Service. We value your trust and are committed to ensuring your satisfaction.
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
