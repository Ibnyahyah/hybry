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
          <p style={Styles}>Supporting and Building Foundations on HBAR.</p>
          <Seacrh placeholder="Search for accounts, blocks, transactions" />
        </div>
      </div>
    </div>
  );
}

const Styles = {
  marginTop: "10px",
};

export default HeroSection;
