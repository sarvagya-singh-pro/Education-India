"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          method: "GET",
        });

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        {status === "loading" && <p className="text-gray-600">Verifying your email...</p>}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600">Email Verified!</h1>
            <p className="text-gray-600 mt-2">Thank you for verifying your email address.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
            <p className="text-gray-600 mt-2">We couldn't verify your email. Please try again.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
