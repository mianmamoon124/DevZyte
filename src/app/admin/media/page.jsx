"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import supabase from "../../../superbaseClient";

const Media = ({ onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [svgs, setSvgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  // Fetch images from Supabase Storage (images and svgs folders)
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch images from "images" folder
      const { data: imageData, error: imageError } = await supabase
        .storage
        .from("Assets")
        .list("images/", { limit: 100 });

      if (imageError) throw new Error(imageError.message);

      // Fetch svgs from "svgs" folder
      const { data: svgData, error: svgError } = await supabase
        .storage
        .from("Assets")
        .list("svgs/", { limit: 100 });

      if (svgError) throw new Error(svgError.message);

      // Generate public URLs for images
      const imagesWithUrls = await Promise.all(
        imageData.map(async (image) => {
          const imagePath = `images/${image.name}`;
          const { data, error } = supabase.storage
            .from("Assets")
            .getPublicUrl(imagePath);

          if (error) {
            console.error(`Error generating URL for ${imagePath}:`, error);
            return { ...image, url: null, error: error.message };
          }

          return { ...image, url: data.publicUrl };
        })
      );

      // Generate public URLs for SVGs
      const svgsWithUrls = await Promise.all(
        svgData.map(async (svg) => {
          const svgPath = `svgs/${svg.name}`;
          const { data, error } = supabase.storage
            .from("Assets")
            .getPublicUrl(svgPath);

          if (error) {
            console.error(`Error generating URL for ${svgPath}:`, error);
            return { ...svg, url: null, error: error.message };
          }

          return { ...svg, url: data.publicUrl };
        })
      );

      setImages(imagesWithUrls);
      setSvgs(svgsWithUrls);
    } catch (err) {
      setError("Error fetching images: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchImages on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();
    const filePath = fileExt === "svg" || fileExt === "json" 
      ? `svgs/${file.name}` 
      : `images/${file.name}`;

    try {
      setLoading(true);
      const { error } = await supabase.storage.from("Assets").upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }

      // Refresh image list after successful upload
      await fetchImages();
      alert("Upload successful!");
    } catch (err) {
      setError("Error uploading file: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch((err) => {
      console.error("Error copying to clipboard:", err);
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Media</h2>

      {/* Upload File Input */}
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Upload Media
        </button>
      </div>

      {loading && <p>Loading images...</p>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display images */}
      <h3 className="text-lg font-semibold mb-2">Images</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.length === 0 ? (
          <p>No images available</p>
        ) : (
          images.map((image) => (
            <div key={image.name} className="cursor-pointer">
              <Image
                src={image.url || "/default-placeholder.png"}
                alt={image.name}
                className="w-24 h-24 object-cover"
                onClick={() => onSelectImage(image.url)}
              />
              <p className="text-center">{image.name}</p>
              <button
                onClick={() => copyToClipboard(image.url)}
                className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
              >
                Copy Link
              </button>
            </div>
          ))
        )}
      </div>

      {/* Display SVGs in table form */}
      <h3 className="text-lg font-semibold mb-2">SVGs & JSON Files</h3>
      {svgs.length === 0 ? (
        <p>No SVGs available</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">URL</th>
            </tr>
          </thead>
          <tbody>
            {svgs.map((svg) => (
              <tr key={svg.name}>
                <td className="border p-2">{svg.name}</td>
                <td className="border p-2">
                  {new Date(svg.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2 text-blue-500">
                  <a href={svg.url} target="_blank" rel="noopener noreferrer">
                    Open File
                  </a>
                  <button
                    onClick={() => copyToClipboard(svg.url)}
                    className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                  >
                    Copy Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Media;
