// pages/index.tsx
import React from 'react';
import IITList from '../components/colleges';

const LandingPage: React.FC = () => {
  return (
    <div className="p-8 font-sans bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to Our Online College Education Platform</h1>
      <p className="text-xl text-center mt-4">Your Gateway to Quality Education from Leading Colleges</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Flexible Learning Options</h2>
        <p className="mt-2 text-lg text-gray-700">
          Take control of your education with flexible learning options designed for students who need to balance work, family, and other commitments. Our platform offers courses from renowned colleges across various fields, so you can learn at your own pace, wherever and whenever it's convenient for you.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="text-lg text-gray-700"><strong>Self-Paced Courses:</strong> Learn at your own speed, with courses that allow you to set your own schedule.</li>
          <li className="text-lg text-gray-700"><strong>Live Sessions & Recorded Lectures:</strong> Access live lectures or revisit them through our extensive library of recorded sessions.</li>
          <li className="text-lg text-gray-700"><strong>Interactive Learning Tools:</strong> Engage with quizzes, assignments, and projects to enhance your learning experience.</li>
          <li className="text-lg text-gray-700"><strong>24/7 Support:</strong> Our dedicated support team is available around the clock to help you with any queries or challenges.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Courses Offered</h2>
        <p className="mt-2 text-lg text-gray-700">Explore a wide range of courses designed to cater to your interests and career goals. Whether you're pursuing a degree in computer science, business, or humanities, we have something for you.</p>
        <ul className="mt-4 space-y-2 list-disc pl-8">
          <li className="text-lg text-gray-700">Computer Science</li>
          <li className="text-lg text-gray-700">Business & Management</li>
          <li className="text-lg text-gray-700">Engineering</li>
          <li className="text-lg text-gray-700">Arts & Humanities</li>
          <li className="text-lg text-gray-700">Health Sciences</li>
          <li className="text-lg text-gray-700">Law & Policy</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Our Partner Colleges</h2>
        <p className="mt-2 text-lg text-gray-700">
          Our platform hosts courses from various colleges recognized for their academic excellence and industry relevance. With a focus on practical skills and knowledge, these institutions provide high-quality education designed to prepare you for the future.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="text-lg text-gray-700"><strong>College A:</strong> Known for its world-class faculty and cutting-edge research.</li>
          <li className="text-lg text-gray-700"><strong>College B:</strong> Offers innovative programs with a strong focus on real-world applications.</li>
          <li className="text-lg text-gray-700"><strong>College C:</strong> Combines a rich academic tradition with modern learning techniques.</li>
        </ul>

        <h3 className="text-xl font-semibold text-blue-600 mt-6">IIT Partner Colleges</h3>
        <p className="mt-2 text-lg text-gray-700">We are proud to partner with some of the most prestigious IITs across India:</p>
  <br></br>
   <IITList/>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Why Choose Us?</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-lg text-gray-700"><strong>Accredited Programs:</strong> Courses and degrees are accredited by top educational authorities.</li>
          <li className="text-lg text-gray-700"><strong>Global Reach:</strong> Access courses from colleges across India and the USA.</li>
          <li className="text-lg text-gray-700"><strong>Job-Ready Skills:</strong> Learn from industry leaders and gain the skills employers are looking for.</li>
          <li className="text-lg text-gray-700"><strong>Community Engagement:</strong> Join a vibrant community of students, mentors, and industry professionals.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Get Started Today</h2>
        <p className="mt-2 text-lg text-gray-700">
          Ready to take the next step in your educational journey? Sign up now and start your learning experience with us. Explore flexible learning options and discover the path that suits you best.
        </p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">Contact Us</h2>
        <p className="mt-2 text-lg text-gray-700">Have questions or need more information? Our team is happy to assist you.</p>
        <ul className="mt-4 space-y-2">
          <li className="text-lg text-gray-700">Email: <a href="mailto:support@educationplatform.com" className="text-blue-600">support@educationplatform.com</a></li>
          <li className="text-lg text-gray-700">Phone: +91-XXXX-XXXXXX</li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
