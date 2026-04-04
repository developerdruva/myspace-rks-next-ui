import RouteProtection from "@/common/auth/RouteProtection";
import Navbar from "@/components/navbar/Navbar";

export default function MyspaceLayout({ children }) {
  return (
    <RouteProtection>
      <Navbar />
      {children}
    </RouteProtection>
  );
}
