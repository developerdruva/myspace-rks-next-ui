import RouteProtection from "@/common/auth/RouteProtection";

export default function MyspaceLayout({ children }) {
  return <RouteProtection>{children}</RouteProtection>;
}
