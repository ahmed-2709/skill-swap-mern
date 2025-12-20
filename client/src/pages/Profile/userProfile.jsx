import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";


const Profile = () => {
  const [offeredSkills, setOfferedSkills] = useState("");
  const [desiredSkills, setDesiredSkills] = useState("");
  const [bio, setBio] = useState("");
     const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfferedSkills(res.data.offeredSkills || "");
        setDesiredSkills(res.data.desiredSkills || "");
        setBio(res.data.bio || "");
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
      finally{
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if(loading)
  {
     return <Loader />
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/profile/create",
        { offeredSkills, desiredSkills, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error saving profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <label className="block mb-2 font-medium">Offered Skills</label>
      <input
        type="text"
        value={offeredSkills}
        onChange={(e) => setOfferedSkills(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <label className="block mb-2 font-medium">Desired Skills</label>
      <input
        type="text"
        value={desiredSkills}
        onChange={(e) => setDesiredSkills(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <label className="block mb-2 font-medium">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/dashboard")} // 👈 Back to dashboard
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Profile;

