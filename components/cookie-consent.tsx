"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = Cookies.get("cookie_consent");
        if (!consent) {
            // Small delay to make the entrance feel more natural
            const timer = setTimeout(() => setShow(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        Cookies.set("cookie_consent", "true", { expires: 365, path: "/" });
        setShow(false);
    };

    const decline = () => {
        Cookies.set("cookie_consent", "false", { expires: 365, path: "/" });
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] bg-white rounded-2xl shadow-[0px_10px_40px_0px_rgba(0,0,0,0.15)] p-6 z-[100] border border-neutral-100 animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-[#333333]">We use cookies 🍪</h3>
                <button
                    onClick={decline}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            <p className="text-sm text-[#7D7D7D] mb-6 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="flex gap-3">
                <Button
                    onClick={decline}
                    variant="outline"
                    className="flex-1 h-11 rounded-xl border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                    Decline
                </Button>
                <Button
                    onClick={accept}
                    className="flex-1 h-11 bg-[#BD3E2B] hover:bg-[#a33625] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#BD3E2B]/20"
                >
                    Accept All
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;
