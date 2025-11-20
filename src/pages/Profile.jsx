import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL || 'https://i.ibb.co/WvJPwjkh/b41b784be9a6392773515b32217b39eb.jpg',
    })
      .then(() => {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        setIsEditing(false);
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <> 
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-8 rounded-lg">
        <h2 className="font-semibold text-3xl text-center mb-6">Your Profile</h2>
        <div className="text-center mb-6">
          <img
            src={user?.photoURL || 'https://i.ibb.co/WvJPwjkh/b41b784be9a6392773515b32217b39eb.jpg'}
            alt="User profile"
            className="h-24 w-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{user?.displayName || 'User'}</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="card-body p-0">
            <label className="label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              placeholder="Enter your name"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input w-full"
              placeholder="Enter photo URL"
            />

            <div className="flex justify-between mt-4">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary w-full"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;