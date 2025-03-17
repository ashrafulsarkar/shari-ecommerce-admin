import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
          Access Denied
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You do not have permission to view this page.
        </p>

        <div className="mt-6">
        <img
  src="https://illustrations.popsy.co/white/resistance-band.svg"
  alt="Unauthorized Access"
  className="w-60 mx-auto"
/>
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
