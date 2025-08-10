import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/MyProvider';
import LoadingSpinner from './LoadingSpinner';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const AllGroup = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(''); // New state for sort field
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sort order
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedDiff = useDebounce(difficulty, 500);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (debouncedDiff) params.append('difficulty', debouncedDiff);
    if (debouncedSearch) params.append('search', debouncedSearch);
    fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments?${params}`)
      .then(res => res.json())
      .then(data => {
        // Sort assignments based on sortBy and sortOrder
        const sortedData = [...data].sort((a, b) => {
          if (!sortBy) return 0;
          let valueA = a[sortBy];
          let valueB = b[sortBy];

          // Handle difficulty sorting with specific order
          if (sortBy === 'difficulty') {
            const order = ['Easy', 'Medium', 'Hard'];
            valueA = order.indexOf(a.difficulty);
            valueB = order.indexOf(b.difficulty);
          }

          // Handle numeric marks
          if (sortBy === 'marks') {
            valueA = Number(a.marks) || 0;
            valueB = Number(b.marks) || 0;
          }

          // Handle string comparison for title
          if (sortBy === 'title') {
            valueA = valueA?.toLowerCase() || '';
            valueB = valueB?.toLowerCase() || '';
          }

          if (sortOrder === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
          } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
          }
        });
        setAssignments(sortedData);
        setIsLoading(false);
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load assignments.', confirmButtonColor: '#2563EB' });
        setIsLoading(false);
      });
  }, [debouncedDiff, debouncedSearch, sortBy, sortOrder]);

  const grouped = [];
  for (let i = 0; i < assignments.length; i += 4) grouped.push(assignments.slice(i, i + 4));

  const showLoginError = () => {
    Swal.fire({ icon: 'error', title: 'Not Logged In', text: 'Please log in to perform this action.', confirmButtonColor: '#2563EB' });
    navigate('/auth/login');
  };

  const handleViewClick = id => {
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
          Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You can only edit your own assignments.', confirmButtonColor: '#2563EB' });
          return;
        }
        navigate(`/auth/updateGroup/${id}`);
        setIsActionLoading(false);
      })
      .catch(() => {
        setIsActionLoading(false);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to verify assignment ownership.', confirmButtonColor: '#2563EB' });
      });
  };

  const handleDeleteClick = async id => {
    if (!user) return showLoginError();
    try {
      const res = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`);
      const data = await res.json();
      if (data.userEmail !== user.email) {
        return Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You can only delete your own assignments.', confirmButtonColor: '#2563EB' });
      }
      const result = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#DC2626', cancelButtonColor: '#2563EB', confirmButtonText: 'Yes, delete it!' });
      if (result.isConfirmed) {
        setIsActionLoading(true);
        const deleteRes = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: user.email }),
        });
        const deleteData = await deleteRes.json();
        if (deleteRes.ok) {
          setAssignments(a => a.filter(item => item._id !== id));
          Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Assignment deleted successfully.', timer: 2000, showConfirmButton: false });
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: deleteData.message || 'Failed to delete assignment.', confirmButtonColor: '#2563EB' });
        }
        setIsActionLoading(false);
      }
    } catch {
      setIsActionLoading(false);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to verify assignment ownership.', confirmButtonColor: '#2563EB' });
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading assignments..." />;
  return (
    <div className="mt-30 mb-8 px-6 flex flex-col items-center min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {isActionLoading && <LoadingSpinner message="Processing action..." />}
      <h2 className="text-3xl font-extrabold mb-4 text-center dark:text-gray-100 tracking-tight">All Assignments</h2>
      <p className="max-w-xl text-center mb-8 dark:text-gray-300 leading-relaxed">
        Assignments are structured tasks given to learners to assess their understanding of a particular topic. They help students practice, apply, and reflect on what they’ve learned. On our platform, users can create, submit, and evaluate assignments collaboratively.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mb-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search assignments..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          aria-label="Search assignments"
        />
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="w-40 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          aria-label="Filter by difficulty"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-40 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          aria-label="Sort by"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
          <option value="marks">Marks</option>
        </select>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="w-40 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          aria-label="Sort order"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="w-full max-w-7xl">
        {!grouped.length ? (
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg font-medium">No assignments found.</p>
        ) : (
          grouped.map((group, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {group.map(a => (
                <article
                  key={a._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 border border-transparent transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden"
                  style={{ minHeight: '360px' }}
                >
                  <img src={a.thumbnailUrl || '/default-thumbnail.png'} alt={a.title} className="w-full h-44 object-cover" />
                  <div className="p-5 flex flex-col flex-grow">
                    <h3
                      className="text-xl font-semibold text-blue-700 dark:text-blue-400 truncate mb-1 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer"
                      title={a.title}
                    >
                      {a.title}
                    </h3>
                    <p className="text-sm mb-1">
                      <span
                        className={`font-semibold ${
                          a.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400' : a.difficulty === 'Medium' ? 'text-yellow-500 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        ● {a.difficulty || 'N/A'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 truncate" title={a.userName || 'Anonymous'}>
                      By: {a.userName || 'Anonymous'}
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Marks: {a.marks ?? 0}</p>
                    <div className="mt-auto flex justify-end space-x-4">
                      <button
                        onClick={() => handleViewClick(a._id)}
                        disabled={isActionLoading}
                        aria-label={`View assignment ${a.title}`}
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer rounded"
                        title="View"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 4.5c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5zm0 13c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6z" />
                          <path d="M12 8a1 1 0 00-1 1v4a1 1 0 001 1h.005a1 1 0 001-1V9a1 1 0 00-1-1z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditClick(a._id)}
                        disabled={isActionLoading}
                        aria-label={`Edit assignment ${a.title}`}
                        className="text-yellow-600 hover:text-yellow-800 dark:hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer rounded"
                        title="Edit"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(a._id)}
                        disabled={isActionLoading}
                        aria-label={`Delete assignment ${a.title}`}
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer rounded"
                        title="Delete"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-4.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGroup;