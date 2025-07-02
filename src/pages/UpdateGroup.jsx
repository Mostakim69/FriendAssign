import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { AuthContext } from '../provider/MyProvider';

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnailUrl: '',
    difficulty: 'Easy',
    dueDate: new Date(),
    userEmail: user?.email || '',
    userName: user?.displayName || '',
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const newErrors = {
      title: !formData.title || formData.title.length < 5 ? 'Title must be at least 5 characters.' : '',
      description: !formData.description || formData.description.length < 20 ? 'Description must be at least 20 characters.' : '',
      marks: !formData.marks || isNaN(formData.marks) || formData.marks <= 0 ? 'Marks must be a positive number.' : '',
      thumbnailUrl: !formData.thumbnailUrl || !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(formData.thumbnailUrl) ? 'Valid image URL required.' : '',
      dueDate: !formData.dueDate || new Date(formData.dueDate) < new Date() ? 'Due date must be in the future.' : '',
      userEmail: !formData.userEmail ? 'User email required.' : '',
      userName: !formData.userName ? 'User name required.' : '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  useEffect(() => {
    if (!user) {
      Swal.fire({ icon: 'error', title: 'Not Logged In', text: 'Please log in to edit assignments.' })
        .then(() => navigate('/login'));
      return;
    }

    fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Assignment not found or server error'))
      .then(data => {
        if (data.userEmail !== user.email) {
          Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You can only edit your own assignments.' })
            .then(() => navigate('/assignments'));
          return;
        }
        setFormData({
          title: data.title || '',
          description: data.description || '',
          marks: data.marks || '',
          thumbnailUrl: data.thumbnailUrl || '',
          difficulty: data.difficulty || 'Easy',
          dueDate: new Date(data.dueDate) || new Date(),
          userEmail: data.userEmail || user.email,
          userName: data.userName || user.displayName,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching assignment:', err);
        setError('Failed to load assignment data.');
        setLoading(false);
      });
  }, [id, user, navigate]);

  useEffect(() => {
    if (formData.thumbnailUrl) {
      const img = new Image();
      img.onload = () => setImagePreview(formData.thumbnailUrl);
      img.onerror = () => setImagePreview(null);
      img.src = formData.thumbnailUrl;
    } else setImagePreview(null);
  }, [formData.thumbnailUrl]);

  const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
  const handleDateChange = date => setFormData({ ...formData, dueDate: date });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fix the errors in the form.' });

    try {
      const res = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, marks: parseInt(formData.marks), dueDate: formData.dueDate.toISOString() }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to update assignment');
      Swal.fire({ icon: 'success', title: 'Success', text: 'Assignment updated successfully!', timer: 2000, showConfirmButton: false })
        .then(() => navigate('/assignments'));
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'Failed to update assignment.' });
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const fields = [
    { name: 'userEmail', label: 'User Email', type: 'email', readOnly: true },
    { name: 'userName', label: 'User Name', type: 'text', readOnly: true },
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Assignment title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed assignment description' },
    { name: 'marks', label: 'Marks', type: 'number', placeholder: 'Total marks' },
    { name: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url', placeholder: 'https://example.com/image.jpg' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto p-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-lg shadow-md text-black"
          >
            <h2 className="text-2xl font-bold mb-4">Update Assignment</h2>
            {fields.map(({ name, label, type, placeholder, readOnly }) => (
              <div key={name} className="mb-4">
                <label className="block text-sm font-medium mb-1">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded bg-white text-black placeholder-gray-500 ${errors[name] ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    required
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={readOnly ? undefined : handleChange}
                    readOnly={readOnly}
                    className={`w-full p-2 border rounded bg-white text-black placeholder-gray-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${errors[name] ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    required
                  />
                )}
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white text-black"
                >
                  {['Easy', 'Medium', 'Hard'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={handleDateChange}
                  className={`w-full p-2 border rounded bg-white text-black ${errors.dueDate ? 'border-red-500' : ''}`}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
                {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
              </div>
            </div>
            {imagePreview && <img src={imagePreview} alt="Thumbnail Preview" className="w-full max-h-[150px] object-cover rounded mb-4" />}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update Assignment
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpdateGroup;