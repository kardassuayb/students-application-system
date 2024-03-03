"use client";

import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setErrorMessage("Passwords do not match !");
      return;
    }
    const newUser = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    };
    console.log(newUser);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
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
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirmPassword"
          className="py-2 px-4 border border-gray-200 block w-full rounded-lg text-sm focus:border-blue-500 focus:shadow-sm focus:outline-none"
          required
          minLength="10"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          id="firstName"
          className="py-2 px-4 border border-gray-200 block w-full rounded-lg text-sm focus:border-blue-500 focus:shadow-sm focus:outline-none"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lastName"
          className="py-2 px-4 border border-gray-200 block w-full rounded-lg text-sm focus:border-blue-500 focus:shadow-sm focus:outline-none"
          required
        />
      </div>
      {errorMessage && (
        <div className="bg-danger/10 border border-danger/30 text-sm rounded-lg px-4 py-2 mb-5 last:mb-0 text-danger">
          {errorMessage}
        </div>
      )}
      <div className="w-full">
        <button className="w-full py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-normal focus:ring-0 focus:outline-none focus:ring-offset-0 transition-all text-sm mt-2 bg-primary text-white hover:bg-primary/90 focus:ring-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
