import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MenuDock } from "@/components/menu-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainLayout(
    { children }: { children: ReactNode }
) {
    const isMobile = useIsMobile();

    return (
        <>
            <div className={isMobile ? "px-1 pb-20" : "px-1 md:px-2 w-full md:max-w-7xl mx-auto"}>
                {!isMobile && <Navbar />}
                {children}
                {!isMobile && <Footer />}
                {isMobile && <MenuDock />}
            </div>
        </>
    )
}
