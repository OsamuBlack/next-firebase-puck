"use client";

import { NextUIProvider } from "@nextui-org/react";
import AppCheckProvider from "./appCheckProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AppCheckProvider>{children}</AppCheckProvider>
    </NextUIProvider>
  );
}
