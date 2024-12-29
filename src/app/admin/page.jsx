"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../superbaseClient"; // Import Supabase client
import Media from "./media/page"; // Import Media component
import ServicesAdmin from "./services/page";
import ContactUsers from "./users/page"; // Import ContactUsers component
import BlogAdmin from "./blogs/page"; // Import BlogAdmin component for managing blogs

const AdminLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState("services");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          return; // Exit if there is an error
        }

        const session = data?.session; // Use optional chaining to safely access 'session'

        if (!session) {
          // If no session (user not logged in), redirect to login page
          router.push("/adminLogin");
        } else {
          // If user is logged in, proceed with the application logic
          setLoading(false); // Session is valid, proceed to load services and other content
        }
      } catch (error) {
        console.error("Error in checkSession:", error.message);
        setLoading(false);
      }
    };

    checkSession(); // Call the function to check session
  }, [router]);

  // Handle section click (e.g., Services, Media, Users, or Blogs)
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 space-y-4 fixed h-full top-0 left-0">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleSectionClick("services")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === "services" ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick("media")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === "media" ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              Media
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick("users")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === "users" ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              Users
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick("blogs")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === "blogs" ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              Blogs
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        {activeSection === "services" && (
          <div>
            <ServicesAdmin />
          </div>
        )}

        {activeSection === "media" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Media</h2>
            <Media onSelectImage={(imageUrl) => console.log("Selected Image:", imageUrl)} />
          </div>
        )}

        {activeSection === "users" && (
          <div>
            <ContactUsers />
          </div>
        )}

        {activeSection === "blogs" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
            <BlogAdmin />
          </div>
        )}

        {/* Render children components like 'Edit Service' */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
