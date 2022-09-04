import { Link } from "react-router-dom";
import { Contract } from "../../models";

type Props = {
  contracts: Contract[];
};

function Contracts({ contracts }: Props) {
  return (
    <div className="transaction__blocks">
      <div className="transaction__block__header">
        <h1>Lastest Contracts</h1>
      </div>
      <div className="transaction__block blocks">
        {contracts.map((data) => (
          <div className="df__jb" key={data.contract_id}>
            <div>
              <div className="df__jb">
                <span className="trans">CRT</span>
                <Link to={`/contract/${data.contract_id}`}>
                  <p className="hash_tnx">{data.contract_id}</p>
                </Link>
              </div>
              <span>
                Auto Renew Account:{" "}
                <span style={{ color: "seagreen" }}>
                  {data.auto_renew_account}
                </span>
              </span>
            </div>
            <div className="transfer">
              EVM Address: <span className="hash_tnx">{data.evm_address}</span>
            </div>
            <div>
              <p>
                Created Timestamp:{" "}
                <span
                  style={{
                    textTransform: "lowercase",
                    color: "black",
                  }}
                >
                  {data.created_timestamp}
                </span>
              </p>
              <p className="fee">Deleted: {data.deleted ? "True" : "False"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contracts;
