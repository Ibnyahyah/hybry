import React from "react";
import { Link, useLocation } from "react-router-dom";
import HYBRYLOGO from "../assets/hybry-foundation-04.png";
import MENUICON from "../assets/icons/menu_icon.png";
import CLOSEICON from "../assets/icons/close_icon.png";

function Navbar() {
  const location = useLocation();
  const path = location.pathname.split("/#/")[0];
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
  }, [bg, setBg]);

  React.useEffect(() => {
    setMenu(false);
  }, [path]);

  return (
    <div className={`container nav ${bg}`}>
      <nav className="nav__bar">
        <Link to="/">
          <header className="site__title">
            <img src={HYBRYLOGO} alt="" />
          </header>
        </Link>
        <button
          className="menu"
          onClick={() => setMenu((prev) => !prev)}
          title="open menus"
        >
          <img src={menu ? CLOSEICON : MENUICON} alt="" />
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
