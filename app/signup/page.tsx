'use client';
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter(); // For handling redirection

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      // Send the email and password to the API to create the user
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.user) {
        setMessage("Sign-up successful! Check your email to verify your account.");

        // Check if the profile is complete (this is just an example, you can modify the check)
      
      } else {
        setMessage("Error during sign-up. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Example check to see if the profile is complete
 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
