import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div>
            <h1>Quick Info</h1>
            <p>
              HybryFoundation is a building on the hedera blockchain, for easy
              an accessible of information about HBAR Transactions. With Hybry
              Explorer you can explore.
            </p>
          </div>
          <ul>
            <li>
              <b>About</b>
            </li>
            <li>
              <Link to="#">About us</Link>
            </li>
            <li>
              <Link to="#">Join HybryFoundation</Link>
            </li>
            <li>
              <Link to="#">Developer Guide</Link>
            </li>
          </ul>
          <ul>
            <li>
              <b>Useful Links</b>
            </li>
            <li>
              <a href="#">Toolskits</a>
            </li>
            <li>
              <a href="#">Info</a>
            </li>
            <li>
              <a
                href="https://docs.hedera.com/guides/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developer Guide
              </a>
            </li>
          </ul>
        </div>
        <p>&copy; Copyright 2022 - HyBry Foundation </p>
      </div>
    </footer>
  );
}

export default Footer;
