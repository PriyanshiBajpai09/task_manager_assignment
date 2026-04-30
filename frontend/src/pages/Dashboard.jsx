import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // custom dropdown states
  const [open, setOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");

  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    if (role === "admin") {
      const res = await API.get("/users");
      setUsers(res.data);
    }
  };

  const createTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      assignedTo,
    });

    setTitle("");
    setAssignedTo("");
    setSelectedUserName("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // 🔥 SAVE EDIT
  const handleEditSave = async () => {
    if (!editTitle) return;

    await API.put(`/tasks/edit/${editTaskId}`, {
      title: editTitle,
    });

    setEditOpen(false);
    setEditTitle("");
    fetchTasks();
  };

  useEffect(() => {
    const init = async () => {
      await fetchTasks();
      await fetchUsers();
    };

    init();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark1 to-dark4 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      {role === "admin" && (
        <div className="flex gap-3 mb-6 items-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="p-3 rounded-lg bg-white/10 outline-none backdrop-blur-md"
          />

          <div className="relative w-[200px]">
            <div
              onClick={() => setOpen(!open)}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-lg 
              border border-white/20 text-white cursor-pointer 
              hover:border-primary transition duration-300"
            >
              {selectedUserName || "Assign user"}
            </div>

            {open && (
              <div className="absolute mt-2 w-full bg-dark3 rounded-xl shadow-lg z-10 border border-white/10">
                {users.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => {
                      setAssignedTo(u._id);
                      setSelectedUserName(u.name);
                      setOpen(false);
                    }}
                    className="p-3 hover:bg-white/10 cursor-pointer transition"
                  >
                    {u.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={createTask}
            className="bg-primary px-5 rounded-lg hover:bg-[#168777] transition"
          >
            Add
          </button>
        </div>
      )}

      {/* Columns */}
      <div className="grid grid-cols-3 gap-6">
        {["todo", "in-progress", "done"].map((status) => (
          <div key={status} className="bg-white/5 p-4 rounded-xl backdrop-blur-lg">
            <h2 className="font-bold mb-4 capitalize">{status}</h2>

            {tasks
              .filter((t) => t.status === status)
              .map((t) => (
                <div
                  key={t._id}
                  className="bg-white/5 backdrop-blur-lg p-3 mb-3 rounded-xl 
                  border border-white/5 shadow-lg 
                  hover:scale-[1.02] hover:shadow-xl transition duration-300"
                >
                  <p className="font-medium">{t.title}</p>

                  {t.assignedTo && (
                    <p className="text-xs text-gray-300 mt-1">
                      Assigned to: {t.assignedTo?.name || "Unassigned"}
                    </p>
                  )}

                  {/* EDIT + DELETE */}
                  {role === "admin" && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          setEditTaskId(t._id);
                          setEditTitle(t.title);
                          setEditOpen(true);
                        }}
                        className="px-3 py-1 text-xs rounded-lg 
                        bg-white/10 border border-white/20 text-blue-300 
                        hover:bg-blue-500/20 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("Delete this task?")) {
                            API.delete(`/tasks/${t._id}`).then(fetchTasks);
                          }
                        }}
                        className="px-3 py-1 text-xs rounded-lg 
                        bg-white/10 border border-white/20 text-red-300 
                        hover:bg-red-500/20 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* STATUS */}
                  {status === "todo" && (
                    <button
                      onClick={() => updateStatus(t._id, "in-progress")}
                      className="mt-3 px-3 py-1 text-xs rounded-lg 
                      bg-white/10 border border-white/20 text-yellow-300 
                      hover:bg-yellow-500/20 transition"
                    >
                      Move → In Progress
                    </button>
                  )}

                  {status === "in-progress" && (
                    <button
                      onClick={() => updateStatus(t._id, "done")}
                      className="mt-3 px-3 py-1 text-xs rounded-lg 
                      bg-white/10 border border-white/20 text-green-300 
                      hover:bg-green-500/20 transition"
                    >
                      Move → Done
                    </button>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* 🔥 EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark3 p-6 rounded-2xl w-[350px] shadow-xl">
            <h2 className="text-white text-xl mb-4 font-semibold">
              Edit Task
            </h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white outline-none mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 rounded bg-gray-500 hover:opacity-80"
              >
                Cancel
              </button>

              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded bg-primary hover:bg-[#168777]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}