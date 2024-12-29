import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import supabase from "../../../superbaseClient"; // Make sure this import path is correct

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(""); // Store the blog content (HTML)
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true); // Show loading state during image upload
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("Assets/images") // Adjust the bucket name as needed
        .upload(fileName, file);

      if (error) {
        setIsError(true);
        setErrorMessage("Error uploading image: " + error.message);
        setIsLoading(false);
        return;
      }

      const imageUrl = supabase.storage
        .from("Assets/images")
        .getPublicUrl(data.path).data.publicUrl;
      setImage(imageUrl);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error uploading image: " + error.message);
    }
    setIsLoading(false); // Hide loading state after image upload
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false); // Reset error state
    setErrorMessage(""); // Reset error message

    try {
      const blogData = {
        content: {
          title,
          description,
          body: content,
        },
        main_img_url: image,
      };

      const { error } = await supabase.from("blogs").insert([blogData]);

      if (error) {
        setIsError(true);
        setErrorMessage("Error creating blog: " + error.message);
        setIsLoading(false);
        return;
      }

      setTitle("");
      setDescription("");
      setContent("");
      setImage(null);
      alert("Blog created successfully!");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error creating blog: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      <div className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black px-3 py-2 border rounded"
            placeholder="Enter blog title"
          />
        </div>

        {/* Blog Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-black border rounded"
            placeholder="Enter a short description"
          />
        </div>

        {/* Blog Content (Using TinyMCE for rich-text editing) */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <Editor
            apiKey="1rjdcf8c4wmkluzr97pvht6j94rgknnxgmxwlnkybl5p1rng" // Make sure to replace with your actual API key
            value={content}
            onEditorChange={(newValue) => setContent(newValue)}
            init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat"
              }}
              
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Main Image</label>
          <input type="file" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded" className="mt-4 w-48" />}
        </div>

        {/* Error Message Display */}
        {isError && (
          <div className="text-red-500 mt-4">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </div>
    </div>
  );
};

export default BlogAdmin;
