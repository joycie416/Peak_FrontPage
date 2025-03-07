"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { X } from "lucide-react";

const CloseSidebarButton = () => {
  const { setOpenMobile } = useSidebar();
  return (
    <button onClick={() => setOpenMobile(false)}>
      <X />
    </button>
  );
};

export default CloseSidebarButton;
