import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/MyProvider';
import LoadingSpinner from './LoadingSpinner';

const AllGroup = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch
  const [isActionLoading, setIsActionLoading] = useState(false); // Loading state for actions
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const queryParams = new URLSearchParams();
    if (difficulty) queryParams.append('difficulty', difficulty);
    if (searchQuery) queryParams.append('search', searchQuery);
    fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        setAssignments(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching assignments:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load assignments.',
          confirmButtonColor: '#3085d6',
        });
        setIsLoading(false);
      });
  }, [difficulty, searchQuery]);

  const groupedAssignments = [];
  for (let i = 0; i < assignments.length; i += 3) {
    groupedAssignments.push(assignments.slice(i, i + 3));
  }

  const showLoginError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Not Logged In',
      text: 'Please log in.',
      confirmButtonColor: '#3085d6',
    });
    navigate('/auth/login');
  };

  const handleViewClick = id => {
    if (!user) return showLoginError();
    setIsActionLoading(true);
    setTimeout(() => {
      navigate(`/auth/services/${id}`);
      setIsActionLoading(false);
    }, 500);
  };

  const handleEditClick = id => {
    if (!user) return showLoginError();
    setIsActionLoading(true);
    fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.userEmail !== user.email) {
          setIsActionLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You can only edit your own assignments.',
            confirmButtonColor: '#3085d6',
          });
          return;
        }
        navigate(`/auth/updateGroup/${id}`);
        setIsActionLoading(false);
      })
      .catch(err => {
        setIsActionLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to verify assignment ownership.',
          confirmButtonColor: '#3085d6',
        });
      });
  };

  const handleDeleteClick = async id => {
    if (!user) return showLoginError();
    try {
      const res = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`);
      const data = await res.json();
      if (data.userEmail !== user.email) {
        return Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You can only delete your own assignments.',
          confirmButtonColor: '#3085d6',
        });
      }
      const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) {
        setIsActionLoading(true);
        const deleteRes = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: user.email }),
        });
        const deleteData = await deleteRes.json();
        if (deleteRes.ok) {
          setAssignments(assignments.filter(a => a._id !== id));
          setIsActionLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Assignment deleted.',
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          setIsActionLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: deleteData.message || 'Failed to delete assignment.',
            confirmButtonColor: '#3085d6',
          });
        }
      }
    } catch (err) {
      setIsActionLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to verify assignment ownership.',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading assignments..." />;
  }

  return (
    <div className="mt-20 mb-8 px-4 flex flex-col items-center min-h-screen">
      {isActionLoading && <LoadingSpinner message="Processing action..." />}
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
        All Assignments
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6 text-center max-w-lg">
        Assignments are structured tasks given to learners to assess their understanding of a particular topic. They help students practice, apply, and reflect on what they’ve learned. In our platform, users can create, submit, and evaluate assignments collaboratively.
      </p>
      <div className="mb-6 w-full max-w-3xl flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input input-bordered w-full sm:w-64 p-2 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="select select-bordered w-full sm:w-40 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="w-full max-w-7xl">
        {groupedAssignments.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-300">No assignments found.</p>
        )}
        {groupedAssignments.map((group, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {group.map(assignment => (
              <div
                key={assignment._id}
                className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 p-4 rounded-lg shadow-md text-white w-full transition-transform transform hover:scale-105"
              >
                <img
                  src={assignment.thumbnailUrl}
                  alt={assignment.title}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <div className="p-3">
                  <h3 className="text-lg font-bold text-blue-300 hover:text-blue-500 truncate">
                    {assignment.title}
                  </h3>
                  <p className="text-sm mt-1">
                    <span
                      className={
                        assignment.difficulty === 'Medium'
                          ? 'text-yellow-400'
                          : assignment.difficulty === 'Easy'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }
                    >
                      ● {assignment.difficulty}
                    </span>
                  </p>
                  <p className="text-sm mt-1 truncate">By: {assignment.userName || 'Anonymous'}</p>
                  <p className="text-base mt-2 font-bold text-gray-300 hover:text-white">
                    Marks: {assignment.marks || 0}
                  </p>
                </div>
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    className="text-white hover:text-blue-300 relative group disabled:opacity-50"
                    title="View"
                    onClick={() => handleViewClick(assignment._id)}
                    disabled={isActionLoading}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5zm0 13c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6z" />
                      <path d="M12 8a1 1 0 00-1 1v4a1 1 0 001 1h.005a1 1 0 001-1V9a1 1 0 00-1-1z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
                      View
                    </span>
                  </button>
                  <button
                    className="text-white hover:text-yellow-300 relative group disabled:opacity-50"
                    title="Edit"
                    onClick={() => handleEditClick(assignment._id)}
                    disabled={isActionLoading}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
                      Edit
                    </span>
                  </button>
                  <button
                    className="text-white hover:text-red-300 relative group disabled:opacity-50"
                    title="Delete"
                    onClick={() => handleDeleteClick(assignment._id)}
                    disabled={isActionLoading}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-4.5z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroup;