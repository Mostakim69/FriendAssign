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
    title: '', description: '', marks: '', thumbnailUrl: '', difficulty: 'Easy',
    dueDate: new Date(), userEmail: user?.email || '', userName: user?.displayName || ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      Swal.fire({ icon: 'error', title: 'Not Logged In', text: 'Please log in to edit assignments.' })
        .then(() => navigate('/login'));
      return;
    }

    fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Assignment not found');
        return response.json();
      })
      .then(data => {
        if (data.userEmail !== user.email) {
          Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You can only edit your own assignments.' })
            .then(() => navigate('/assignments'));
          return;
        }
        setFormData({
          title: data.title || '', description: data.description || '', marks: data.marks || '',
          thumbnailUrl: data.thumbnailUrl || '', difficulty: data.difficulty || 'Easy',
          dueDate: Date(data.dueDate) || new Date(), userEmail: data.userEmail || user.email,
          userName: data.userName || user.displayName
        });
        setLoading(false);
      })
      .catch(error => {
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
    } else {
      setImagePreview(null);
    }
  }, [formData.thumbnailUrl]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setFormData({ ...formData, dueDate: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.marks || !formData.thumbnailUrl ||
        !imagePreview || formData.description.length < 20 || !formData.userEmail || !formData.userName) {
      Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fill all fields correctly.' });
      return;
    }

    try {
      const response = await fetch(`https://assignment-11-server-iota-three.vercel.app/api/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, marks: parseInt(formData.marks), dueDate: formData.dueDate.toISOString() })
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({ icon: 'success', title: 'Success', text: 'Assignment updated!', timer: 2000 })
          .then(() => navigate('/assignments'));
      } else {
        throw new Error(data.message || 'Failed to update assignment');
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'Failed to update assignment.' });
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 pb-2">
        <div className="container mx-auto mt-8 p-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4">Update Assignment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">User Email</label>
              <input type="email" name="userEmail" value={formData.userEmail} readOnly className="w-full p-2 border rounded cursor-not-allowed" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">User Name</label>
              <input type="text" name="userName" value={formData.userName} readOnly className="w-full p-2 border rounded cursor-not-allowed" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Assignment title" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" required />
              {formData.description.length < 20 && formData.description.length > 0 && (
                <p className="text-red-500 text-sm mt-1">Description must be at least 20 characters.</p>
              )}
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Marks</label>
                <input type="number" name="marks" value={formData.marks} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Total marks" required />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
              <input type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="https://example.com/image.jpg" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <DatePicker selected={formData.dueDate} onChange={handleDateChange} className="w-full p-2 border rounded" dateFormat="MMMM d, yyyy" />
            </div>
            {imagePreview && (
              <div className="mb-4">
                <img src={imagePreview} alt="Thumbnail Preview" className="w-full max-h-[150px] object-cover rounded" />
              </div>
            )}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">Update Assignment</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpdateGroup;