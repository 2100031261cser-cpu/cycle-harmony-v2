
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Mail, MapPin, User, ArrowRight, ArrowLeft, CheckCircle, Smartphone } from "lucide-react";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state?.orderData;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");

    const [address, setAddress] = useState({
        house: "",
        area: "",
        landmark: "",
        pincode: "",
        label: "Home"
    });
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "Razorpay">("COD");

    const [existingCustomer, setExistingCustomer] = useState(null);

    useEffect(() => {
        if (!orderData) {
            toast.error("No order found. Redirecting to home.");
            navigate("/");
            return;
        }

        // Load Razorpay Script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [orderData, navigate]);

    const handleStandardLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/check-customer-by-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (data.exists) {
                setExistingCustomer(data.data);
                setName(data.data.name);
                setPhone(data.data.phone);
                setAge(data.data.age);
                if (data.data.addresses?.length > 0) {
                    const lastAddr = data.data.addresses[data.data.addresses.length - 1];
                    setAddress({
                        house: lastAddr.house || "",
                        area: lastAddr.area || "",
                        landmark: lastAddr.landmark || "",
                        pincode: lastAddr.pincode || "",
                        label: lastAddr.label || "Home"
                    });
                }
                toast.success("Welcome back!");
                setStep(3);
            } else {
                toast.info("Welcome! Please provide your details to continue.");
                setStep(2);
            }
        } catch (err) {
            toast.error("Connection error");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        // Simulation of Google Auth
        setTimeout(async () => {
            const simulatedEmail = "user@gmail.com";
            setEmail(simulatedEmail);
            toast.success("Signed in with Google");

            try {
                const response = await fetch('/api/check-customer-by-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: simulatedEmail })
                });
                const data = await response.json();

                if (data.exists) {
                    setExistingCustomer(data.data);
                    setName(data.data.name);
                    setPhone(data.data.phone);
                    setAge(data.data.age);
                    if (data.data.addresses?.length > 0) {
                        const lastAddr = data.data.addresses[data.data.addresses.length - 1];
                        setAddress({
                            house: lastAddr.house || "",
                            area: lastAddr.area || "",
                            landmark: lastAddr.landmark || "",
                            pincode: lastAddr.pincode || "",
                            label: lastAddr.label || "Home"
                        });
                    }
                    setStep(3); // Skip to address verification
                } else {
                    setStep(2); // Go to personal details
                }
            } catch (err) {
                setStep(2);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const handleRazorpayPayment = async () => {
        if (!(window as any).Razorpay) {
            toast.error("Payment gateway is still loading. Please try again in a moment.");
            return;
        }

        const options = {
            key: "rzp_test_SGLAMiDgEHudw7", // Updated with user's test key
            amount: (orderData.totalPrice * 100).toString(),
            currency: "INR",
            name: "Cycle Harmony",
            description: `Order for ${orderData.phase}`,
            image: "https://www.google.com/favicon.ico",
            handler: async function (response: any) {
                console.log("Payment Success:", response);
                toast.success("Payment Received!");
                await submitFinalOrder("Online (Razorpay)");
            },
            prefill: {
                name: name,
                email: email,
                contact: phone
            },
            theme: {
                color: "#f472b6"
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        try {
            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                console.error("Razorpay Error:", response.error);
                toast.error("Payment Failed: " + response.error.description);
                setLoading(false);
            });
            rzp.open();
        } catch (err) {
            console.error("Razorpay Init Error:", err);
            toast.error("Could not initialize payment gateway.");
            setLoading(false);
        }
    };

    const submitFinalOrder = async (finalMethod: string) => {
        setLoading(true);
        try {
            const finalOrder = {
                ...orderData,
                email,
                fullName: name,
                phone,
                age,
                address,
                paymentMethod: finalMethod
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalOrder)
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Order Placed Successfully!");
                navigate("/profile");
            } else {
                toast.error(data.message || "Order Failed");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    const handleFinishOrder = async () => {
        if (!name || !phone || !address.house || !address.area || !address.pincode) {
            toast.error("Please fill all delivery details");
            return;
        }

        if (paymentMethod === "Razorpay") {
            setLoading(true);
            handleRazorpayPayment();
        } else {
            submitFinalOrder("Cash on Delivery");
        }
    };

    if (!orderData) return null;

    return (
        <div className="min-h-screen bg-pink-50/30">
            <Navbar />

            <div className="container mx-auto px-4 py-8 pt-24 max-w-2xl">
                {/* Step Indicator */}
                <div className="flex justify-between mb-8 px-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${step >= s ? "bg-pink-500 text-white border-pink-500 scale-110" : "bg-white text-gray-400 border-gray-200"
                                }`}
                        >
                            {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                        </div>
                    ))}
                </div>

                {/* Step 1: Login */}
                {step === 1 && (
                    <Card className="shadow-xl border-t-4 border-pink-400">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-pink-500" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Sign In to Continue</CardTitle>
                            <CardDescription>Login with your Google account to track your orders</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <form onSubmit={handleStandardLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white h-12"
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Sign In to Order"}
                                </Button>
                            </form>

                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span>OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            <Button
                                onClick={handleGoogleLogin}
                                className="w-full h-12 text-md bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-pink-200 gap-3 shadow-sm"
                                disabled={loading}
                                type="button"
                            >
                                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
                                {loading ? "Connecting..." : "Continue with Google (Gmail)"}
                            </Button>

                            <div className="space-y-2 text-center text-xs text-gray-500">
                                Data security is our priority. Your cycle data is encrypted.
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                    <Card className="shadow-xl border-t-4 border-pink-400">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-pink-500" />
                                Personal Details
                            </CardTitle>
                            <CardDescription>We need these to process your delivery</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Full Name</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Phone Number</Label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10 digit mobile" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Age</Label>
                                    <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="00" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="mr-2" /> Back</Button>
                            <Button onClick={() => setStep(3)} className="bg-pink-500 hover:bg-pink-600">Next <ArrowRight className="ml-2" /></Button>
                        </CardFooter>
                    </Card>
                )}

                {/* Step 3: Address & Payment */}
                {step === 3 && (
                    <Card className="shadow-xl border-t-4 border-pink-400">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-pink-500" />
                                Delivery Information
                            </CardTitle>
                            {existingCustomer && (
                                <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm mt-2 flex items-center gap-2">
                                    <span className="animate-pulse">✨</span> Welcome back! We found your details.
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="font-semibold text-gray-700 text-sm">Address Details</h4>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label className="text-xs text-gray-500 uppercase">House / Flat No.</Label>
                                        <Input value={address.house} onChange={e => setAddress({ ...address, house: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-xs text-gray-500 uppercase">Area / Street</Label>
                                        <Input value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label className="text-xs text-gray-500 uppercase">Pincode</Label>
                                            <Input value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-xs text-gray-500 uppercase">Type</Label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={address.label}
                                                onChange={e => setAddress({ ...address, label: e.target.value })}
                                            >
                                                <option>Home</option>
                                                <option>Work</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                                    <Smartphone className="w-4 h-4" /> Payment Method
                                </h4>
                                <div className="grid gap-3">
                                    <div
                                        onClick={() => setPaymentMethod("COD")}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "COD" ? "border-pink-500 bg-pink-50/50" : "border-gray-100 hover:border-pink-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-bold">₹</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Cash on Delivery</p>
                                                <p className="text-xs text-gray-500">Pay when you receive</p>
                                            </div>
                                        </div>
                                        {paymentMethod === "COD" && (
                                            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod("Razorpay")}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "Razorpay" ? "border-pink-500 bg-pink-50/50" : "border-gray-100 hover:border-pink-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                                <img src="https://razorpay.com/favicon.png" className="w-5 h-5" alt="R" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Online Payment</p>
                                                <p className="text-xs text-gray-500">UPI, Cards, Netbanking (via Razorpay)</p>
                                            </div>
                                        </div>
                                        {paymentMethod === "Razorpay" && (
                                            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 text-white rounded-xl shadow-inner">
                                <div className="flex justify-between text-sm opacity-80 mb-2">
                                    <span>Order Total:</span>
                                    <span>₹{orderData.totalPrice}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Payable Amount:</span>
                                    <span className="text-pink-400">₹{orderData.totalPrice}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button
                                onClick={handleFinishOrder}
                                className="w-full h-14 text-lg bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-200"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Finish Order and Deliver 🚚"}
                            </Button>
                            <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="mr-2" /> Previous Step</Button>
                        </CardFooter>
                    </Card>
                )}

                <p className="text-center text-xs text-gray-400 mt-8">
                    By continuing, you agree to our Terms & Privacy Policy.
                </p>
            </div>
        </div>
    );
}
