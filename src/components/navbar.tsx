import React from "react";

function Navbar() {
  return (
    <div className="container">
      <nav className="nav__bar">
        <header className="site__title">HyBry</header>
        <ul>
          <li>Home</li>
          <li>Node</li>
          <li>Tokens</li>
          <li>More</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
