"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const CollegeDashboard = () => {
  const [info, SetInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  useEffect(() => {
    async function fetchCollegeInfo() {
      try {
        const Cookie = Cookies.get("collegeToken");
        console.log(Cookie);
        if (Cookie) {
          const decodedToken = jwt.decode(Cookie);
          const res = await axios.post("/api/college", {
            id: decodedToken,
          });
          SetInfo(res.data.college);
          console.log(res.data.college.applications);
        }
      } catch (error) {
        console.error("Error fetching college info:", error);
      }
    }
    fetchCollegeInfo();
  }, []);

  const handleApprove = async (collegeID, userID) => {
    try {
      const res = await axios.post("/api/college/enroll", {
        collegeID,
        id: userID,
      });
      console.log(res);
      setModalMessage("Student Accepted"); // Set the modal message
      setModalVisible(true); // Show the modal
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-black mb-4">{modalMessage}</h2>
            <button
              onClick={() => setModalVisible(false)} // Hide the modal
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">College Dashboard</h1>
          {info ? <h1>{info.name}</h1> : <></>}
          <nav>
            <a
              href="#"
              className="text-sm px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Applications */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h11m4 0h1m-1 0V9m-1 1h-1m0 0H9m4-4l3 3m-3 3l3-3"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black">85</h2>
              <p className="text-gray-700">Applications</p>
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16v1a3 3 0 006 0v-1m4 4H5m7-10a4 4 0 110-8 4 4 0 010 8zm6 8a4 4 0 00-8 0h8z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-black">350</h2>
              <p className="text-gray-700">Enrolled Students</p>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Exam</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Add Info</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {info?.applications?.length > 0 ? (
                  info.applications.map((el, index) => (
                    <tr key={index} className="border-t hover:bg-gray-100">
                      <td className="px-6 py-3 text-black">
                        {el.user?.name || "Sarvagya"}
                      </td>
                      <td className="px-6 py-3 text-black">{el.examScore}</td>
                      <td className="px-6 py-3 text-black">{el.examType}</td>
                      <td className="px-6 py-3 text-black">B.Tech CSE</td>
                      <td className="px-6 py-3 text-black">{el.Aditional}</td>
                      <td className="px-6 py-3 text-black">{el.status}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleApprove(info.id, el.user.id)}
                          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg ml-2 hover:bg-red-600">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <h1 className="text-center text-gray-500">
                        No Applications
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeDashboard;
