import React from "react";
import { Link, useParams } from "react-router-dom";
import Seacrh from "../components/seacrh";

function TransactionsPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [transactions, setTransactions] = React.useState<[]>([]);

  const [limit, setLimit] = React.useState<number>(10000);

  // React.useEffect(() => {
  //   const element = document.querySelector(".transaction__block");
  //   window?.addEventListener("scroll", () => {
  //     if (element?.scrollTop === 0) {
  //       setLimit(100);
  //     } else {
  //       setLimit(100 * 100);
  //     }
  //   });
  // }, [limit]);

  const getAvailableBlocks = async () => {
    setLoading(true);
    await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions?limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
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
        <h1 className="___header">Transactions</h1>
        <div className="search__wrapper">
          <Seacrh placeholder="Search for Account using acountID" />
        </div>
      </div>

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
    </div>
  );
}

export default TransactionsPage;
