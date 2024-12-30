"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import Header from "@/components/Afternav";
import Table from "@/components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { PiReadCvLogoDuotone } from "react-icons/pi";
import { MdAddToPhotos } from "react-icons/md";
import { format } from 'date-fns'; // Import date-fns for date formatting

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_Url?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  keywords: string[];
  canonicalUrl?: string;
  publishedAt?: Date;
  updatedAt: Date;
}

export default function BlogsPage() {
  const [data, setData] = useState<Blog[]>([]);
  const [filteredData, setFilteredData] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    image_Url: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    keywords: [],
    canonicalUrl: "",
    publishedAt: "",
    updatedAt: "",
  });
  const [image, setImage] = useState<File | null>(null); // State for the selected image
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in your .env.local

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "author", label: "Author" },
    { key: "image_Url", label: "Image", render: (row: Blog) => row.image_Url ? <Image src={row.image_Url} alt={row.title} width={40} height={40} className=" object-cover" /> : null },
    {
      key: "publishedAt", 
      label: "Published At", 
      render: (row: Blog) => row.publishedAt && isValidDate(row.publishedAt) ? format(new Date(row.publishedAt), 'Pp') : 'Invalid Date', 
      width: "20px"
    },
    {
      key: "updatedAt", 
      label: "Updated At", 
      render: (row: Blog) => isValidDate(row.updatedAt) ? format(new Date(row.updatedAt), 'Pp') : 'Invalid Date', 
      width: "20px"
    },
    {
      key: "action",
      label: "Action",
      width:"10px",
      render: (row: Blog) => (
        <div className="flex space-x-2">
            <Link
            href={`/blogs/${row.slug}`}
            className="px-2 py-1 bg-yellow-500 text-white text-xl rounded hover:bg-yellow-600">
             
            <PiReadCvLogoDuotone />
            
          </Link>
          <button
            className="px-2 py-1 bg-blue-500 text-white text-xl rounded hover:bg-blue-600"
            onClick={() => handleEdit(row)}
          >
            <MdEdit />
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white text-xl rounded hover:bg-red-600"
            onClick={() => confirmDelete(row.slug)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];

  const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/blogs", {
        headers: {
          "x-api-key": apiKey || "", // Pass API key in headers
        },
      });

      if (response.ok) {
        const blogData = await response.json();
        setData(blogData.reverse());
        setFilteredData(blogData); // Initialize filteredData
      } else {
        console.error("Failed to fetch blogs:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deleteBlog = async (slug: string, image_Url?: string) => {
    try {
      // Delete the image first if exists
      if (image_Url) {
        const imageName = image_Url.split("/").pop();
        if (imageName) {
          await fetch(`/api/upload/${imageName}`, {
            method: "DELETE",
            headers: {
              "x-api-key": apiKey || "", // Pass API key in headers
            },
          });
        }
      }

      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey || "", // Pass API key in headers
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((blog) => blog.slug !== slug));
        setFilteredData((prevData) =>
          prevData.filter((blog) => blog.slug !== slug)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The blog has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the blog: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the blog.",
      });
      console.error("Error deleting blog:", error);
    }
  };

  const confirmDelete = (slug: string, image_Url?: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug, image_Url);
      }
    });
  };

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setFormValues({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      image_Url: blog.image_Url || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      slug: blog.slug,
      keywords: blog.keywords,
      canonicalUrl: blog.canonicalUrl || "",
      publishedAt: blog.publishedAt ? format(new Date(blog.publishedAt), 'yyyy-MM-dd') : "",
      updatedAt: blog.updatedAt ? format(new Date(blog.updatedAt), 'yyyy-MM-dd') : "",
    });
    setImage(null); // Reset image state when editing a blog
    setIsModalOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.slug.toLowerCase().includes(term) ||
          blog.author.toLowerCase().includes(term)
      )
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Title", "Slug", "Author", "Image URL", "Published At", "Updated At"],
        ...filteredData.map((item) => [
          item.title,
          item.slug,
          item.author,
          item.image_Url,
          item.publishedAt ? format(new Date(item.publishedAt), 'Pp') : 'Invalid Date',
          item.updatedAt ? format(new Date(item.updatedAt), 'Pp') : 'Invalid Date',
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "blogs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        "x-api-key": apiKey || "", // Pass API key in headers
      },
    });
    if (response.ok) {
      const { filePath } = await response.json();
      return filePath;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const addOrUpdateBlog = async () => {
    try {
      let imageUrl = formValues.image_Url;

      // If a new image is uploaded, upload it and get the file path
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const updatedFormValues = { ...formValues, image_Url: imageUrl };

      const url = currentBlog ? `/api/blogs/${currentBlog.slug}` : "/api/blogs";
      const response = await fetch(url, {
        method: currentBlog ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "", // Pass API key in headers
        },
        body: JSON.stringify(updatedFormValues),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: currentBlog ? "Blog Updated!" : "Blog Added!",
          text: "The blog has been successfully saved.",
          timer: 2000,
          timerProgressBar: true,
        });
        fetchData();
        closeModal();
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to save the blog: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while saving the blog.",
      });
      console.error("Error saving blog:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
    setImage(null); // Reset image when closing modal
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header title="Blogs" />
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="border border-gray-400 px-4 py-2 rounded w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCurrentBlog(null);
              setFormValues({
                title: "",
                content: "",
                author: "",
                category: "",
                tags: [],
                image_Url: "",
                metaTitle: "",
                metaDescription: "",
                slug: "",
                keywords: [],
                canonicalUrl: "",
                publishedAt: "",
                updatedAt: "",
              });
              setImage(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-2xl"
          >
           <MdAddToPhotos />
          </button>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-2xl"
          >
            <TiExport />
          </button>
        </div>
      </div>

      <Table columns={columns} data={filteredData} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl h-5/6 m-3 overflow-auto">
            <h2 className="text-xl  font-bold mb-4">{currentBlog ? "Edit Blog" : "Add Blog"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addOrUpdateBlog();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={formValues.content}
                  onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={formValues.author}
                  onChange={(e) => setFormValues({ ...formValues, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={formValues.category}
                  onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  value={formValues.tags.join(",")}
                  onChange={(e) => setFormValues({ ...formValues, tags: e.target.value.split(",") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={formValues.slug}
                  onChange={(e) => setFormValues({ ...formValues, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      const file = e.target.files[0];

                      // Validate file size (max 400KB)
                      if (file.size > 400 * 1024) {
                        Swal.fire({
                          icon: "error",
                          title: "File Too Large",
                          text: "The selected file must be less than 400KB.",
                          confirmButtonText: "Okay",
                          confirmButtonColor: '#3085d6',
                        });
                        e.target.value = ""; // Reset the input field
                        return;
                      }

                      setImage(file); // Handle selected file
                    }
                  }}
                  className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...(currentBlog ? {} : { required: true })}
                />

                {/* Conditionally show the current file preview in edit mode */}
                {currentBlog && currentBlog.image_Url && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Current file:</p>
                    <Image
                      src={currentBlog.image_Url}
                      alt="Current Blog"
                      height={128}
                      width={128}
                      className=" object-cover border"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  value={formValues.metaTitle}
                  onChange={(e) => setFormValues({ ...formValues, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={formValues.metaDescription}
                  onChange={(e) => setFormValues({ ...formValues, metaDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <input
                  type="text"
                  value={formValues.keywords ? formValues.keywords.join(",") : ""}
                  onChange={(e) => setFormValues({ ...formValues, keywords: e.target.value.split(",") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Canonical URL</label>
                <input
                  type="text"
                  value={formValues.canonicalUrl}
                  onChange={(e) => setFormValues({ ...formValues, canonicalUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Published At</label>
                <input
                  type="date"
                  value={formValues.publishedAt}
                  onChange={(e) => setFormValues({ ...formValues, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {currentBlog ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
