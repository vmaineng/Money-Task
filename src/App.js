import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const addTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTodo, is_completed: false }])
      .select();
    if (error) {
      console.log("Error adding todo:", error);
    } else {
      setTodos((prevTodos) => [...prevTodos, ...data]);
      setNewTodo("");
    }
  };

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

  return <div>App</div>;
}
