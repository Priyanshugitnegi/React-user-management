import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(res.data);
      } catch (error) {
        alert("Failed to load user details!");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Show spinner while loading
  if (loading) return <Spinner />;

  // Handle missing user
  if (!user) return <p style={{ textAlign: "center", marginTop: "2rem" }}>User not found</p>;

  return (
    <div className="container">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p><strong>Address:</strong> {user.address?.suite}, {user.address?.street}, {user.address?.city}</p>

      <Link to="/">
        <button
          style={{
            backgroundColor: "#0077b6",
            color: "white",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "5px",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default UserDetails;
