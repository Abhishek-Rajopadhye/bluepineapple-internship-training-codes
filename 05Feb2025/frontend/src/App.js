import { useState } from "react";
import { Books } from "./Books";
import { Members } from "./Members";

export default function App() {
  const [tab, setTab] = useState("books");
  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button className={`px-4 py-2 ${tab === "books" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("books")}>
          Books
        </button>
        <button className={`px-4 py-2 ${tab === "members" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("members")}>
          Members
        </button>
      </div>
      {tab === "books" ? <Books /> : <Members />}
    </div>
  );
}
