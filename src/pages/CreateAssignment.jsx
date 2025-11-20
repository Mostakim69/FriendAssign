import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';

const CreateAssignment = () => {
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
  const [showDescriptionMessage, setShowDescriptionMessage] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters.';
    if (!formData.description || formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters.';
    if (!formData.marks || isNaN(formData.marks) || formData.marks <= 0) newErrors.marks = 'Marks must be a positive number.';
    if (!formData.thumbnailUrl || !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(formData.thumbnailUrl)) newErrors.thumbnailUrl = 'Valid image URL required.';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (!formData.dueDate || new Date(formData.dueDate) < today) newErrors.dueDate = 'Due date must be today or future.';
    if (!formData.userEmail) newErrors.userEmail = 'User email required.';
    if (!formData.userName) newErrors.userName = 'User name required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'description') {
      setShowDescriptionMessage(value.length > 0 && value.length < 20);
    }
  };

  const handleDateChange = (date) => setFormData({ ...formData, dueDate: date });

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userEmail: user?.email || '',
      userName: user?.displayName || '',
    }));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fix the errors in the form.' });
    }

    try {
      const response = await fetch('https://assignment-11-server-iota-three.vercel.app/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          marks: parseInt(formData.marks),
          dueDate: formData.dueDate.toISOString(),
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Assignment created successfully!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          setFormData({
            title: '',
            description: '',
            marks: '',
            thumbnailUrl: '',
            difficulty: 'Easy',
            dueDate: new Date(),
            userEmail: user?.email || '',
            userName: user?.displayName || '',
          });
          setImagePreview(null);
          setShowDescriptionMessage(false);
          navigate('/assignments');
        });
      } else throw new Error('Failed to create assignment');
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to save assignment.' });
    }
  };

  return (
    <>
      <main className="min-h-screen pt-16 mt-18 pb-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="max-w-full sm:max-w-2xl md:max-w-3xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg sm:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-center  text-gray-600 dark:text-gray-300">
              📘 Create New Assignment
            </h2>
            <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
              Fill out the form below to create a new assignment for your students.
              Ensure all details are accurate before submitting.
            </p>

            {['userEmail', 'userName', 'title', 'description', 'marks', 'thumbnailUrl'].map((field) => (
              <div key={field} className="mb-4 sm:mb-5">
                <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-700 dark:text-gray-100">
                  {field === 'userEmail'
                    ? 'User Email'
                    : field === 'userName'
                      ? 'User Name'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field === 'description' ? (
                  <>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs sm:text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 ${errors.description ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
                        }`}
                      placeholder="Write a detailed description..."
                      required
                    />
                    {showDescriptionMessage && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 animate-pulse">
                        📝 Description must be at least 20 characters.
                      </p>
                    )}
                    {errors.description && (
                      <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                    )}
                  </>
                ) : (
                  <input
                    type={field === 'userEmail' ? 'email' : field === 'marks' ? 'number' : field === 'thumbnailUrl' ? 'url' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={field === 'userEmail' || field === 'userName' ? undefined : handleChange}
                    readOnly={field === 'userEmail' || field === 'userName'}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${field === 'userEmail' || field === 'userName'
                        ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-700'
                      } ${errors[field] ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
                      }`}
                    placeholder={
                      field === 'thumbnailUrl'
                        ? 'https://example.com/image.jpg'
                        : `${field.charAt(0).toUpperCase() + field.slice(1)}`
                    }
                    required
                  />
                )}
                {errors[field] && field !== 'description' && (
                  <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="w-full sm:w-1/2">
                <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-700 dark:text-gray-100">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white dark:bg-gray-700 text-xs sm:text-sm text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 hover:border-teal-300 transition-all duration-300"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-700 dark:text-gray-100">
                  Due Date
                </label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={handleDateChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white dark:bg-gray-700 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 ${errors.dueDate ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  popperClassName="z-50 w-full sm:w-auto"
                  wrapperClassName="w-full"
                />
                {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>

            {imagePreview && (
              <div className="mb-4 sm:mb-6">
                <img
                  src={imagePreview}
                  alt="Thumbnail Preview"
                  className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-coral-500 cursor-pointer hover:from-teal-600 hover:to-coral-600 text-white py-3 sm:py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              🚀 Create Assignment
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateAssignment;