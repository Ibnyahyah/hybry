import React from "react";
import { Link, useParams } from "react-router-dom";
import Seacrh from "../components/seacrh";

function BlocksPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [blocks, setBlocks] = React.useState<[]>([]);

  const [limit, setLimit] = React.useState<number>(10000);

  React.useEffect(() => {
    const element = document.querySelector(".transaction__block");
    window?.addEventListener("scroll", () => {
      if (element?.scrollTop === 0) {
        setLimit(100);
      } else {
        setLimit(100 * 100);
      }
    });
  }, [limit]);

  const getAvailableBlocks = async () => {
    setLoading(true);
    await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/blocks?limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => setBlocks(data.blocks))
      .catch((error) => console.log(error));
    setLoading(false);
  };

  React.useEffect(() => {
    getAvailableBlocks();
  }, [params, limit]);

  return loading ? (
    <div className="loading__container">
      <div className="loading__spiner"></div>
    </div>
  ) : (
    <div className="container transaction__page pages">
      <div className="row">
        <h1 className="___header">Blocks</h1>
        <div className="search__wrapper">
          <Seacrh placeholder="Search for Account using acountID" />
        </div>
      </div>

      <div className="transaction__blocks">
        <div className="transaction__block__header">
          <h1>Lastest Blocks</h1>
        </div>
        <div className="transaction__block blocks">
          {blocks?.map((data) => (
            <div className="df__jb" key={data["hash"]}>
              <div>
                <div className="df__jb">
                  <span className="trans">BL</span>
                  <Link to={`/block/${data["hash"]}`}>
                    <p className="hash_tnx">{data["hash"]}</p>
                  </Link>
                </div>
                <span>Size: {data["size"]}</span>
              </div>
              <div>
                <div>
                  Prev Hash:
                  <div className="hash_tnx" style={{ width: "100px" }}>
                    {data["previous_hash"]}
                  </div>
                </div>
                <p>Count: {data["count"]}</p>
              </div>
              <p className="transfer">
                Timestamp:
                <p>
                  From: {(data["timestamp"]["from"] as string).split(".")[0]}
                </p>
                <p>To: {(data["timestamp"]["to"] as string).split(".")[0]}</p>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlocksPage;
