"use client";

const IITList: React.FC = () => {
  const iits = [
    "IIT Bombay",
    "IIT Delhi",
    "IIT Kanpur",
    "IIT Kharagpur",
    "IIT Madras",
    "IIT Roorkee",
    "IIT Guwahati",
    "IIT Hyderabad",
    "IIT Bhubaneswar",
    "IIT Gandhinagar",
    "IIT Ropar",
    "IIT Patna",
    "IIT Varanasi (BHU)",
    "IIT Indore",
    "IIT Mandi",
    "IIT Jodhpur",
    "IIT Dhanbad (ISM)",
    "IIT Palakkad",
    "IIT Tirupati",
    "IIT Bhilai",
    "IIT Goa",
    "IIT Jammu",
    "IIT Dharwad",
  ];

  return (
  
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">List of IITs</h1>
        <table className="min-w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-black">S. No.</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-black">IIT Name</th>
            </tr>
          </thead>
          <tbody>
            {iits.map((iit, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-black">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-black">{iit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IITList;
