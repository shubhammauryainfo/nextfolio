"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import Header from "@/components/Afternav";
import Table from "@/components/Table";
import { MdDeleteForever } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { format } from 'date-fns';
interface Feedback {
  _id: string;
  name: string; // Name of the person providing feedback
  phone: string; // Phone number of the person
  email: string; // Email address of the person
  subject: string; // Subject of the feedback
  message: string; // The feedback content/message
  createdAt: string; // Timestamp for when the feedback was created
  updatedAt: string; // Timestamp for when the feedback was updated
}

export default function FeedbacksPage() {
  const [data, setData] = useState<Feedback[]>([]);
  const [filteredData, setFilteredData] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message"},
    { key: "createdAt", label: "Date", render: (row: Feedback) => format(new Date(row.createdAt), 'Pp') },
    {
      key: "action",
      label: "Action",
      render: (row: Feedback) => (
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
      const response = await fetch("/api/feedbacks", {
        headers: {
          "x-api-key": apiKey || "",
        },
      });

      if (response.ok) {
        const feedbackData = await response.json();
        setData(feedbackData.reverse());
        setFilteredData(feedbackData); // Initialize filteredData
      } else {
        console.error("Failed to fetch feedbacks:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const deleteFeedback = async (_id: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(`/api/feedbacks/${_id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey || "",
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((feedback) => feedback._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((feedback) => feedback._id !== _id)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The feedback has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the feedback: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the feedback.",
      });
      console.error("Error deleting feedback:", error);
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
        deleteFeedback(_id);
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(term) ||
          feedback.email.toLowerCase().includes(term) ||
          feedback.subject.toLowerCase().includes(term) ||
          feedback.message.toLowerCase().includes(term)
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
        ["Name", "Email", "Phone", "Subject", "Message", "Created At"],
        ...filteredData.map((item) => [
          item.name,
          item.email,
          item.phone,
          item.subject,
          item.message,
          format(new Date(item.createdAt), 'Pp'),
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedbacks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header title="Feedbacks" />
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
          onClick={exportData}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-2xl"
        >
         <TiExport />
        </button>
      </div>
      <Table columns={columns} data={filteredData} />
    </Layout>
  );
}
