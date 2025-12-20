import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";


const Dashboard = ()=> {
    const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
      const {  logout } = useAuth();
      const [stats, setStats] = useState({});
   const [suggestedUsers, setSuggestedUsers] = useState([]);
   const [recentActivity, setRecentActivity] = useState([]);
   const [loading, setLoading] = useState(true);
      const user = JSON.parse(localStorage.getItem("user")); // optional
      const token = localStorage.getItem("token");
      console.log("token", token);

      const handleLogout = () => {
        logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.stats);
        setSuggestedUsers(res.data.suggestedUsers);
        setRecentActivity(res.data.recentActivity);
      } catch (err) {
          navigate("/login");
        console.error(err);
      } finally {
        setLoading(false); // stop loader
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />; // show spinner while loading
  }


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`${sidebarOpen ? "block" : "hidden"} font-bold text-xl`}>
            SkillX
          </h1>
          <button
            className="p-2 rounded-md hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className={`${sidebarOpen ? "block" : "hidden"} flex-1 p-4 space-y-3 text-gray-700`}>
          <a href="#" className="block hover:bg-gray-200 p-2 rounded-md">
            Dashboard
          </a>
          <button 
  onClick={() => navigate("/profile")}
  className="block hover:bg-gray-200 p-2 rounded-md"
>
  My Profile
</button>
          <a href="#" className="block hover:bg-gray-200 p-2 rounded-md">
            Explore Skills
          </a>
          <a href="#" className="block hover:bg-gray-200 p-2 rounded-md">
            Messages
          </a>
          <a href="#" className="block hover:bg-gray-200 p-2 rounded-md">
            Settings
          </a>
          <a href="#" className="block hover:bg-gray-200 p-2 rounded-md">
            <button onClick={handleLogout}> Logout</button>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <div className="flex justify-around space-x-6">
          <h1 className={`${sidebarOpen ? "hidden" : "block"} font-bold text-4xl`}>
            SkillSwap
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search skills..."
              className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="user avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 overflow-y-auto">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Hi {user.name} 👋, Welcome back!</h2>
            <p className="text-gray-600">Your learning journey continues 🚀</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-600">Skills Offered</h3>
              <p className="text-2xl font-bold">{stats.offeredCount}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-600">Skills Wanted</h3>
              <p className="text-2xl font-bold">{stats.desiredCount}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-600">Requests</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>

          {/* Suggested Users */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Suggested Users</h3>
  {suggestedUsers.length > 0 ? (
          suggestedUsers.map((user) => (
            <div key={user._id} className="p-4 mb-3 border rounded shadow hover:bg-gray-100">
              <p><strong>Bio:</strong> {user.bio}</p>
              <p><strong>Offers:</strong> {user.offeredSkills.join(", ")}</p>
              <p><strong>Wants:</strong> {user.desiredSkills.join(", ")}</p>
            </div>
          ))
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((user) => (
                <div key={user} className="bg-white p-4 rounded-lg shadow">
                  <img
                    src={`https://i.pravatar.cc/150?img=${user}`}
                    alt="user"
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <h4 className="text-center font-semibold">User {user}</h4>
                  <p className="text-center text-sm text-gray-600">
                    Offers: Graphic Design
                  </p>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Connect
                  </button>
                </div>
              ))}
            </div>
        )}
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold mb-3">Recent Activity</h3>
{recentActivity.length > 0 ? (
          recentActivity.map((act, idx) => (
            <div key={idx} className="p-3 shadow mb-2 bg-white rounded-lg divide-y">
              <p>✅ {act.message}</p>
              <small className="text-gray-500">🎯 {new Date(act.date).toLocaleString()}</small>
            </div>
          ))
        ) : (
            <ul className="bg-white shadow rounded-lg divide-y">
              <li className="p-3">✅ You connected with User 2</li>
              <li className="p-3">📩 New message from User 3</li>
              <li className="p-3">🎯 User 1 wants to learn React</li>
            </ul>
        )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
