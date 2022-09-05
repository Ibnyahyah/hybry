import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  placeholder: string;
  url?: string;
};

function Seacrh(props: Props) {
  const [searchContent, setSearchContent] = React.useState<{
    text: string;
    url: string;
  }>({
    text: "",
    url: (props?.url as string) || "404-error-page",
  });

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
    window.location.replace(`/#/${searchContent.url}/${searchContent.text}`);
  }
  return (
    <div className="search__container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={(e) =>
            setSearchContent({
              ...searchContent,
              text: e.target.value,
            })
          }
          required
        />
        <button>Seacrh</button>
      </form>
    </div>
  );
}

export default Seacrh;
