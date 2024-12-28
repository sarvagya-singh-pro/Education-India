'use client';

import { useState } from "react";

const ApplicationForm = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    fatherName: "",
    motherName: "",
    dob: "",
    course: "",
    session: "",
    university: "",
    mobile: "",
    email: "",
    category: "",
    address: "",
    bloodGroup: "",
    idMark: "",
    maritalStatus: "",
    aadharNo: "",
    passingYear: "",
    modeOpted: "",
    documents: {
      tenthMarksheet: "",
      twelfthMarksheet: "",
      graduationMarksheet: "",
      lastDegreeCertificate: "",
      technicalQualifications: "",
      aadharPhotoFront: "",
      aadharPhotoBack: "",
      passportPhoto: "",
      signature: "",
      thumbImpression: "",
    },
  });

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          [field]: file,
        },
      }));
    }
  };

  // Step Navigation Handlers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // You can send this data to an API
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <h2 className="text-2xl font-semibold text-center">Degree Application Form</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="mb-4">
              <label htmlFor="fatherName" className="block text-lg">Father's Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="motherName" className="block text-lg">Mother's Name</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-lg">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {/* Step 2: Academic Details */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
            <div className="mb-4">
              <label htmlFor="course" className="block text-lg">Course</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="session" className="block text-lg">Session</label>
              <input
                type="text"
                id="session"
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="university" className="block text-lg">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {/* Step 3: Contact and Identification */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Identification Information</h3>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-lg">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-lg">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="GEN">GEN</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bloodGroup" className="block text-lg">Blood Group</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="idMark" className="block text-lg">Identification Mark</label>
              <input
                type="text"
                id="idMark"
                name="idMark"
                value={formData.idMark}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maritalStatus" className="block text-lg">Marital Status</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="aadharNo" className="block text-lg">Aadhar No</label>
              <input
                type="text"
                id="aadharNo"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="passingYear" className="block text-lg">Passing Year of Last Education</label>
              <input
                type="text"
                id="passingYear"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="modeOpted" className="block text-lg">Mode Opted</label>
              <select
                id="modeOpted"
                name="modeOpted"
                value={formData.modeOpted}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Regular">Regular</option>
                <option value="Online">Online</option>
                <option value="Distance">Distance</option>
                <option value="Regular-NA">Regular-NA</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Required Documents */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
            <div className="mb-4">
              <label className="block text-lg">10th (Matriculation): Marksheet/Admit Card/Provisional Certificate</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "tenthMarksheet")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">12th (Intermediate): Marksheet/Provisional</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "twelfthMarksheet")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Graduation: Marksheets of all the semesters</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "graduationMarksheet")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Marksheet/Passing Certificate of last Educational Degree (optional)</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "lastDegreeCertificate")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Any other Technical Qualifications</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "technicalQualifications")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Photo of Aadhar Card (Front)</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "aadharPhotoFront")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Photo of Aadhar Card (Back)</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "aadharPhotoBack")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Formal Passport-Sized Photograph</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "passportPhoto")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg">Scanned Signature and Thumb Impression</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "signature")}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
