import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState();
  const getProducts = async () => {
    console.log("Profile!");
    try {
      // const response = await axios.get(
      //   "http://localhost:8080/api/product/list",
      //   { withCredentials: true }
      // );
      // const data = await response.data;
      // console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return !profile ? (
    <h1 className="min-h-screen text-center text-3xl mt-40">Loading...</h1>
  ) : (
    <div className="min-h-[50vh] grid grid-cols-4 gap-4 px-14 mt-10">
      <div className="bg-white rounded-md px-2 py-4">
        <div>
          <p>Profile</p>
        </div>
        <div>
          <p>Dashboard</p>
        </div>
      </div>
      <div className="bg-white col-span-3 rounded-md px-2 py-4">
        <h2 className="text-xl">{profile.name}</h2>
        <p className="mt-2">{profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
