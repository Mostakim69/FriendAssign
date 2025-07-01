import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/MyProvider';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AllGroupDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submission, setSubmission] = useState({
    googleDocsLink: '',
    notes: ''
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignment details');
        }
        const data = await response.json();
        setAssignment(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load assignment details. Please try again.',
        });
        setLoading(false);
        navigate('/assignments');
      }
    };

    fetchAssignment();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must be logged in to submit an assignment.',
      });
      navigate('/auth/login');
      return;
    }

    try {
      const response = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submission,
          userEmail: user.email,
          userName: user.displayName || 'Anonymous'
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit assignment');
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Assignment submitted successfully!',
      });
      setIsModalOpen(false);
      setSubmission({ googleDocsLink: '', notes: '' });
      navigate('/auth/pending-assignments');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit assignment. Please try again.',
      });
    }
  };

  const openModal = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to submit an assignment.',
      });
      navigate('/auth/login');
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">No assignment found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-24  min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={assignment.thumbnailUrl}
              alt={assignment.title}
              className="w-full h-72 object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/600x300?text=No+Image')}
            />
            <div className="p-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{assignment.title}</h2>

              <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium text-gray-600">
                <span
                  className={`px-3 py-1 rounded-full ${
                    assignment.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : assignment.difficulty === 'Hard'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  Difficulty: {assignment.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Marks: {assignment.marks || 'Not specified'}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Due Date:{' '}
                  {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{assignment.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="w-full sm:w-auto cursor-pointer bg-gray-300 text-gray-700 font-semibold py-2 px-2 rounded-lg shadow-sm hover:bg-gray-400 transition duration-300"
                  onClick={() => navigate('/assignments')}
                >
                  ← Back to Assignments
                </button>
                <button
                  className="btn btn-primary"
                  onClick={openModal}
                >
                  Take Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
          <div className=" rounded-xl shadow-2xl bg-white max-w-lg w-full p-8 relative">
            <h3 className="text-2xl font-bold text-gray-700 mb-6">Submit Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="googleDocsLink" className="block text-gray-700 text-sm font-medium mb-1">
                  Google Docs Link
                </label>
                <input
                  type="url"
                  id="googleDocsLink"
                  name="googleDocsLink"
                  value={submission.googleDocsLink}
                  onChange={handleInputChange}
                  placeholder="https://docs.google.com/..."
                  className="w-full border border-gray-300 text-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={submission.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes here..."
                  rows="4"
                  className="w-full text-gray-700 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-5 bg-gray-300 rounded-md font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AllGroupDetails;
