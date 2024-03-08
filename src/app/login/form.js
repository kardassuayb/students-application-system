"use client";

import { useState } from "react";
import { useFetchUsersQuery, useUpdateUserMutation } from "../store";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();

  const { data, error, isFetching } = useFetchUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addedMessage, setAddedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = data
      ? data.find((user) => user.email === email && user.password === password)
      : "";

    if (user != null) {
      try {
        const response = await updateUser({ id: user.id, isLoggedIn: true });
        setAddedMessage(
          <div className="flex justify-between items-center">
            <span className="text-success text-sm">Redirecting..</span>
            <div
              className="animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full w-4 h-4 text-success text-sm"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
        setTimeout(() => {
          const queryParams = new URLSearchParams(searchParams);
          queryParams.set("userId", user.id);
          window.location.href = `/dashboard?${queryParams.toString()}`;
        }, 2000);
      } catch (error) {
        setErrorMessage(error.message);
      }
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
