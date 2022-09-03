import React from "react";
import HeroSection from "../components/hero_section";
import Overview from "../components/overview";
import HbarTransaction from "../components/transactions";

function HomePage() {
  return (
    <div className="home_page">
      <HeroSection />
      <Overview />
      <HbarTransaction />
    </div>
  );
}

export default HomePage;
