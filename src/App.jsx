import { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch (e) {
        console.error("Error parsing localStorage todos", e);
        localStorage.removeItem("todos");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => setTodo(e.target.value);

  const handleSubmit = () => {
    if (!todo.trim()) return;
    if (isEditing) {
      setTodos((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, todo } : item))
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodos((prev) => [...prev, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleComplete = (e) => {
    const id = e.target.name;
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    const selected = todos.find((item) => item.id === id);
    if (selected) {
      setTodo(selected.todo);
      setEditId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-10 min-h-[84vh]">
        <div className="container mx-auto rounded-xl bg-violet-100 p-5 min-h-[75vh]">
          <h1 className="text-2xl font-bold text-center mb-5">iTask - Manage your ToDo List</h1>
          <div className="header">
            <h2 className="text-2xl font-bold">Add a task</h2>
            <div className="flex gap-4 sm:gap-8 items-start sm:items-center my-3 flex-col sm:flex-row">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter a task"
                className="border-2 border-violet-600 rounded-md p-2 outline-violet-800 w-full sm:w-2/3 lg:w-[40vw]"
              />
              <button
                onClick={handleSubmit}
                disabled={!todo.trim()}
                className="bg-violet-800 text-white text-sm p-5 py-2.5 font-bold rounded-md cursor-pointer hover:bg-violet-950 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className="todos mt-10">
            <div className="flex items-center gap-4 mb-3">
              <input
                type="checkbox"
                checked={showFinished}
                onChange={handleShowFinished}
                className="w-4 h-4 cursor-pointer accent-violet-800"
              />
              <span>Show finished tasks</span>
            </div>
            <h2 className="text-2xl font-bold">ToDo List</h2>

            {todos.length === 0 && (
              <div className="text-center text-lg font-bold mt-10">
                No tasks found
              </div>
            )}
            {Array.isArray(todos) &&
              todos.map((item) =>
                showFinished || !item.isCompleted ? (
                  <div
                    key={item.id}
                    className="todo flex my-3 justify-between items-center"
                >
                  <div className="flex items-center gap-4 sm:gap-8 w-full">
                    <input
                      className="w-4 h-4 cursor-pointer accent-violet-800"
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={handleComplete}
                      name={item.id}
                    />

                    <div
                      className={`w-full sm:w-1/2 text-lg ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                    <div className="buttons flex gap-2 sm:gap-4">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="text-violet-800 sm:bg-violet-800 sm:text-white p-3 py-3 text-lg font-bold rounded-md cursor-pointer hover:text-violet-950 transition-all duration-100"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="text-violet-800 sm:bg-violet-800 sm:text-white p-3 py-3 text-lg font-bold rounded-md cursor-pointer hover:text-violet-950 transition-all duration-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  </div>
                ) : null
              )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
