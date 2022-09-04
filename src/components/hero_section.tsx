import React from "react";
import Seacrh from "./seacrh";

function HeroSection() {
  return (
    <div className="container">
      <div className="row">
        <div className="header">
          <h2>
            <span>Hedera</span> Explore
          </h2>
          <Seacrh placeholder="Search for accounts, blocks, transactions" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
