"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { Menu } from "@/svg";
import { RootState } from "@/redux/store";
import default_user from "@assets/img/users/user-10.jpg";
import { userLoggedOut } from "@/redux/auth/authSlice";

// prop type
type IProps = {
	setSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setSideMenu }: IProps) => {
	const { user } = useSelector((state: RootState) => state.auth);
	const [profileOpen, setProfileOpen] = useState(false);
	const [notificationOpen, setNotificationOpen] = useState(false);
	const pRef = useRef<HTMLDivElement>(null);
	const nRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const router = useRouter();

	// handle logout
	const handleLogOut = () => {
		dispatch(userLoggedOut());
		router.push("/login");
	};

	// Close menus when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (pRef.current && !pRef.current.contains(e.target as Node)) {
				setProfileOpen(false);
			}
			if (nRef.current && !nRef.current.contains(e.target as Node)) {
				setNotificationOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Toggle profile dropdown
	const handleProfileOpen = () => {
		setProfileOpen(!profileOpen);
		setNotificationOpen(false);
	};

	// Toggle notification area
	const handleNotificationOpen = () => {
		setNotificationOpen(!notificationOpen);
		setProfileOpen(false);
	};

	return (
		<header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8">
			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-6 lg:space-x-0">
					<button
						onClick={() => setSideMenu((prev) => !prev)}
						type="button"
						className="block lg:hidden text-2xl text-black"
						aria-label="Toggle sidebar menu"
					>
						<Menu />
					</button>
				</div>

				<div className="flex items-center justify-end space-x-6">
					<div
						ref={pRef}
						className="relative flex justify-end items-center"
					>
						<button
							onClick={handleProfileOpen}
							className="relative"
							type="button"
							aria-label="Open profile menu"
							aria-expanded={profileOpen}
							aria-haspopup="true"
						>
							<Image
								className="w-[40px] h-[40px] rounded-md"
								src={user?.image || default_user}
								alt={user?.name ? `${user.name}'s profile` : "User profile"}
								width={40}
								height={40}
								style={{ objectFit: "cover" }}
								priority
							/>
							<span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
						</button>

						{profileOpen && (
							<div className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5 mt-2 z-20">
								<div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
									<div>
										<Image
											className="w-[50px] h-[50px] rounded-md"
											src={user?.image || default_user}
											alt={user?.name ? `${user.name}'s profile` : "User profile"}
											width={50}
											height={50}
											style={{ objectFit: "cover" }}
											priority
										/>
									</div>
									<div>
										<h5 className="text-base mb-1 leading-none">
											{user?.name || "Guest User"}
										</h5>
										<p className="mb-0 text-tiny leading-none">
											{user?.email || "No email available"}
										</p>
									</div>
								</div>
								<ul>
									<li>
										<Link
											href="/dashboard"
											className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
										>
											Dashboard
										</Link>
									</li>
									<li>
										<Link
											href="/profile"
											className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
										>
											Account Settings
										</Link>
									</li>
									<li>
										<button
											onClick={handleLogOut}
											className="px-5 py-2 w-full text-left block hover:bg-gray rounded-md hover:text-theme text-base"
										>
											Logout
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;