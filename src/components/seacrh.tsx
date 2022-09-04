import React from "react";

type Props = {
  placeholder: string;
};

function Seacrh(props: Props) {
  return (
    <div className="search__container">
      <form>
        <input type="text" placeholder={props.placeholder} />
        <button>Seacrh</button>
      </form>
    </div>
  );
}

export default Seacrh;
