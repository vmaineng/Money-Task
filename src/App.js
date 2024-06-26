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

  const fetchTodos = async () => {
    try {
      const { data } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });
      setTodos(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addTodo = async () => {
    try {
      const { data } = await supabase
        .from("todos")
        .insert([{ task: newTodo, is_completed: false }])
        .select();
      setTodos([...todos, data[0]]);
      setNewTodo("");
    } catch (e) {
      console.error(e);
    }
  };

  const updateTodo = async () => {
    try {
      await supabase
        .from("todos")
        .update({ task: editingText })
        .eq("id", editingId);
      setEditingId(null);
      setEditingText("");
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTodo = async (id, is_completed) => {
    try {
      await supabase
        .from("todos")
        .update({ is_completed: !is_completed })
        .eq("id", id);
      fetchTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
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
