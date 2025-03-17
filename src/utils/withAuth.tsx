"use client"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any, allowedRoles: string[]) {
  return function AuthComponent(props: any) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user || !allowedRoles.includes(user.role ?? "")) {
        router.push("/unauthorized"); // Redirect to an unauthorized page
      }
    }, [user, router]);

    return user && allowedRoles.includes(user.role ?? "") ? <Component {...props} /> : null;
  };
}
