"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Expose so route-change effect can jump to top instantly.
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            delete (window as unknown as { __lenis?: Lenis }).__lenis;
        };
    }, []);

    // Reset scroll to top on every route change (Next App Router does not
    // always reset when navigating between client-rendered pages, and Lenis
    // keeps its own internal scroll position).
    useEffect(() => {
        const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
