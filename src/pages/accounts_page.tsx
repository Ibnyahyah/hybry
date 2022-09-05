import React from "react";
import { Link, useParams } from "react-router-dom";
import Seacrh from "../components/seacrh";
import { Account } from "../models";

function AccountsPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [accounts, setAccounts] = React.useState<Account[]>([]);

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

  const getAvailableAccounts = async () => {
    setLoading(true);
    await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/accounts?limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => setAccounts(data.accounts))
      .catch((error) => console.log(error));
    setLoading(false);
  };

  React.useEffect(() => {
    getAvailableAccounts();
  }, [params, limit]);

  return loading ? (
    <div className="loading__container">
      <div className="loading__spiner"></div>
    </div>
  ) : (
    <div className="container transaction__page pages">
      <div className="row">
        <h1 className="___header">Accounts</h1>
        <div className="search__wrapper">
          <Seacrh placeholder="Search for Account using acountID" />
        </div>
      </div>
      <div className="transaction__blocks">
        <div className="transaction__block__header">
          <h1>Lastest Accounts</h1>
        </div>
        <div className="transaction__block blocks">
          {accounts.map((data) => (
            <div className="df__jb" key={data.account}>
              <div>
                <div className="df__jb">
                  <span className="trans">AcID</span>
                  <Link to={`/account/${data.account}`}>
                    <p className="hash_tnx">{data.account}</p>
                  </Link>
                </div>
                <span>Balance:{data?.balance?.balance}</span>
                <div>Tokens:{data?.balance?.tokens?.length}</div>
              </div>
              <div>
                <p>
                  Reward Status:
                  <span
                    style={{
                      textTransform: "lowercase",
                      color: "black",
                      marginLeft: "2px",
                    }}
                  >
                    {data.decline_reward ? "false" : "true"}
                  </span>
                </p>
                <p className="fee">NodeID: {data?.staked_node_id}</p>
              </div>
              <div className="transfer">
                Auto Renew Period:
                <>{data?.auto_renew_period}</>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
