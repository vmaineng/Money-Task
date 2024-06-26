import { supabase } from "./supabaseClient";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error(
//     "SUPABASE_URL and SUPABASE_API_KEY must be defined in environment variables."
//   );
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.get("/todos", async (req, res) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.log("Error fetching todos:", error);
  } else {
    res.json(data);
  }
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, is_completed: false }])
    .select();
  if (error) {
    console.log("Error adding todo:", error);
  } else {
    res.json(data);
  }
});

app.patch("/todos", async (req, res) => {
  const { id, task, is_completed } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update({ task, is_completed })
    .eq("id", id)
    .select();
  if (error) {
    console.log("Error updating todo:", error);
  } else {
    res.json(data);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.log("Error deleting todo:", error);
  } else {
    res.json(data);
  }
});
