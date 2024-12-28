"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import Header from "@/components/Afternav";
import Table from "@/components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { IoMdPersonAdd } from "react-icons/io";
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in your .env.local

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Created At" },
    {
      key: "action",
      label: "Action",
      render: (row: User) => (
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white text-xl rounded hover:bg-blue-600"
            onClick={() => handleEdit(row)}
          >
            <MdEdit />
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white text-xl rounded hover:bg-red-600"
            onClick={() => confirmDelete(row._id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users", {
        headers: {
          "x-api-key": apiKey || "", // Pass API key in headers
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setData(userData.reverse());
        setFilteredData(userData); // Initialize filteredData
      } else {
        console.error("Failed to fetch users:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (_id: string) => {
    try {
      const response = await fetch(`/api/users/${_id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey || "", // Pass API key in headers
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((user) => user._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((user) => user._id !== _id)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The user has been deleted successfully.",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to delete the user: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while deleting the user.",
      });
      console.error("Error deleting user:", error);
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
        deleteUser(_id);
      }
    });
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormValues({
      name: user.name,
      email: user.email,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
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
        ["Name", "Email", "Created At"],
        ...filteredData.map((item) => [
          item.name,
          item.email,
          item.createdAt,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addOrUpdateUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: currentUser ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "", // Pass API key in headers
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: currentUser ? "User Updated!" : "User Added!",
          text: "The user has been successfully saved.",
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
          text: `Failed to save the user: ${errorText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while saving the user.",
      });
      console.error("Error saving user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header title="Users" />
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
              setCurrentUser(null);
              setFormValues({ name: "", email: "", password: "" });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-2xl"
          >
           <IoMdPersonAdd/>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">{currentUser ? "Edit User" : "Add User"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addOrUpdateUser();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {currentUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
