import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '', // Changed from subject to title
    request: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.title.trim() === '' || // Changed from subject to title
      formData.request.trim() === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill out all required fields.',
        confirmButtonColor: '#22c55e'
      });
    } else if (!validateEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#22c55e'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Request Submitted',
        text: 'Thank you! Your request has been submitted successfully.',
        confirmButtonColor: '#22c55e'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        title: '', // Changed from subject to title
        request: ''
      });
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 ml-10 mr-10 sm:m-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row gap-12 bg-white shadow-lg rounded-lg p-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-black mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-black placeholder-gray-400"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-black mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-black placeholder-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-base font-medium text-black mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-black placeholder-gray-400"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-base font-medium text-black mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-black placeholder-gray-400"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="request" className="block text-base font-medium text-black mb-1">
                Your Request *
              </label>
              <textarea
                name="request"
                id="request"
                placeholder="Describe your request"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition h-40 resize-none text-black placeholder-gray-400"
                value={formData.request}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full md:w-auto px-6 py-3 btn btn-primary text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Our Headquarters</h3>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Dhaka:</span> St. Cesar Calling Roma
              </p>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Rajshahi:</span> St. Diamond Calling Brussels
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Reach Us 24/7</h3>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Whatsapp:</span> +880-1821-023369
              </p>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Phone:</span> +880-162-2258409
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Email Us</h3>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Customers:</span> mdmostakimhosen35@gmail.com
              </p>
              <p className="text-base font-medium text-black">
                <span className="font-semibold">Customers:</span> posterboy520807@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;