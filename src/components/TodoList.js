import React from "react";

function TodoList({
  todos,
  editingId,
  setEditingId,
  editingText,
  setEditingText,
  updateTodo,
  toggleTodo,
  deleteTodo,
}) {
  return (
    <div>
      TodoList
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ marginBottom: "1rem", textAlign: "center" }}
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => updateTodo(todo.id)}
              />
            ) : (
              <div style={{ marginTop: "10px" }}>
                <span
                  style={{
                    textDecoration: todo.is_completed ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <div style={{ marginLeft: "1rem" }}>
                  <button
                    onClick={() => toggleTodo(todo.id, todo.is_completed)}
                  >
                    {" "}
                    Toggle
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
