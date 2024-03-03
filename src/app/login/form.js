"use client";

import { useState } from "react";
import { useFetchUsersQuery } from "../store";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const { data, error, isFetching } = useFetchUsersQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addedMessage, setAddedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Incorrect email address or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-auto">
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="input-label"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="input-label"
          className="py-2 px-4 border border-gray-200 block w-full rounded-lg text-sm focus:border-blue-500 focus:shadow-sm focus:outline-none"
          placeholder="you@site.com"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="py-2 px-4 border border-gray-200 block w-full rounded-lg text-sm focus:border-blue-500 focus:shadow-sm focus:outline-none"
          required
          minLength="10"
        />
      </div>
      {errorMessage && (
        <div className="bg-danger/10 border border-danger/30 text-sm rounded-lg px-4 py-2 mb-5 last:mb-0 text-danger">
          {errorMessage}
        </div>
      )}
      {addedMessage && (
        <div className="bg-success/10 border border-success/30 text-sm rounded-lg px-4 py-2 mb-5 last:mb-0 text-danger">
          {addedMessage}
        </div>
      )}
      <div className="w-full">
        <button className="w-full py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-normal focus:ring-0 focus:outline-none focus:ring-offset-0 transition-all text-sm mt-2 bg-primary text-white hover:bg-primary/90 focus:ring-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
