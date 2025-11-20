import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../Components/Footer';
import { AuthContext } from '../provider/MyProvider';

const Pending = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [markData, setMarkData] = useState({ obtainedMarks: '', feedback: '' });
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://assignment-11-server-iota-three.vercel.app/api/submissions/pending')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setSubmissions(data);
                setLoading(false);
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load submissions.' });
                setLoading(false);
            });
    }, []);

    const openMarkModal = (submission) => {
        if (!user) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Please log in to mark submissions.' });
            navigate('/auth/login');
            return;
        }
        setSelectedSubmission(submission);
        setMarkData({ obtainedMarks: '', feedback: '' });
        setIsModalOpen(true);
    };

    const closeMarkModal = () => {
        setIsModalOpen(false);
        setSelectedSubmission(null);
    };

    const handleMarkInputChange = (e) => setMarkData({ ...markData, [e.target.name]: e.target.value });

    const handleMarkSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Please log in to mark submissions.' });
            navigate('/auth/login');
            return;
        }
        if (!markData.obtainedMarks || isNaN(markData.obtainedMarks) || markData.obtainedMarks < 0) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Enter valid marks.' });
            return;
        }
        try {
            const res = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/submissions/${selectedSubmission._id}/mark`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...markData, userEmail: user.email }),
            });
            if (!res.ok) throw new Error((await res.json()).message || 'Failed to mark submission');
            Swal.fire({ icon: 'success', title: 'Success', text: 'Submission marked!' });
            setSubmissions(submissions.filter((sub) => sub._id !== selectedSubmission._id));
            closeMarkModal();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'Failed to mark submission.' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            
            <main className="flex-grow container mx-auto mt-8 xs:mt-10 sm:mt-12 px-2 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-12">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold  text-center mb-4 xs:mb-6 sm:mb-8 tracking-tight">
                    Pending Assignments
                </h2>
                {submissions.length === 0 ? (
                    <p className="text-center text-sm xs:text-base sm:text-lg text-gray-500 font-medium">No pending assignments found.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white rounded-lg text-xs xs:text-sm sm:text-base">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-left text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide">Assignment Title</th>
                                    <th className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-left text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide">Marks</th>
                                    <th className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-left text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide">Name</th>
                                    <th className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-center text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {submissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-indigo-50 transition-colors duration-200">
                                        <td className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-gray-700 font-medium truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none">{submission.title}</td>
                                        <td className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-gray-700">{submission.marks}</td>
                                        <td className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-gray-700 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">{submission.userName}</td>
                                        <td className="py-1 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 text-center">
                                            {user?.email === submission.userEmail ? (
                                                <span className="text-gray-500 font-medium text-[10px] xs:text-xs sm:text-sm">Your Submission</span>
                                            ) : (
                                                <button
                                                    className="bg-indigo-600 text-white py-1 xs:py-1 sm:py-2 px-2 xs:px-3 sm:px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => openMarkModal(submission)}
                                                >
                                                    Give Mark
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {isModalOpen && selectedSubmission && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-2xl p-3 xs:p-4 sm:p-6 w-full max-w-[90vw] xs:max-w-md sm:max-w-lg transform transition-all duration-300">
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6">Mark Submission</h3>
                        <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">Google Docs Link</label>
                                <a
                                    href={selectedSubmission.googleDocsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm truncate block"
                                >
                                    {selectedSubmission.googleDocsLink}
                                </a>
                            </div>
                            <div>
                                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">Notes</label>
                                <p className="mt-1 text-gray-600 text-[10px] xs:text-xs sm:text-sm">{selectedSubmission.notes || 'No notes provided'}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">Marks Obtained</label>
                                <input
                                    type="number"
                                    name="obtainedMarks"
                                    value={markData.obtainedMarks}
                                    onChange={handleMarkInputChange}
                                    placeholder="Enter marks"
                                    className="mt-1 block w-full p-1 xs:p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">Feedback</label>
                                <textarea
                                    name="feedback"
                                    value={markData.feedback}
                                    onChange={handleMarkInputChange}
                                    placeholder="Enter feedback"
                                    className="mt-1 block w-full p-1 xs:p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm"
                                    rows="3 xs:rows-4 sm:rows-5"
                                />
                            </div>
                            <div className="flex justify-end space-x-1 xs:space-x-2 sm:space-x-4">
                                <button
                                    className="bg-gray-300 text-gray-800 py-1 xs:py-1 sm:py-2 px-2 xs:px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    onClick={closeMarkModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-indigo-600 text-white py-1 xs:py-1 sm:py-2 px-2 xs:px-3 sm:px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-[10px] xs:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={handleMarkSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Pending;