"use-client";
import Link from "next/link";
import RegisterForm from "./form";

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="shadow-2xl bg-white rounded-xl space-y-6 px-6 py-6">
        <h1 className="font-semibold text-2xl text-gray-700">
          Create an Account
        </h1>
        <RegisterForm />
        <p className="text-center text-sm text-gray-700">
          Have an account?{" "}
          <Link
            href="/login"
            className="text-primary decoration-2 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
