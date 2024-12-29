"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import Header from "@/components/Afternav";
import Table from "@/components/Table";
import { MdDeleteForever } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { format } from 'date-fns'; // Import date-fns for date formatting
interface Comment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  blogTitle: string;
  message: string;
  createdAt: string;
}

export default function CommentsPage() {
  const [data, setData] = useState<Comment[]>([]);
  const [filteredData, setFilteredData] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "name", label: "Name" , width:"20px" },
    { key: "email", label: "Email", width:"20px" },
    { key: "phone", label: "Contact" , width:"10px" },
    { key: "blogTitle", label: "Title" , width:"20px" },
    { key: "message", label: "Comment" },
    { key: "createdAt", label: "Date", width:"10px", render: (row: Comment) => format(new Date(row.createdAt), 'Pp') }, // Format date using date-fns
    {
      key: "action",
      label: "Action",
      width:"5px",
      render: (row: Comment) => (
        <button
          className="px-2 py-1 bg-red-500 text-white text-xl rounded hover:bg-red-600"
          onClick={() => confirmDelete(row._id)}
        >
          <MdDeleteForever />
        </button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch("/api/comments", {
        headers: {
          "x-api-key": apiKey || "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data.reverse());
        setFilteredData(data); // Initialize filteredData
      } else {
        console.error("Failed to fetch comments:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const deleteComment = async (_id: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(`/api/comments/${_id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey || "",
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((comment) => comment._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((comment) => comment._id !== _id)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The comment has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the comment: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the comment.",
      });
      console.error("Error deleting comment:", error);
    }
  };

  const confirmDelete = (_id: string) => {
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
        deleteComment(_id);
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (comment) =>
          comment.name.toLowerCase().includes(term) ||
          comment.email.toLowerCase().includes(term) ||
          comment.blogTitle.toLowerCase().includes(term) ||
          comment.message.toLowerCase().includes(term)
      )
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Name", "Email", "Contact", "Title", "Comment", "Date"], // Headers
      ...data.map((comment) => [
        comment.name,
        comment.email,
        comment.phone,
        comment.blogTitle,
        comment.message,
        format(new Date(comment.createdAt), 'Pp'), // Format date using date-fns
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comments_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header title="Comments" />
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
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-2xl"
        >
         <TiExport />
        </button>
      </div>
      <Table columns={columns} data={filteredData} />
    </Layout>
  );
}
