import GlobalProvider, { geistMono, geistSans } from "@/global/InitialData";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Suspense } from "react";

export const metadata = {
  title: "MySpace - RKS ",
  description: "Personal portfolio and blog",
  icons: {
    icon: "/r-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalProvider>{children}</GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
}
