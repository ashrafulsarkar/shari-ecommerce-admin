"use client"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useLoginAdminMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";
import { toast } from 'sonner';
import Link from "next/link";

// Schema validation
const schema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
	const [loginAdmin, { isLoading }] = useLoginAdminMutation();
	const router = useRouter();

	// React hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(schema),
	});

	// Form submission handler
	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			const res = await loginAdmin({
				email: data.email,
				password: data.password
			});

			// TypeScript check to see if response has data property
			if ('data' in res && res.data?.role) {
				toast.success("Login successful!");
				reset();
				router.push('/dashboard');
			} else if ('error' in res) {
				if ('data' in res.error) {
					const errorData = res.error.data as { message?: string };
					if (typeof errorData.message === "string") {
						toast.error(errorData.message);
					} else {
						toast.error("Login failed. Please try again.");
					}
				} else {
					toast.error("Login failed. Please try again.");
				}
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
			console.error("Login error:", error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-5">
					<p className="mb-0 text-base text-black">
						Email <span className="text-red">*</span>
					</p>
					<input
						{...register("email")}
						name="email"
						id="email"
						className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
						type="email"
						placeholder="Enter Your Email"
					/>
					<ErrorMsg msg={errors.email?.message as string} />
				</div>
				<div className="mb-5">
					<p className="mb-0 text-base text-black">
						Password <span className="text-red">*</span>
					</p>
					<input
						{...register("password")}
						id="password"
						className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
						type="password"
						placeholder="Password"
					/>
					<ErrorMsg msg={errors.password?.message as string} />
				</div>
				<div className="flex items-center justify-between">
					<div className="mb-4">
						<Link href="/forget-password"
							className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
						>
							Forgot Password?
						</Link>
					</div>
				</div>
				<button
					type="submit"
					className="tp-btn h-[49px] w-full justify-center"
					disabled={isLoading}
				>
					{isLoading ? 'Signing In...' : 'Sign In'}
				</button>
			</form>
		</>
	);
};

export default LoginForm;