import React from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "../components/404_page";
import Seacrh from "../components/seacrh";
import { Account } from "../models";

function AccountPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [account, setAccount] = React.useState<Account>({
    account: "",
    balance: {
      balance: 0,
      timestamp: "",
      tokens: [],
    },
    stake_period_start: "",
    staked_account_id: null,
    staked_node_id: 0,
    transactions: [],
    deleted: false,
    decline_reward: false,
    auto_renew_period: 0,
    expiry_timestamp: 0,
  });

  const getAvailableBlocks = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/${params.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data?._status?.messages[0]?.message ===
              "Invalid parameter: idOrAliasOrEvmAddress" ||
            data?._status?.messages[0]?.message === "Not found"
          ) {
            setError(true);
          }
          setAccount(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getAvailableBlocks();
  }, [params]);

  return loading ? (
    <div className="loading__container">
      <div className="loading__spiner"></div>
    </div>
  ) : (
    <>
      {error ? (
        <NotFoundPage />
      ) : (
        <div className="container transaction__page">
          <div className="row">
            <h1 className="___header">
              AccountID #<span>{account?.account}</span>
            </h1>
            <div className="search__wrapper">
              <Seacrh
                placeholder="Search for Account using acountID"
                url={"account"}
              />
            </div>
          </div>
          <div className="page__card">
            <div className="page__card__header">
              <h2>Overview</h2>
            </div>
            <div className="block__details">
              <table>
                <tbody>
                  <tr className="name__s">
                    <td>Account ID:</td>
                    <td>{account?.account}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Balance:</td>
                    <td className="hashed">{account?.balance?.balance}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Tokens:</td>
                    <td className="hashed">
                      {account?.balance?.tokens?.map((token) => (
                        <ul key={token["token_id"]}>
                          <li>
                            <b>Token ID:</b> {token["token_id"]}
                          </li>
                          <li>
                            <b>Balance:</b> {token["balance"]}
                          </li>
                        </ul>
                      ))}
                    </td>
                  </tr>
                  <tr className="name__s">
                    <td>Timestamp:</td>
                    <td>
                      <>
                        Auto Renew Period: {account?.auto_renew_period} Expire
                        In :{account?.expiry_timestamp}
                      </>
                    </td>
                  </tr>
                  <tr className="name__s">
                    <td>Staked accountID:</td>
                    <td className="hashed">
                      {account?.staked_account_id as string}
                    </td>
                  </tr>
                  <tr className="name__s">
                    <td>Staked NodeID:</td>
                    <td>{account?.staked_node_id}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Account Deleted:</td>
                    <td>{account?.deleted ? "True" : "False"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="page__card__header">
              <h2>Transactions</h2>
            </div>
            <div className="block__details account">
              <div className="accout__transaction__table__container">
                <table>
                  <thead>
                    <tr>
                      <th>Transaction Hash</th>
                      <th>Transaction ID</th>
                      <th>Transaction Name</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                      <th>Gas Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {account?.transactions?.map((transaction) => (
                      <tr key={transaction?.transaction_hash}>
                        <td className="acc_tx__hash">
                          <Link
                            to={`/transaction/${transaction?.transaction_id}`}
                          >
                            {transaction?.transaction_hash}
                          </Link>
                        </td>
                        <td className="acc_tx__hash">
                          <Link
                            to={`/transaction/${transaction?.transaction_id}`}
                          >
                            {transaction?.transaction_id}
                          </Link>
                        </td>
                        <td>{transaction?.name}</td>
                        <td>{transaction?.consensus_timestamp}</td>
                        <td>{transaction?.result}</td>
                        <td>{transaction?.charged_tx_fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountPage;
