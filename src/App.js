import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * Fetches todos from the "todos" table in the supabase database and updates the state with the fetched data.
   *
   * @return {Promise<void>} - Resolves when the todos are successfully fetched and the state is updated.
   *                          Rejects with an error if there was an issue fetching the todos.
   */
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.log("Error fetching todos:", error);
    } else {
      setTodos(data);
    }
  };

  /**
   * Asynchronously adds a new todo to the database and updates the state with the new todo.
   *
   * @return {Promise<void>} - Resolves when the todo is successfully added and the state is updated.
   *                          Rejects with an error if there was an issue adding the todo.
   */
  const addTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTodo, is_completed: false }])
      .select();
    if (error) {
      console.log("Error adding todo:", error);
    } else if (Array.isArray(data)) {
      setTodos((prevTodos) => [...prevTodos, ...data]);
      setNewTodo("");
    }
  };

  /**
   * Updates a todo in the "todos" table in the supabase database.
   *
   * @param {string} id - The ID of the todo to update.
   * @return {Promise<void>} - Resolves when the todo is successfully updated.
   *                          Rejects with an error if there was an issue updating the todo.
   */
  const updateTodo = async (id) => {
    const { error } = await supabase
      .from("todos")
      .update({ task: editingText })
      .eq("id", id);
    if (error) {
      console.log("Error updating todo:", error);
    } else {
      fetchTodos();
      setEditingId(null);
      setEditingText("");
    }
  };

  const toggleTodo = async (id, is_completed) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_completed: !is_completed })
      .eq("id", id);
    if (error) {
      console.log("Error toggling todo:", error);
    } else {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.log("Error deleting todo:", error);
    } else {
      fetchTodos();
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList
        todos={todos}
        editingId={editingId}
        setEditingId={setEditingId}
        editingText={editingText}
        setEditingText={setEditingText}
        updateTodo={updateTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
