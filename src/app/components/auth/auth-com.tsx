"use client";
import { useEffect } from "react";
import Loading from "../common/loading";
import useAuthCheck from "@/hooks/use-auth-check";
import { usePathname, useRouter } from "next/navigation";

const AuthCom = ({ children }: { children: React.ReactNode }) => {
	const { authChecked, user } = useAuthCheck();  // Assume this hook provides authChecked (boolean) and user (authenticated user or null)
	const pathname = usePathname();  // Get the current pathname
	const router = useRouter();

	// Redirect logic if user is not authenticated and auth check is complete
	useEffect(() => {
		if ((authChecked && user && pathname === "/login") || (authChecked && user && pathname === "/forget-password")) {
			router.push("/dashboard");
		} else if (pathname.startsWith("/forget-password")) {
			return;
		} else if (authChecked && !user) {
			router.push("/login");
		}
	}, [authChecked, user, router, pathname]);

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
