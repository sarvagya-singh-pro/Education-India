"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
        onClick={() => signIn("Credentials", { email: "test@test.com", password: "password" })}
      >
        Sign in with Email
      </button>
    </div>
  );
}
