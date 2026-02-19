
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Package, Truck, XCircle } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, any> = {
        Pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
        Confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
        Processing: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Package },
        Shipped: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: Truck },
        Delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
        Cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    };

    const variant = variants[status] || variants.Pending;
    const Icon = variant.icon;

    return (
        <Badge variant="outline" className={`${variant.color} border px-3 py-1 text-xs font-semibold rounded-full shadow-sm`}>
            <Icon className="w-3.5 h-3.5 mr-1.5" />
            {status}
        </Badge>
    );
}
