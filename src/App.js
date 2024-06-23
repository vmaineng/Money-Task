import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.log(error);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTodo, is_completed: false }]);
  };

  const updateTodo = async () => {};

  const toggleTodo = async () => {};

  const deleteTodo = async () => {};

  return <div>App</div>;
}
