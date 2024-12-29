"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import supabase from "../../../superbaseClient"; // Import supabase client

const ServicesAdmin = () => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    img: "", // Image URL will be entered here
  });
  const [loading, setLoading] = useState(false); // For loading spinner
  const [services, setServices] = useState([]); // Hold the list of services
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(""); // Success message state
  const router = useRouter(); // Initialize the router

  // Fetch services from Supabase
  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        throw new Error(error.message);
      }
      setServices(data); // Set services data to state
    } catch (error) {
      setError("Error fetching services: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchServices(); // Fetch services on component mount
  }, []);

  // Validate image URL
  const validateImageUrl = (url) => {
    const pattern = /\.(jpeg|jpg|png|gif|svg)$/i;
    return pattern.test(url) ? url : "/default-placeholder.png"; // Fallback image
  };

  // Handle adding new service
  const handleAddService = async () => {
    if (!newService.name || !newService.description || !newService.img) {
      setError("Please fill in all fields and provide an image URL.");
      return;
    }

    setLoading(true); // Set loading to true
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset any previous success messages

    try {
      const validatedImage = validateImageUrl(newService.img); // Validate image URL

      // Insert new service into the 'services' table with the validated image URL
      const { error } = await supabase.from("services").insert([
        {
          name: newService.name,
          description: newService.description,
          img: validatedImage, // Use validated image
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setSuccess("Service added successfully!");
      fetchServices(); // Reload the services after adding
      setNewService({ name: "", description: "", img: "" }); // Clear form
    } catch (error) {
      setError("Error adding service: " + error.message);
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  // Handle deleting service
  const handleDeleteService = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      setLoading(true); // Set loading to true while deleting
      try {
        // Delete service from the 'services' table
        const { error } = await supabase.from("services").delete().eq("id", id);

        if (error) {
          throw new Error(error.message);
        }

        fetchServices(); // Reload the services after deleting
        setSuccess("Service deleted successfully!");
      } catch (error) {
        setError("Error deleting service: " + error.message);
      } finally {
        setLoading(false); // Reset loading state after operation
      }
    }
  };

  // Navigate to edit page for the selected service
  const handleEditService = (id) => {
    router.push(`admin/edit-service/${id}`); // Navigate to edit-service/[id]
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      {/* Service Addition Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newService.img}
          onChange={(e) => setNewService({ ...newService, img: e.target.value })}
          className="px-4 py-2 rounded bg-gray-700 mb-2 w-full"
        />
        <button
          onClick={handleAddService}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </div>

      {/* Services List */}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p>{service.description}</p>
              <img
                src={validateImageUrl(service.img)} // Validate service image
                alt={service.name}
                className="w-32 h-32 object-cover mt-2"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditService(service.id)} // Edit button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesAdmin;
