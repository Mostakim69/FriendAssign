import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Terms = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    request: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.subject === '' ||
      formData.request.trim() === ''
    ) {
      // Show error alert if any field is empty
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields!',
      });
    } else {
      // Show success alert if all fields are filled
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your request has been submitted successfully!',
      });

      // Reset form after submission (optional)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        request: ''
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-6xl mt-10 mx-auto">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name*"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email*"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleChange}
            />
            <select
              name="subject"
              className="select select-bordered w-full"
              value={formData.subject}
              onChange={handleChange}
            >
              <option disabled value="">
                Select Subject
              </option>
              <option value="Drawing & Painting">Drawing & Painting</option>
              <option value="PhotographySales">PhotographySales</option>
              <option value="Fishing">Fishing</option>
              <option value="Videos Gaming">Videos Gaming</option>
              <option value="Running">Running</option>
            </select>
          </div>
          <textarea
            name="request"
            placeholder="Kindly Describe Your Request *"
            className="textarea textarea-bordered w-full h-32"
            value={formData.request}
            onChange={handleChange}
          ></textarea>
          <button
            className="btn btn-active btn-success font-semibold py-2 px-6 rounded"
            onClick={handleSubmit}
          >
            SUBMIT REQUEST
          </button>
        </div>

        <div className="w-full lg:w-1/3 space-y-6 text-sm text-gray-700">
          <div>
            <h3 className="font-bold text-gray-900">OUR HEADQUARTERS</h3>
            <p>
              <span className="font-semibold">Dhaka:</span> St. Cesar Calling Roma
            </p>
            <p>
              <span className="font-semibold">Rajshahi:</span> St. Diamond Calling Brussels
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">REACH US 24/7 VIA PHONE</h3>
            <p>
              <span className="font-semibold">Dhaka:</span> +880-189-7382004
            </p>
            <p>
              <span className="font-semibold">Rajshahi:</span> +880-168-4094822
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">MAIL US ANYTIME</h3>
            <p>
              <span className="font-semibold">Sales:</span> posterboy52@gmail.com
            </p>
            <p>
              <span className="font-semibold">Customers:</span> posterboy520807@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Terms;