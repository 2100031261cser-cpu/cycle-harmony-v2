
import { useEffect, useRef, useState } from "react";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case "up":
                return "translate-y-10";
            case "down":
                return "-translate-y-10";
            case "left":
                return "translate-x-10";
            case "right":
                return "-translate-x-10";
            default:
                return "";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${getDirectionClasses()}`
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
