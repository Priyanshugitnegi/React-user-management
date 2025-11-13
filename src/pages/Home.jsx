import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Spinner from "../components/Spinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch (error) {
      alert("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async (user) => {
    setLoading(true);
    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", user);
      setUsers([res.data, ...users]);
    } catch (error) {
      alert("Error adding user!");
    } finally {
      setLoading(false);
    }
  };

  // Update existing user
  const updateUser = async (updatedUser) => {
    setLoading(true);
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setEditUser(null);
    } catch (error) {
      alert("Error updating user!");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      alert("Error deleting user!");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner
  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>User Management</h2>
      <UserForm onSubmit={editUser ? updateUser : addUser} editUser={editUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={deleteUser} />
    </div>
  );
};

export default Home;
