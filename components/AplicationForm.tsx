'use client';

import { useState } from "react";
import axios from "axios"; // Assuming you use Axios for making GET requests

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
    verificationCode: "", // Field for entering the verification code
    isVerified: false, // Whether the phone number is verified
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [smsSent, setSmsSent] = useState(false); // Track if SMS was sent

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

  // Validation function
  const validateStep = (step: number) => {
    let currentErrors: { [key: string]: string } = {};
    
    switch (step) {
      case 1:
        if (!formData.fatherName) currentErrors.fatherName = "Father's name is required";
        if (!formData.motherName) currentErrors.motherName = "Mother's name is required";
        if (!formData.dob) currentErrors.dob = "Date of birth is required";
        break;
      case 2:
        if (!formData.course) currentErrors.course = "Course is required";
        if (!formData.session) {
          currentErrors.session = "Session is required";
        } else if (isNaN(Number(formData.session))) {
          currentErrors.session = "Session must be a number";
        }
        if (!formData.university) currentErrors.university = "University is required";
        break;
      case 3:
        if (!formData.mobile) currentErrors.mobile = "Mobile is required";
        else if (!/^\d{10}$/.test(formData.mobile)) {
          currentErrors.mobile = "Mobile must be a 10-digit number";
        }
        if (!formData.category) currentErrors.category = "Category is required";
        if (!formData.address) currentErrors.address = "Address is required";
        if (!formData.bloodGroup) currentErrors.bloodGroup = "Blood group is required";
        if (!formData.idMark) currentErrors.idMark = "Identification mark is required";
        if (!formData.maritalStatus) currentErrors.maritalStatus = "Marital status is required";
        if (!formData.aadharNo) currentErrors.aadharNo = "Aadhar number is required";
        if (!formData.passingYear) currentErrors.passingYear = "Passing year is required";
        if (!formData.modeOpted) currentErrors.modeOpted = "Mode opted is required";
        break;
      case 4:
        Object.keys(formData.documents).forEach((key) => {
          if (!formData.documents[key]) currentErrors[key] = `${key} is required`;
        });
        break;
      default:
        break;
    }
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0; // returns true if no errors
  };

  // Send SMS Verification Code
  const sendVerificationSms = async () => {
    try {
      const response = await axios.get(`/api/send-sms`, {
        params: { phoneNumber: formData.mobile },
      });

      if (response.data.success) {
        setSmsSent(true);
        alert('Verification code sent. Please check your phone.');
      } else {
        alert('Failed to send verification code.');
      }
    } catch (error) {
      alert('Failed to send verification code.');
    }
  };

  // Verify the entered code
  const verifyCode = async () => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        phoneNumber: formData.mobile,
        code: formData.verificationCode,
      });

      if (response.data.success) {
        setFormData((prevData) => ({
          ...prevData,
          isVerified: true,
        }));
        alert('Phone number verified successfully!');
      } else {
        alert('Invalid verification code.');
      }
    } catch (error) {
      alert('Verification failed.');
    }
  };

  // Step Navigation Handlers
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log(formData); // You can send this data to an API
    }
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
              {errors.fatherName && <span className="text-red-600">{errors.fatherName}</span>}
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
              {errors.motherName && <span className="text-red-600">{errors.motherName}</span>}
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
              {errors.dob && <span className="text-red-600">{errors.dob}</span>}
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
              {errors.course && <span className="text-red-600">{errors.course}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="session" className="block text-lg">Session</label>
              <input
                type="number"
                id="session"
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.session && <span className="text-red-600">{errors.session}</span>}
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
              {errors.university && <span className="text-red-600">{errors.university}</span>}
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-lg">Mobile Number</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.mobile && <span className="text-red-600">{errors.mobile}</span>}
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={sendVerificationSms}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={smsSent}
              >
                Send Verification Code
              </button>
              {smsSent && (
                <div>
                  <input
                    type="text"
                    name="verificationCode"
                    placeholder="Enter Verification Code"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                  <button
                    type="button"
                    onClick={verifyCode}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                  >
                    Verify Code
                  </button>
                </div>
              )}
              {errors.mobile && <span className="text-red-600">{errors.mobile}</span>}
            </div>
          </div>
        )}

        {/* Step 4: Document Upload */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
            {/* Document Upload Fields */}
            {Object.keys(formData.documents).map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-lg">{key}</label>
                <input
                  type="file"
                  name={key}
                  onChange={(e) => handleFileChange(e, key)}
                  className="p-2 border border-gray-300 rounded"
                />
                {errors[key] && <span className="text-red-600">{errors[key]}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <button type="button" onClick={prevStep} disabled={step === 1} className="bg-gray-300 px-4 py-2 rounded">
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {step === 4 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
