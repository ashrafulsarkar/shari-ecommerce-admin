"use client";
import { useEffect } from "react";
import Loading from "../common/loading";
import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthCom = ({ children }: { children: React.ReactNode }) => {
  const { authChecked, user } = useAuthCheck();  // Assume this hook provides authChecked (boolean) and user (authenticated user or null)
  const router = useRouter();

  // Redirect logic if user is not authenticated and auth check is complete
  useEffect(() => {
    if (authChecked && !user) {
      router.push("/login");  // Redirect to login page if no user is found after auth check
    }
  }, [authChecked, user, router]);

  // Loading state while authentication check is in progress
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading spinner="fade" loading={!authChecked} />
      </div>
    );
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default AuthCom;
