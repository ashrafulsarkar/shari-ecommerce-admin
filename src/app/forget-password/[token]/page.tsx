"use client";
import React, { use } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAdminConfirmForgotPasswordMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";

// Schema
const schema = Yup.object().shape({
	password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

type ForgetPasswordPageProps = {
	params: Promise<{
		token: string;
	}>;
};

const ForgetPasswordPage = ({ params }: ForgetPasswordPageProps) => {
	const { token } = use(params);
	const router = useRouter();
	const [adminConfirmForgotPassword, { isLoading }] = useAdminConfirmForgotPasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: { password: string }) => {
		const res = await adminConfirmForgotPassword({
			password: data.password,
			token,
		});

		if ("error" in res) {
			if ("data" in res.error) {
				const errorData = res.error.data as { message?: string };
				if (typeof errorData.message === "string") {
					return notifyError(errorData.message);
				}
			}
		} else {
			if ("data" in res && "message" in res.data) {
				notifySuccess(res.data.message);
				reset();
				router.push("/login");
			}
		}
	};

	return (
		<div className="tp-main-wrapper h-screen">
			<div className="container mx-auto my-auto h-full flex items-center justify-center">
				<div className="pt-[120px] pb-[120px]">
					<div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md">
						<div className="col-span-12 lg:col-span-12 md:w-[500px] mx-auto my-auto pt-[50px] py-[60px] px-5 md:px-[60px]">
							<div className="text-center">
								<h4 className="text-[24px] mb-1">Confirm Password</h4>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-5">
									<label htmlFor="password" className="mb-0 text-base text-black block">
										Password <span className="text-red">*</span>
									</label>
									<input
										id="password"
										{...register("password")}
										className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
										type="password"
										placeholder="Password"
									/>
									<ErrorMsg msg={errors.password?.message as string} />
								</div>
								<div className="mb-5">
									<label htmlFor="confirmPassword" className="mb-0 text-base text-black block">
										Confirm Password <span className="text-red">*</span>
									</label>
									<input
										id="confirmPassword"
										{...register("confirmPassword")}
										className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
										type="password"
										placeholder="Confirm Password"
									/>
									<ErrorMsg msg={errors.confirmPassword?.message as string} />
								</div>
								<button
									type="submit"
									className="tp-btn h-[49px] w-full justify-center"
									disabled={isLoading}
								>
									{isLoading ? "Updating..." : "Update Password"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgetPasswordPage;