import React from "react";
import { Link } from "react-router-dom";

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
        <Link to="/">
          <header className="site__title">HyBryFoundation</header>
        </Link>
        <button className="menu" onClick={() => setMenu((prev) => !prev)}>
          |||
        </button>
        <ul className={menu ? "active" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blocks">Blocks</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/contracts">Contracts</Link>
          </li>
          <li>
            <Link to="#">More</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
