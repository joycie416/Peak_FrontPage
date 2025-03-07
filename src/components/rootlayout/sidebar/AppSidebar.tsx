import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import CloseSidebarButton from "./CloseSidebarButton";
import { LINKS } from "@/constants/header";
import SidebarLinkItem from "./SidebarLinkItem";

export function AppSidebar() {
  return (
    <Sidebar side="right" className="md:hidden">
      <SidebarContent className="p-5">
        <SidebarHeader className="flex flex-row justify-end">
          <CloseSidebarButton />
        </SidebarHeader>
        <SidebarMenu className="gap-4">
          {Object.keys(LINKS).map((to) => (
            <SidebarLinkItem
              to={to as keyof typeof LINKS}
              key={`sidebar_item_${to}`}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
