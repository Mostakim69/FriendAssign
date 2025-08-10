import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalGroups, setTotalGroups] = useState(0);
  const [myGroups, setMyGroups] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total groups
        const allGroupsRes = await axios.get('https://assignment-ten-server-olive.vercel.app/groups');
        if (allGroupsRes.data.success) {
          setTotalGroups(allGroupsRes.data.data.length);
        }

        // My groups
        if (user?.email) {
          const myGroupsRes = await axios.get('https://assignment-ten-server-olive.vercel.app/groups', {
            params: { email: user.email }
          });
          if (myGroupsRes.data.success) {
            setMyGroups(myGroupsRes.data.data.length);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 ">Dashboard</h1>

        {/* User Info */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Welcome, {user?.displayName || 'User'}!
          </h2>
          <p className="text-gray-300">Email: {user?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-indigo-900 transition-all duration-300">
            <h3 className="text-lg font-semibold text-indigo-300">Total Groups</h3>
            <p className="text-4xl font-bold text-white mt-3">{totalGroups}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-green-900 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-300">My Groups</h3>
            <p className="text-4xl font-bold text-white mt-3">{myGroups}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-yellow-900 transition-all duration-300">
            <h3 className="text-lg font-semibold text-yellow-300">User Status</h3>
            <p className="text-lg text-white mt-3">{user ? 'Logged In' : 'Guest'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;