import React from "react";
import { OVERVIEW_DATA } from "../dummy__data";

function Overview() {
  return (
    <div className="overview__flow container">
      <div className="row">
        {OVERVIEW_DATA.map((data, index) => (
          <div className="overview_card" key={index}>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <div className="df__jb card__footer">
              <p className="__values">{data.price}</p>
              <p className="__times">{data.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
