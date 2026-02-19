
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: "blue" | "purple" | "green" | "orange";
    description?: string;
}

export function StatsCard({ title, value, icon: Icon, color, description }: StatsCardProps) {
    const colorStyles = {
        blue: { bg: "bg-blue-500", text: "text-blue-500", light: "bg-blue-50" },
        purple: { bg: "bg-purple-500", text: "text-purple-500", light: "bg-purple-50" },
        green: { bg: "bg-green-500", text: "text-green-500", light: "bg-green-50" },
        orange: { bg: "bg-orange-500", text: "text-orange-500", light: "bg-orange-50" },
    };

    const style = colorStyles[color];

    return (
        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden group">
            <div className={`h-1 w-full ${style.bg}`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</CardTitle>
                <div className={`p-2 rounded-lg ${style.light} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-4 w-4 ${style.text}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                {description && (
                    <p className="text-xs text-gray-400 mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}
