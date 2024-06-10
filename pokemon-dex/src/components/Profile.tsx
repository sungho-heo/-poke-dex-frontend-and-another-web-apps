import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// user Profile
const Profile: React.FC = () => {
  const token = useAuth();
  const [fav, setFav] = useState<string[]>([]);

  useEffect(() => {
    const fetchFav = async () => {
      if (token) {
        const response = await fetch("http://localhost:4000/api/fav", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFav(data.fav);
      }
    };
    fetchFav();
  }, [token]);
  if (!token) {
    return <p>Plz Signup</p>;
  }
  return (
    <div>
      <h2>Your Poketmon</h2>
      {fav.length > 0 ? (
        <ul>
          {fav.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>You no Poketmon.</p>
      )}
    </div>
  );
};

export default Profile;
