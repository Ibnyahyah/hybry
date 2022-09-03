import React from "react";
import { Link } from "react-router-dom";

type Props = {
  transactions: [];
};

function Transactions({ transactions }: Props) {
  console.log(transactions);
  return (
    <div className="transaction__blocks">
      <div className="transaction__block__header">
        <h1>Lastest Transactions</h1>
      </div>
      <div className="transaction__block blocks">
        {transactions.map((data) => (
          <div className="df__jb" key={data["transaction_hash"]}>
            <div>
              <div className="df__jb">
                <span className="trans">TxId</span>
                <Link to={`/transaction/${data["transaction_id"]}`}>
                  <p className="hash_tnx">{data["transaction_id"]}</p>
                </Link>
              </div>
              <span>vs:{data["valid_duration_seconds"]}secs</span>
            </div>
            <div className="transfer">
              Transfers:
              <div className="df__jb">
                {(data["transfers"] as never[]).map((account) => (
                  <p key={account["account"]}>{account["account"]}</p>
                ))}
              </div>
            </div>
            <div>
              <p>
                Result:
                <span
                  style={{
                    textTransform: "lowercase",
                    color: "black",
                    marginLeft: "2px",
                  }}
                >
                  {data["result"]}
                </span>
              </p>
              <p className="fee">Fee: {data["charged_tx_fee"]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
