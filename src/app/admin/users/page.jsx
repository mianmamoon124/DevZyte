"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import supabase from "../../../superbaseClient"; // Supabase client instance

const ContactUsers = () => {
  const [contactedUsers, setContactedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteWarning, setDeleteWarning] = useState({ show: false, userId: null });

  // Fetch contacted users from Supabase
  const fetchContactedUsers = async () => {
    try {
      const { data, error } = await supabase.from("contactedUsers").select("*");

      if (error) {
        throw error;
      }
      setContactedUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacted users:", error.message);
      setLoading(false);
    }
  };

  // Delete user from Supabase
  const deleteUser = async (userId) => {
    try {
      const { error } = await supabase.from("contactedUsers").delete().eq("id", userId);

      if (error) {
        throw error;
      }

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchContactedUsers();
  }, []);

  // Show delete confirmation popup
  const confirmDelete = (userId) => {
    setDeleteWarning({ show: true, userId });
  };

  // Close delete confirmation popup
  const closeDeleteWarning = () => {
    setDeleteWarning({ show: false, userId: null });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Contacted Users</h2>
      <table className="w-full text-center bg-gray-800 text-white shadow-lg">
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-700">Date of Contact</th>
            <th className="p-4 border-b border-gray-700">Name</th>
            <th className="p-4 border-b border-gray-700">Email</th>
            <th className="p-4 border-b border-gray-700">Number</th>
            <th className="p-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactedUsers.map((user) => (
            <React.Fragment key={user.id}>
              {/* User Info Row */}
              <tr className="border-b border-gray-700">
                {/* Date of Contact */}
                <td className="p-4">{new Date(user.date).toLocaleDateString()}</td>

                {/* Name */}
                <td className="p-4">{user.name}</td>

                {/* Email with icon */}
                <td className="p-4">
                  <a href={`mailto:${user.email}`} className="text-blue-400 hover:underline">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    {user.email}
                  </a>
                </td>

                {/* Phone Number with WhatsApp icon */}
                <td className="p-4 flex">
                  <a
                    href={`https://wa.me/${user.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                    {user.number}
                  </a>
                </td>

                {/* Delete Button */}
                <td className="p-4">
                  <button
                    onClick={() => confirmDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>

              {/* Message Row */}
              <tr className="border-b text-left ml-2 border-gray-700">
                <td colSpan="5" className="p-4 bg-gray-900 text-white">
                  <strong>Message:</strong> {user.message}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Popup */}
      {deleteWarning.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => deleteUser(deleteWarning.userId)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteWarning}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsers;
