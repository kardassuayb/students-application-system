"use-client";
import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#bacddf]">
      <div className="max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm m-4 md:m-0">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Sign In
          </h1>
          <LoginForm />
          <p className="text-center text-sm text-gray-700 mt-4">
            or,{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Create an Account Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
