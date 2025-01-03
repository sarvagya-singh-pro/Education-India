'use client'

import { useState } from "react"
import axios from "axios"
import {useRouter} from 'next/navigation'
interface ApplicationFormProps {
  id: string
}
const ApplicationForm = ({ id }: ApplicationFormProps) => {

const route=useRouter()
  const [step, setStep] = useState(1)
  const [showButton, setShowButton] = useState<boolean>(false)
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
      thumbImpression: ""
    },
    verificationCode: "",
    isVerified: false
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [smsSent, setSmsSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          [field]: file
        }
      }))
    }
  }

  const validateStep = (step: number) => {
    let currentErrors: { [key: string]: string } = {}
    
    switch (step) {
      case 1:
        if (!formData.fatherName) currentErrors.fatherName = "Father's name is required"
        if (!formData.motherName) currentErrors.motherName = "Mother's name is required"
        if (!formData.dob) currentErrors.dob = "Date of birth is required"
        break
      case 2:
        if (!formData.course) currentErrors.course = "Course is required"
        if (!formData.session) {
          currentErrors.session = "Session is required"
        } else if (isNaN(Number(formData.session))) {
          currentErrors.session = "Session must be a number"
        }
        if (!formData.university) currentErrors.university = "University is required"
        if (!formData.passingYear) currentErrors.passingYear = "Passing year is required"
        if (!formData.modeOpted) currentErrors.modeOpted = "Mode opted is required"
        break
      case 3:
        if (!formData.mobile) currentErrors.mobile = "Mobile is required"
        else if (!/^\d{10}$/.test(formData.mobile)) {
          currentErrors.mobile = "Mobile must be a 10-digit number"
        }
        if (!formData.category) currentErrors.category = "Category is required"
        if (!formData.address) currentErrors.address = "Address is required"
        if (!formData.bloodGroup) currentErrors.bloodGroup = "Blood group is required"
        if (!formData.idMark) currentErrors.idMark = "Identification mark is required"
        if (!formData.maritalStatus) currentErrors.maritalStatus = "Marital status is required"
        if (!formData.aadharNo) currentErrors.aadharNo = "Aadhar number is required"
        break
      case 4:
        Object.keys(formData.documents).forEach((key) => {
          if (!formData.documents[key]) currentErrors[key] = `${key} is required`
        })
        break
      default:
        break
    }
    
    setErrors(currentErrors)
    return Object.keys(currentErrors).length === 0
  }

  const sendVerificationSms = async () => {
    try {
      const response = await axios.post("/api/auth/send-otp", {
        phoneNumber: formData.mobile,
        id: id      
      })

      if (response.data.success) {
        setSmsSent(true)
         } else {
        alert('Failed to send verification code.')
      }
    } catch (error) {
      alert('Failed to send verification code.')
    }
  }

  const verifyCode = async () => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        phoneNumber: formData.mobile,
        code: formData.verificationCode,
        id: id
      })
      
      if (response.data.success) {
        setFormData((prevData) => ({
          ...prevData,
          isVerified: true
        }))
        setShowButton(true)
        alert('Phone number verified successfully!')
      } else {
        alert('Invalid verification code.')
      }
    } catch (error) {
      alert('Verification failed.')
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async(e: React.FormEvent) => {
    console.log(formData)
    const nformData=JSON.parse(JSON.stringify(formData))
    nformData["id"]=id
    await axios.post('/api/user/update',nformData)
    route.replace('/dashboard').then(()=>{
        route.refresh()

    })
    
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <h2 className="text-2xl font-semibold text-center">Degree Application Form</h2>
      <form className="mt-6">
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
            <div className="mb-4">
              <label htmlFor="passingYear" className="block text-lg">Passing Year</label>
              <input
                type="number"
                id="passingYear"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.passingYear && <span className="text-red-600">{errors.passingYear}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="modeOpted" className="block text-lg">Mode Opted</label>
              <input
                type="text"
                id="modeOpted"
                name="modeOpted"
                value={formData.modeOpted}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.modeOpted && <span className="text-red-600">{errors.modeOpted}</span>}
            </div>
          </div>
        )}

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
              <label htmlFor="category" className="block text-lg">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.category && <span className="text-red-600">{errors.category}</span>}
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
              {errors.address && <span className="text-red-600">{errors.address}</span>}
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
              {errors.bloodGroup && <span className="text-red-600">{errors.bloodGroup}</span>}
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
              {errors.idMark && <span className="text-red-600">{errors.idMark}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="maritalStatus" className="block text-lg">Marital Status</label>
              <input
                type="text"
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.maritalStatus && <span className="text-red-600">{errors.maritalStatus}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="aadharNo" className="block text-lg">Aadhar Number</label>
              <input
                type="text"
                id="aadharNo"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.aadharNo && <span className="text-red-600">{errors.aadharNo}</span>}
            </div>
            <div className="mb-4">
              {smsSent ? (
                <div>
                  <label htmlFor="verificationCode" className="block text-lg">Enter OTP</label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.verificationCode && <span className="text-red-600">{errors.verificationCode}</span>}
                  <button
                    type="button"
                    onClick={verifyCode}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                  >
                    Verify Code
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={sendVerificationSms}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
        )}

{step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
            <div className="mb-4">
              <label className="block text-lg">Upload 10th Marksheet</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "tenthMarksheet")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.tenthMarksheet && <span className="text-red-600">{errors.tenthMarksheet}</span>}
            </div>
            {/* Add other file upload fields similarly */}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-gray-500 text-white rounded"
            >
              Previous
            </button>
          )}
          <div>
            {step < 3    && (
              <button
                type="button"
                onClick={nextStep}
                className="p-2  bg-blue-500 text-white rounded"
              >
                Next
              </button>
            )}
            {
                !showButton?<></>:
                <button
                type="button"
                onClick={()=>{handleSubmit(formData)}}
                className="p-2 ml-96 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            }
            {step === 4 && formData.isVerified && (
              <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
