"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../superbaseClient"; // Import your Supabase client instance

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs data from Supabase
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch data from the `blogs` table in Supabase
        const { data, error } = await supabase
          .from("blogs")
          .select("id, content, main_img_url, created_at, updated_at");

        if (error) {
          console.error("Error fetching blogs:", error);
        } else {
          // Assuming content is JSON, you might want to extract specific fields
          const formattedBlogs = data.map((blog) => ({
            id: blog.id,
            main_img_url: blog.main_img_url,
            title: blog.content.title, // Assuming content JSON has a title field
            description: blog.content.description, // Assuming content JSON has a description field
          }));
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to limit words in the description
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-10 py-10 space-y-10">
      {/* Blog Section Heading */}
      <h2 className="text-secondary font-bold text-left text-[25px] lg:text-[40px] mb-8">
        Our Blogs
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Blog Image */}
            <div className="w-full h-56 overflow-hidden">
              <img
                src={blog.main_img_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600">
                {truncateText(blog.description, 50)}
              </p>

              {/* Link to detailed blog page */}
              <Link href={`/blogs/${blog.id}`}>
                <a className="text-secondary font-semibold hover:underline">
                  Read More
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
