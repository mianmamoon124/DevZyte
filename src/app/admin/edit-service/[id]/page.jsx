// pages/edit-service/[id]/index.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Correct import for Next.js 13+ dynamic params
import supabase from "../../../../superbaseClient"; // Your supabase client

const EditServicePage = () => {
  const { id } = useParams(); // Get the id from the URL params
  const [service, setService] = useState(null); // Store the service to be edited
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling
  const [updatedService, setUpdatedService] = useState({
    name: "",
    description: "",
    img: "",
  }); // Updated service state for editing

  const router = useRouter(); // To navigate after saving

  // Fetch service by id from supabase
  useEffect(() => {
    if (!id) return; // If no id, do nothing
    const fetchService = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("id", id)
          .single(); // Fetch single service by id
        if (error) throw new Error(error.message);
        setService(data);
        setUpdatedService({ name: data.name, description: data.description, img: data.img });
      } catch (error) {
        setError("Error fetching service: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService({ ...updatedService, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(""); // Reset any errors
    try {
      // Update the service in the database
      const { error } = await supabase
        .from("services")
        .update([
          {
            name: updatedService.name,
            description: updatedService.description,
            img: updatedService.img,
          },
        ])
        .eq("id", id);

      if (error) throw new Error(error.message);
      // Redirect to the services list after successful save
      router.push("/admin"); // Redirect back to services list
    } catch (error) {
      setError("Error updating service: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>

      {/* Service Edit Form */}
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={updatedService.name}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={updatedService.description}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={updatedService.img}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditServicePage;
