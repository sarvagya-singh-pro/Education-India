"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Colleges = (id) => {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [degreeType, setDegreeType] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [examScore, setExamScore] = useState("");
  const [examType, setExamType] = useState("JEE Mains");
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      const res = await fetch("/api/college");
      const data = await res.json();
      setColleges(
        data.college.map((college) => ({
          ...college,
          applicationStatus:
            Math.random() < 2 ? "Apply Now" : "Application Closed",
        }))
      );
      setFilteredColleges(
        data.college.map((college) => ({
          ...college,
          applicationStatus:
            Math.random() < 2 ? "Apply Now" : "Application Closed",
        }))
      );
    };

    fetchColleges();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    filterAndSort(value, filterMode, degreeType, sortOrder);
  };

  const handleFilterMode = (value) => {
    setFilterMode(value);
    filterAndSort(search, value, degreeType, sortOrder);
  };

  const handleDegreeType = (value) => {
    setDegreeType(value);
    filterAndSort(search, filterMode, value, sortOrder);
  };

  const handleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    filterAndSort(search, filterMode, degreeType, newOrder);
  };

  const filterAndSort = (searchTerm, mode, degree, order) => {
    const filtered = colleges
      .filter((college) => {
        const matchesSearch = college.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesMode =
          mode === "All" || college.degreeModes.includes(mode);
        const matchesDegree =
          degree === "All" || college.courses.includes(degree);

        return matchesSearch && matchesMode && matchesDegree;
      })
      .sort((a, b) => {
        if (order === "asc") return a.nirfRanking - b.nirfRanking;
        return b.nirfRanking - a.nirfRanking;
      });

    setFilteredColleges(filtered);
  };

  const handleApplyNow = (college) => {
    setSelectedCollege(college);
    setShowModal(true);
  };

  const handleSubmitModal = async() => {
    alert(
      `Application submitted for ${selectedCollege.name}\nExam Type: ${examType}\nExam Score: ${examScore}\nAdditional Details: ${additionalDetails}`
    );
    setShowModal(false);
    setExamScore("");
    setExamType("JEE Mains");
    setAdditionalDetails("");
    const res=await axios.post('/api/college/apply',{
        id:id,
        collegeName:selectedCollege.name,
        examScore:examScore,
        examType:examType,
        additionalDetails:additionalDetails
    })
    console.log(res)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
          College Rankings
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <select
            value={filterMode}
            onChange={(e) => handleFilterMode(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="All">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select
            value={degreeType}
            onChange={(e) => handleDegreeType(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="All">All Degree Types</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="Design">Design</option>
            <option value="PhD">PhD</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
            <option value="Animation">Animation</option>
          </select>
          <button
            onClick={handleSortOrder}
            className="w-full md:w-1/4 bg-blue-500 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Sort by NIRF Ranking (
            {sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white border-collapse">
            <thead>
              <tr className="bg-blue-500 text-black">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  NIRF Ranking
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Degree Modes
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <tr
                    key={college.id}
                    className="border-t hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3 text-black">{college.name}</td>
                    <td className="px-6 py-3 text-black">
                      {college.nirfRanking || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-black">
                      {college.location || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-black">
                      {college.degreeModes.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-black">
                      {college.courses.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-black">
                      {college.applicationStatus === "Apply Now" ? (
                        <button
                          className="bg-green-500 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                          onClick={() => handleApplyNow(college)}
                        >
                          Apply Now
                        </button>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Application Closed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-black py-6"
                  >
                    No colleges match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">
              Application for {selectedCollege.name}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">
                Select Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full border text-black border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="JEE Mains">JEE Mains</option>
                <option value="JEE Advance">JEE Advance</option>
                <option value="COMED">COMED</option>
                <option value="SAT">SAT</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">Exam Score</label>
              <input
                type="number"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                className="w-full text-black border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">
                Additional Details
              </label>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full text-black border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmitModal}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Colleges;
