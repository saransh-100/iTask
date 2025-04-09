import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (!todo.trim()) return;
    if (isEditing) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        todo,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
    }
    setTodo("");
  };

  const handleComplete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    const selected = todos.find((item) => item.id === id);
    if (!selected) return;
    setTodo(selected.todo);
    setEditId(id);
    setIsEditing(true);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <main className="py-10 min-h-[84vh]">
        <div className="container mx-auto rounded-xl bg-violet-200 p-5 min-h-[75vh]">
          <div className="header">
            <h2 className="text-2xl font-bold">Add a task</h2>
            <div className="flex gap-8 items-center my-3">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter a task"
                className="border-2 border-violet-800 rounded-md p-2 outline-none w-2/3 lg:w-[40vw]"
              />
              <button
                onClick={handleSubmit}
                className="bg-violet-800 text-white text-sm p-5 py-2.5 font-bold rounded-md cursor-pointer hover:bg-violet-950 transition-all duration-100"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className="todos mt-10">
            <h2 className="text-2xl font-bold">ToDo List</h2>
            {todos.length === 0 && (
              <div className="text-center text-lg font-bold mt-10">
                No tasks found
              </div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex my-3 justify-between items-center"
                >
                  <div className="flex items-center gap-8 w-full">
                    <input
                      className="w-4 h-4 cursor-pointer accent-violet-800"
                      type="checkbox"
                      value={item.isCompleted}
                      onChange={handleComplete}
                      name={item.id}
                      id=""
                    />
                    <div
                      className={`w-1/2 text-lg ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                    <div className="buttons flex gap-4">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-800 text-white p-2 py-1 text-sm font-bold rounded-md cursor-pointer hover:bg-violet-950 transition-all duration-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-violet-800 text-white p-2 py-1 font-bold text-sm rounded-md cursor-pointer hover:bg-violet-950 transition-all duration-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
