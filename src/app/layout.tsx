import InitialProvider, { geistMono, geistSans } from "@/metadata/InitialData";
import "@/styles/globals.css";

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
        <InitialProvider>{children}</InitialProvider>
      </body>
    </html>
  );
}
