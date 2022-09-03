import { Link } from "react-router-dom";

type Props = {
  blocks: [];
};

function Blocks({ blocks }: Props) {
  return (
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
              <p>From: {(data["timestamp"]["from"] as string).split(".")[0]}</p>
              <p>To: {(data["timestamp"]["to"] as string).split(".")[0]}</p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blocks;
