import { useState } from "react";
import MobileSideBar from "./MobileSideBar";

const DashhboardNavbarContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  return (
    <div>
      {/*moble menu toggle*/}
      <MobileSideBar />
      {/*search component*/}
      {/*right side actions*/}
      {/*notifications*/}
      {/*user dropdown*/}
    </div>
  );
};

export default DashhboardNavbarContent;
