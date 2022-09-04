import React from "react";

function Navbar() {
  const [menu, setMenu] = React.useState<boolean>(false);
  const [bg, setBg] = React.useState<string>("");

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.documentElement.scrollTop ||
        document.body.scrollTop > window.innerHeight
      ) {
        setBg("navbg");
      } else {
        setBg("");
      }
    });
  });
  return (
    <div className={`container nav ${bg}`}>
      <nav className="nav__bar">
        <header className="site__title">HyBry</header>
        <button className="menu" onClick={() => setMenu((prev) => !prev)}>
          |||
        </button>
        <ul className={menu ? "active" : ""}>
          <li>Home</li>
          <li>Blocks</li>
          <li>Transactions</li>
          <li>Accounts</li>
          <li>Contracts</li>
          <li>More</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
