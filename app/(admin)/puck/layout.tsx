import { AdminProvider } from "@/lib/adminProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
