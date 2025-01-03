import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadOnlyApplication = ({ id }) => {
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/user`,{
            id:id
        });
        console.log(response)
        setApplicationData(response.data.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to load application data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">{error}</div>
  );

  if (!applicationData) return (
    <div className="text-gray-500 text-center p-4">No application data found</div>
  );

  const DocumentDisplay = ({ label, value }) => (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-gray-900 text-lg mt-1">{value || 'Not provided'}</p>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Application Details</h2>
      </div>

      <div className="space-y-8">
        <Section title="Personal Information">
          <DocumentDisplay label="Father's Name" value={applicationData.fatherName} />
          <DocumentDisplay label="Mother's Name" value={applicationData.motherName} />
          <DocumentDisplay label="Date of Birth" value={applicationData.dob} />
        </Section>

        <Section title="Academic Information">
          <DocumentDisplay label="Course" value={applicationData.course} />
          <DocumentDisplay label="Session" value={applicationData.session} />
          <DocumentDisplay label="University" value={applicationData.university} />
          <DocumentDisplay label="Passing Year" value={applicationData.passingYear} />
          <DocumentDisplay label="Mode Opted" value={applicationData.modeOpted} />
        </Section>

        <Section title="Contact Information">
          <DocumentDisplay label="Mobile Number" value={applicationData.mobile} />
          <DocumentDisplay label="Category" value={applicationData.category} />
          <DocumentDisplay label="Address" value={applicationData.address} />
          <DocumentDisplay label="Blood Group" value={applicationData.bloodGroup} />
          <DocumentDisplay label="Identification Mark" value={applicationData.idMark} />
          <DocumentDisplay label="Marital Status" value={applicationData.maritalStatus} />
          <DocumentDisplay label="Aadhar Number" value={applicationData.aadharNo} />
        </Section>

        <Section title="Uploaded Documents">
          {Object.entries(applicationData.documents || {}).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-3">
              <div className="w-6 h-6">
                {value ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className="text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </Section>

      
      </div>
    </div>
  );
};

export default ReadOnlyApplication;