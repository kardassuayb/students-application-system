"use-client";
import Link from "next/link";
import RegisterForm from "./form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#bacddf]">
      <div className="max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm m-4 md:m-0">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Create an Account
          </h1>
          <RegisterForm />
          <p className="text-center text-sm text-gray-700 mt-4">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
