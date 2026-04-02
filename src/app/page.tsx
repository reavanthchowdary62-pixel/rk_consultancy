import { cookies } from "next/headers";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  const isAuthenticated = cookies().has("rk-auth-session");
  return <HomeClient isAuthenticated={isAuthenticated} />;
}
