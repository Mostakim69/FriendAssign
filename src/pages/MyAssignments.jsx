import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/MyProvider';
import Footer from '../Components/Footer';

const MyAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to view your assignments.',
      });
      navigate('/auth/login');
      return;
    }

    const fetchSubmissions = async () => {
      try {
        // Fetch all submissions (pending and completed)
        const response = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/submissions`);
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        // Filter submissions by the logged-in user's email
        const userSubmissions = data.filter(sub => sub.userEmail === user.email);
        setSubmissions(userSubmissions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load your submissions. Please try again.',
        });
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">My Assignments</h2>
          {submissions.length === 0 ? (
            <p className="text-gray-600 text-lg text-center">You have not submitted any assignments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                    <th className="py-3 px-4 text-left text-gray-800 font-semibold">Assignment Title</th>
                    <th className="py-3 px-4 text-left text-gray-800 font-semibold">Status</th>
                    <th className="py-3 px-4 text-left text-gray-800 font-semibold">Total Marks</th>
                    <th className="py-3 px-4 text-left text-gray-800 font-semibold">Obtained Marks</th>
                    <th className="py-3 px-4 text-left text-gray-800 font-semibold">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{submission.title}</td>
                      <td className="py-3 px-4">
                        <span
                          className={
                            submission.status === 'pending'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }
                        >
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{submission.marks}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {submission.status === 'completed' && submission.obtainedMarks !== null
                          ? submission.obtainedMarks
                          : 'Not Marked'}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {submission.status === 'completed' && submission.feedback
                          ? submission.feedback
                          : 'No feedback provided'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyAssignments;