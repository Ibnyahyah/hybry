import React from "react";
import HeroSection from "../components/hero_section";
import Overview from "../components/overview";
import HbarTransaction from "../components/transactions";

export type Price = {
  decimals: number;
  icon: string;
  id: string;
  name: string;
  price: string;
  priceUsd: number;
  symbol: string;
};

function HomePage() {
  const [price, setPrice] = React.useState<Price[]>([]);

  async function getPrice() {
    await fetch("https://api.saucerswap.finance/tokens")
      .then((response) => response.json())
      .then((data) => setPrice(data));
  }

  React.useEffect(() => {
    getPrice();
  }, []);
  return (
    <div className="home_page">
      <HeroSection />
      <Overview price={price} />
      <HbarTransaction />
    </div>
  );
}

export default HomePage;
