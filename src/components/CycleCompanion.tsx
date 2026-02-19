import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { calculateCycleMessage } from "@/lib/cycleCalculator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitToGoogleSheet } from "@/lib/googleSheets";
import { submitOrder } from "@/lib/orderService";
import { Info, Home, MapPin, Package, Calendar } from "lucide-react";

interface CycleResult {
  message: string;
  phase: string;
  price_total: number;
  weight: number;
  quantity: number;
  A: number;
  B: number;
  D: number;
  BB: number;
}

export const CycleCompanion = () => {
  const navigate = useNavigate();
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [averageCycle, setAverageCycle] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<CycleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const [checkoutStep, setCheckoutStep] = useState<'phone' | 'details' | 'address'>('phone');
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [age, setAge] = useState("");

  const [fullName, setFullName] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [showMapInfo, setShowMapInfo] = useState(false);

  // Function to check if customer exists
  const handlePhoneCheck = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Invalid Phone", {
        description: "Please enter a valid phone number",
      });
      return;
    }

    setCheckingPhone(true);
    try {
      const response = await fetch('/api/check-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();

      if (data.exists && data.data) {
        // Customer exists
        setFullName(data.data.name);
        if (data.data.age) setAge(data.data.age.toString());
        // Pre-fill address if available
        if (data.data.addresses && data.data.addresses.length > 0) {
          const lastAddr = data.data.addresses[data.data.addresses.length - 1];
          setHouse(lastAddr.house || "");
          setArea(lastAddr.area || "");
          setLandmark(lastAddr.landmark || "");
          setPincode(lastAddr.pincode || "");
          setMapLink(lastAddr.mapLink || "");
          setLabel((lastAddr.label as "Home" | "Work" | "Other") || "Home");
        }

        toast.success(`Welcome back, ${data.data.name}!`);
        setCheckoutStep('address');
      } else {
        // New Customer
        setFullName(name);
        setCheckoutStep('details');
      }
    } catch (error) {
      console.error("Error checking phone:", error);
      toast.error("Connection Error", { description: "Could not verify phone number. Proceeding as new." });
      setCheckoutStep('details');
    } finally {
      setCheckingPhone(false);
    }
  };

  const handleCheck = () => {
    if (!lastPeriodDate || !name || !averageCycle) {
      toast.error("Missing Information", {
        description: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const data = calculateCycleMessage({
        last_period_date: lastPeriodDate,
        today: today,
        average_cycle: parseInt(averageCycle),
        name: name,
      });

      setResult(data);

      setTimeout(() => {
        const planElement = document.getElementById('personalized-plan');
        if (planElement) {
          planElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      toast.success("Success! 🌸", {
        description: "Your personalized plan is ready",
      });
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to calculate cycle information. Please check your inputs.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    if (!result) {
      toast.error("No plan yet", {
        description: "Please check your phase first to generate a message.",
      });
      return;
    }

    const orderData = {
      fullName: name,
      periodsStarted: lastPeriodDate,
      cycleLength: parseInt(averageCycle),
      phase: result.phase,
      totalQuantity: result.quantity,
      totalWeight: result.weight,
      totalPrice: result.price_total,
      message: result.message
    };

    navigate("/checkout", { state: { orderData } });
  };

  const handleConfirmAddress = () => {
    if (!result) return;
    if (!fullName || !house || !phone || !area || !pincode) {
      toast.error("Missing address details", { description: "Please fill in all required address fields." });
      return;
    }

    const phoneNumber = "919347122416";
    const phaseType = getDisplayPhase(result.message);
    const orderSummary = `\n\nPhase: ${phaseType}\nTotal Quantity 🍪: ${result.quantity} laddus\nTotal Weight ⚖️: ${result.weight}g\nTotal Price 💰: ₹${result.price_total}`;

    const addressLines = [
      `Full Name: ${fullName}`,
      `Age: ${age}`,
      `Phone: ${phone}`,
      `House/Flat No.: ${house}`,
      area && `Area: ${area}`,
      landmark && `Landmark: ${landmark}`,
      pincode && `Pincode: ${pincode}`,
      mapLink && `Map Link: ${mapLink}`,
      `Address Label: ${label}`,
      `Payment method: ${paymentMethod}`,
    ].filter(Boolean).join("\n");

    const text = `${result.message}${orderSummary}\n\nDelivery Details:\n${addressLines}\n\nOrder Confirmed 📦`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    const formattedAddress = [house, area, landmark, pincode, mapLink ? `\n${mapLink}` : ""].filter(Boolean).join("+");

    submitToGoogleSheet({
      Timestamp: new Date().toISOString(),
      Full_name: fullName,
      Periods_Started: lastPeriodDate,
      Cycle_length: averageCycle,
      Phase: phaseType,
      Total_Quantity: result.quantity,
      Total_Weight: result.weight,
      Total_Price: result.price_total,
      Phone: phone,
      address: formattedAddress,
      Message: result.message
    });

    submitOrder({
      fullName,
      phone,
      age: parseInt(age) || 0,
      periodsStarted: lastPeriodDate,
      cycleLength: parseInt(averageCycle),
      phase: phaseType,
      totalQuantity: result.quantity,
      totalWeight: result.weight,
      totalPrice: result.price_total,
      address: {
        house,
        area,
        landmark: landmark || '',
        pincode,
        mapLink: mapLink || '',
        label: label || 'Home'
      },
      paymentMethod: paymentMethod || 'Cash on Delivery',
      message: result.message
    }).then((response) => {
      if (response.success) toast.success("Order Saved!");
      else console.error('Failed to save order:', response.error);
    });

    setAddressOpen(false);
  };

  const getDisplayPhase = (message: string) => {
    const isPhase2PreOrder = message.includes("Only") && message.includes("days left to complete Phase-1") && message.includes("Next Phase-2 laddus will start");
    const isPhase2Delivery = message.includes("Today is Day") && message.includes("Phase-2 laddus (Sunflower + Sesame)");
    return (isPhase2PreOrder || isPhase2Delivery) ? "Phase-2" : "Phase-1";
  };

  return (
    <section id="cycle-phase-checker" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            Cycle Phase Checker
          </h2>
          <p className="text-gray-600">Track your menstrual phase and get personalized laddu delivery plans</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Card - Form */}
          <Card className="shadow-xl border-0 bg-white/60 backdrop-blur-md">
            <CardHeader className="bg-pink-50/30 rounded-t-xl pb-4">
              <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
                Cycle Details <span>📅</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Name 💝</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="h-11 rounded-lg border-gray-200 bg-white/50 focus:border-pink-300 focus:ring-pink-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastPeriodDate" className="text-gray-700">Last Period Start Date</Label>
                <Input id="lastPeriodDate" type="date" value={lastPeriodDate} onChange={(e) => setLastPeriodDate(e.target.value)} max={new Date().toISOString().split("T")[0]} className="h-11 rounded-lg border-gray-200 bg-white/50 focus:border-pink-300 focus:ring-pink-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="averageCycle" className="text-gray-700">Average Cycle Length (days) 📊</Label>
                <Input id="averageCycle" type="number" value={averageCycle} onChange={(e) => setAverageCycle(e.target.value)} min="20" max="45" placeholder="e.g. 28" className="h-11 rounded-lg border-gray-200 bg-white/50 focus:border-pink-300 focus:ring-pink-100" />
              </div>
              <Button onClick={handleCheck} disabled={loading} className="w-full h-12 text-lg font-medium rounded-xl bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-200/50 transition-all mt-2">
                {loading ? "Calculating..." : "Only show My plan"}
              </Button>
            </CardContent>
          </Card>

          {/* Right Card - Results (NEW UI) */}
          <Card id="personalized-plan" className={`shadow-xl border-0 bg-white/60 backdrop-blur-md transition-all overflow-hidden ${result ? 'opacity-100' : 'opacity-90'}`}>
            {result ? (
              <div className="h-full flex flex-col">
                {/* Header Section */}
                <div className="bg-pink-300 p-6 text-white text-left">
                  <h3 className="text-2xl font-bold font-serif mb-1">Hi {name} ma'am! 🌸</h3>
                  <p className="opacity-90">Today is Day {result.A} of your {result.BB}-day cycle.</p>
                </div>

                <div className="p-6 flex-grow flex flex-col gap-6">
                  {/* Phase Indicator */}
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getDisplayPhase(result.message) === 'Phase-1' ? 'bg-pink-400' : 'bg-purple-400'}`}></div>
                    <h4 className="text-lg font-bold text-gray-800 font-serif">
                      Current: {getDisplayPhase(result.message) === 'Phase-1' ? 'Follicular Phase' : 'Luteal Phase'}
                    </h4>
                  </div>

                  {/* Description Text */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    You are currently in your <span className="font-semibold">{getDisplayPhase(result.message) === 'Phase-1' ? 'Follicular Phase (Phase-1)' : 'Luteal Phase (Phase-2)'}</span>.
                    This phase is supported by <span className="font-medium text-pink-600">{getDisplayPhase(result.message) === 'Phase-1' ? 'Flax & Pumpkin Seeds' : 'Sesame & Sunflower Seeds'}</span>.
                    Your personalized recommendation consists of {result.quantity} laddus to balance your hormones for the remainder of this phase.
                  </p>

                  {/* Cards Row */}
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    {/* Summary Card */}
                    <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-pink-500 mb-1">
                        <Package className="w-4 h-4" />
                        <span className="font-bold text-sm text-gray-800">Order Summary</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Phase Type:</span>
                        <span className="font-semibold text-gray-900">{getDisplayPhase(result.message)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Quantity:</span>
                        <span className="font-semibold text-gray-900">{result.quantity} Laddus</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Net Weight:</span>
                        <span className="font-semibold text-gray-900">{result.weight}g</span>
                      </div>
                    </div>

                    {/* Price Card */}
                    <div className="bg-pink-50/30 rounded-xl p-4 border border-pink-100 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Price</span>
                      <span className="text-3xl font-bold text-pink-400 my-1">₹{result.price_total}</span>
                      <span className="text-[10px] text-gray-400">Free Delivery (Limited Time)</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleBuy}
                    className="w-full bg-pink-300 hover:bg-pink-400 text-white font-semibold py-6 text-lg rounded-xl shadow-md transition-all mt-2"
                  >
                    Proceed to Order
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Personalized Plan 🌿</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Enter your cycle details on the left to generate your custom wellness plan.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
