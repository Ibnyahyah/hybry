import React from "react";
import { OVERVIEW_DATA } from "../dummy__data";
import { Price } from "../pages/home_page";

type Props = {
  price: Price[];
};

function Overview({ price }: Props) {
  console.log(price[0]);
  return (
    <div className="overview__flow container">
      <div className="row">
        <div className="overview_card">
          <h1>{price[0]?.name}</h1>
          <p>ID:{price[0]?.id}</p>
          <div className="df__jb card__footer">
            <p className="__values">${price[0]?.priceUsd}</p>
            <p className="__times"></p>
          </div>
        </div>
        <div className="overview_card">
          <h1>{price[0]?.name}</h1>
          <p>ID:{price[0]?.id}</p>
          <div className="df__jb card__footer">
            <p className="__values">${price[0]?.priceUsd}</p>
            <p className="__times"></p>
          </div>
        </div>
        <div className="overview_card">
          <h1>{price[0]?.name}</h1>
          <p>ID:{price[0]?.id}</p>
          <div className="df__jb card__footer">
            <p className="__values">${price[0]?.priceUsd}</p>
            <p className="__times"></p>
          </div>
        </div>
        <div className="overview_card">
          <h1>{price[0]?.name}</h1>
          <p>ID:{price[0]?.id}</p>
          <div className="df__jb card__footer">
            <p className="__values">${price[0]?.priceUsd}</p>
            <p className="__times"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
