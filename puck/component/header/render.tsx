"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { useState } from "react";
import { HeaderProps } from "./config";
import { usePathname } from "next/navigation";
import ImageRender from "@/puck/helperComponents/image";
import Link from "@/puck/helperComponents/link";

const HeaderRender = ({ logo, menuItems, callToActions }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <ImageRender image={{ ...logo, priority: true }} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              {...item}
              className={pathname === item.href ? "text-primary" : ""}
            />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {callToActions.map((cta, index) => (
          <NavbarItem key={index}>
            <Button color={cta.type} variant="flat">
              <Link {...cta} />
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link {...item} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default HeaderRender;
