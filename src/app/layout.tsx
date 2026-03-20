import GlobalProvider, { geistMono, geistSans } from "@/global/InitialData";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Suspense } from "react";

export const metadata = {
  title: "mylogr - RKS ",
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
        <Suspense fallback={<h1 color="red">Loading...</h1>}>
          <GlobalProvider>{children}</GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
}
