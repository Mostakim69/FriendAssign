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
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
        const sortedData = [...data].sort((a, b) => {
          if (!sortBy) return 0;
          let valueA = a[sortBy];
          let valueB = b[sortBy];
          if (sortBy === 'difficulty') {
            const order = ['Easy', 'Medium', 'Hard'];
            valueA = order.indexOf(a.difficulty);
            valueB = order.indexOf(b.difficulty);
          }
          if (sortBy === 'marks') {
            valueA = Number(a.marks) || 0;
            valueB = Number(b.marks) || 0;
          }
          if (sortBy === 'title') {
            valueA = valueA?.toLowerCase() || '';
            valueB = valueB?.toLowerCase() || '';
          }
          return sortOrder === 'asc'
            ? valueA < valueB ? -1 : valueA > valueB ? 1 : 0
            : valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        });
        setAssignments(sortedData);
        setCurrentPage(1); // Reset to first page on filter/search change
        setIsLoading(false);
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load assignments.', confirmButtonColor: '#2563EB' });
        setIsLoading(false);
      });
  }, [debouncedDiff, debouncedSearch, sortBy, sortOrder]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(assignments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        navigate(`/dashb/updateGroup/${id}`);
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
      const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DC2626',
        cancelButtonColor: '#2563EB',
        confirmButtonText: 'Yes, delete it!'
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
    <div className="mt-16 px-6 py-16 flex flex-col items-center transition-colors duration-300">
      {isActionLoading && <LoadingSpinner message="Processing action..." />}

      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-3 tracking-tight">
          All Assignments
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          Explore and manage all assignments submitted by users. You can filter, search, and sort them easily to find exactly what you’re looking for.
        </p>
      </div>

      {/* Filters & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-5xl mb-10 justify-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="🔍 Search assignments..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow p-3 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 transition-all"
        />
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 transition-all">
          <option value="">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 transition-all">
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
          <option value="marks">Marks</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 transition-all">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Assignment Cards */}
      <div className="w-full max-w-7xl">
        {!currentAssignments.length ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">No assignments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {currentAssignments.map(a => (
              <article key={a._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transform hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden">
                <img src={a.thumbnailUrl || '/default-thumbnail.png'} alt={a.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 truncate mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300">{a.title}</h3>
                  <p className={`text-sm font-medium mb-1 ${a.difficulty === 'Easy' ? 'text-green-600' : a.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                    ● {a.difficulty || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">By: {a.userName || 'Anonymous'}</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Marks: {a.marks ?? 0}</p>
                  <div className="mt-auto flex justify-end gap-3">
                    <button onClick={() => handleViewClick(a._id)} title="View" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button onClick={() => handleEditClick(a._id)} title="Edit" className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDeleteClick(a._id)} title="Delete" className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGroup;
