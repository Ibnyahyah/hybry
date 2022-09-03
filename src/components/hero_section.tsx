import React from "react";

function HeroSection() {
  return (
    <div className="container">
      <div className="row">
        <div className="header">
          <h2>
            <span>Hedera</span> Explore
          </h2>
          <form action="">
            <input type="text" placeholder="Seacrh" />
            <button>Seacrh</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
