"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ApplicationForm from "../../components/AplicationForm";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// Function to check the authToken cookie
const checkAuthToken = () => {
  return document.cookie.includes("authToken");
};

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false); // To track profile completion
  const [userEmail, setUserEmail] = useState(null); // Store user email
  const router = useRouter();

  // Check auth token and fetch user data
  useEffect(() => {
   async function a(){
    // Check if authToken exists in the cookies and redirect if not authenticated
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);

      // Decode the JWT token to extract the user email
      const decodedToken =await jwt.decode(authToken,{complete:true}).payload
      console.log(decodedToken)
      setUserEmail(decodedToken.email); // Assuming email is in the payload

      // Optionally, you can fetch the user data from your API if needed
     
    }
}a()
  }, [router]);

  const handleLogout = async () => {
    // Clear the authToken cookie and redirect to the login page
    await fetch('/api/auth/logout');
    Cookies.remove("authToken"); // Remove the authToken cookie
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64`}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <nav className="space-y-2 p-4">
          {/* General Section */}
          <div>
            <button
              className={`block w-full p-3 hover:bg-gray-700 flex justify-between items-center ${
                !profileComplete ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => setGeneralOpen(!generalOpen)}
              title={!profileComplete ? "Complete your profile to access this" : ""}
            >
              General
              {generalOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {generalOpen && (
              <div className="pl-4 space-y-2">
                <button className="block p-3 hover:bg-gray-700 w-full">
                  Application Form
                </button>
              </div>
            )}
          </div>

          {/* Docs Section */}
          <div>
            <button
              className={`block w-full p-3 hover:bg-gray-700 flex justify-between items-center ${
                !profileComplete ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => setDocsOpen(!docsOpen)}
              title={!profileComplete ? "Complete your profile to access this" : ""}
            >
              Docs
              {docsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {docsOpen && (
              <div className="pl-4 space-y-2">
                <button className="block p-3 hover:bg-gray-700 w-full">ID</button>
                <button className="block p-3 hover:bg-gray-700 w-full">Mark Sheets</button>
                <button className="block p-3 hover:bg-gray-700 w-full">Report Cards</button>
              </div>
            )}
          </div>

          <button
            className={`block p-3 hover:bg-gray-700 w-full ${
              !profileComplete ? "opacity-50 pointer-events-none" : ""
            }`}
            title={!profileComplete ? "Complete your profile to access this" : ""}
          >
            LVM
          </button>
          <button
            className={`block p-3 hover:bg-gray-700 w-full ${
              !profileComplete ? "opacity-50 pointer-events-none" : ""
            }`}
            title={!profileComplete ? "Complete your profile to access this" : ""}
          >
            Assessments
          </button>
          <button
            className={`block p-3 hover:bg-gray-700 w-full ${
              !profileComplete ? "opacity-50 pointer-events-none" : ""
            }`}
            title={!profileComplete ? "Complete your profile to access this" : ""}
          >
            Notifications
          </button>
          <button
            className={`block p-3 hover:bg-gray-700 w-full ${
              !profileComplete ? "opacity-50 pointer-events-none" : ""
            }`}
            title={!profileComplete ? "Complete your profile to access this" : ""}
          >
            Support
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
          <div className="md:hidden">
            <button
              className="text-white"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <FaBars size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-xl">Dashboard</span>
            <div className="relative">
              {/* Display user email in the navbar */}
              {userEmail && (
                <span className="text-white">{userEmail}</span>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
            >
              <FaSignOutAlt size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to your Dashboard</h1>

          <ApplicationForm />
          {/* Add your dashboard content here */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            {/* Display recent activity or other content */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
