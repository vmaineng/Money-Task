import React from "react";

function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: "5px 30px",
      }}
    >
      <h1>Todo app</h1>
      <img src="" alt="" className="logo" />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default Navbar;
