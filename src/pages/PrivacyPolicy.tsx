import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Users, FileText, Mail, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Shield className="w-12 h-12 text-wellness-green" />
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground">
                            Your privacy is important to us
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Last updated: February 12, 2026
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 delay-200">

                        {/* Introduction */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-wellness-green" />
                                Introduction
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Welcome to NHC Service, a trusted women's health and wellness brand. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                By using our services, you agree to the collection and use of information in accordance with this policy. We respect your privacy and are dedicated to maintaining the confidentiality of your personal information.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-wellness-green" />
                                Information We Collect
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To provide you with the best service experience, we collect the following types of information:
                            </p>
                            <ul className="space-y-2 ml-6">
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Personal Information:</strong> Name, phone number, and delivery address
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Payment Information:</strong> Payment-related details processed securely through our payment gateway
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Order Information:</strong> Details about your purchases, preferences, and transaction history
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Communication Data:</strong> Messages and inquiries you send to us
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                We collect this information only to process your orders, improve our services, and provide you with a personalized experience. We do not collect any unnecessary information.
                            </p>
                        </section>

                        {/* How We Use Information */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                How We Use Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li className="text-gray-700 leading-relaxed">
                                    To process and fulfill your orders
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    To communicate with you about your orders and provide customer support
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    To improve our products and services based on your feedback
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    To send you important updates about our services (only with your consent)
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    To ensure the security and integrity of our platform
                                </li>
                            </ul>
                            <div className="bg-wellness-green/10 border-l-4 border-wellness-green p-4 mt-4 rounded-r-lg">
                                <p className="text-gray-800 font-semibold flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-wellness-green" />
                                    Important: We do NOT sell, rent, or misuse your personal information. Your data is used solely for the purposes stated above.
                                </p>
                            </div>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lock className="w-6 h-6 text-wellness-green" />
                                Data Security
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. However, we continuously work to improve our security practices to safeguard your data.
                            </p>
                        </section>

                        {/* Third-Party Services */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Third-Party Services
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use trusted third-party services to enhance your experience:
                            </p>
                            <ul className="space-y-3 ml-6">
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Razorpay:</strong> We use Razorpay for secure payment processing. Your payment information is handled directly by Razorpay and is subject to their privacy policy. We do not store your complete payment card details on our servers.
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    <strong>Delivery Partners:</strong> We share necessary delivery information (name, address, phone) with our delivery partners to fulfill your orders.
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                These third-party services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these external services.
                            </p>
                        </section>

                        {/* User Consent */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                User Consent
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By using our services, you consent to the collection and use of your information as described in this Privacy Policy. You have the right to:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li className="text-gray-700 leading-relaxed">
                                    Access the personal information we hold about you
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Request correction of inaccurate or incomplete information
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Request deletion of your personal information (subject to legal and operational requirements)
                                </li>
                                <li className="text-gray-700 leading-relaxed">
                                    Opt-out of marketing communications at any time
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                If you wish to exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        {/* Updates to Policy */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Updates to Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                            </p>
                        </section>

                        {/* Compliance */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Compliance
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                NHC Service is committed to complying with Indian data protection practices and applicable laws. We follow industry best practices to ensure the privacy and security of your personal information.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section className="bg-gradient-to-br from-wellness-green/10 to-wellness-pink/10 p-6 rounded-2xl">
                            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                Contact Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please feel free to contact us:
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-semibold text-gray-800">Business Name</p>
                                    <p className="text-gray-700">NHC Service</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-wellness-green" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Email</p>
                                        <a href="mailto:support@nhcservice.in" className="text-wellness-green hover:underline">
                                            support@nhcservice.in
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-wellness-green" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Location</p>
                                        <p className="text-gray-700">Hyderabad, India</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Thank You */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-700 italic">
                                Thank you for trusting NHC Service with your health and wellness journey.
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
