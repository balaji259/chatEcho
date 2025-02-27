/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [search, setSearch] = useState<any>("");

  useEffect(() => {
    fetch("https://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-gray-800 text-white p-4 flex flex-col">
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-2 py-2 rounded bg-gray-700 focus:outline-none"
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 cursor-pointer rounded mb-2 transition ${
                  selectedUser?.id === user.id
                    ? "bg-gray-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {user.name}
              </div>
            ))}
        </div>
      </div>

      <div
        className={`w-full md:w-2/3 bg-gray-100 flex flex-col ${
          selectedUser ? "block" : "hidden md:flex"
        }`}
      >
        {selectedUser ? (
          <>
            <div className="bg-gray-200 p-4 text-lg font-bold border-b">
              Chat with {selectedUser?.name}
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              Chat messages here...
            </div>
            <div className="p-4 border-t bg-white flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-l focus:outline-none"
              />
              <button className="px-4 bg-blue-500 text-white rounded-r">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Start chatting!
          </div>
        )}
      </div>
    </div>
  );
}
