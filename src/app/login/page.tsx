import LoginForm from '@/forms/login-form';

const LoginPage = () => {
	return (
		<div className="tp-main-wrapper h-screen">
			<div className="container mx-auto my-auto h-full flex items-center justify-center">
				<div className="pt-[120px] pb-[120px]">
					<div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px] shadow-lg bg-white overflow-hidden rounded-md">
						<div className="text-center">
							<h2 className="mb-1">Login</h2>
						</div>
						<div>
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;