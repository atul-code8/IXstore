import { useEffect, useState } from "react";
import { account } from "../appwrite/confing";

const Profile = () => {
  const [profile, setProfile] = useState();
  const getUser = async () => {
    try {
      const result = await account.get();
      setProfile(result);  
    } catch (error) {
      console.log("Error:", error)
    }
  };
  useEffect(() => {
    getUser();
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
