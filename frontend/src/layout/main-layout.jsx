import PropTypes from "prop-types";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MenuDock } from "@/components/menu-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainLayout({ children }) {
  const isMobile = useIsMobile();

  return (
    <>
      <div className={isMobile ? "px-1 pb-20" : "mx-auto w-full px-1 md:max-w-7xl md:px-2"}>
        {!isMobile && <Navbar />}
        {children}
        {!isMobile && <Footer />}
        {isMobile && <MenuDock />}
      </div>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
