import PropTypes from "prop-types";
import { MenuDock } from "@/components/menu-mobile";

export default function MobileLayout({ children }) {
  return (
    <div className="mx-auto w-full px-1 md:max-w-7xl md:px-2">
      {children}
      <MenuDock />
    </div>
  );
}

MobileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
