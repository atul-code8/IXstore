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
    <h1 className="min-h-screen text-center text-3xl mt-10">Loading...</h1>
  ) : (
    <div className="min-h-screen px-14 mt-10">
      <h2 className="text-xl">{profile.name}</h2>
      <p className="mt-2">{profile.email}</p>
    </div>
  );
};

export default Profile;
