import React from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../components/404_page";
import Seacrh from "../components/seacrh";

export type Transaction = {
  bytes: unknown;
  charged_tx_fee: number;
  consensus_timestamp: string;
  entity_id: string;
  max_fee: string;
  memo_base64: string;
  name: string;
  node: string;
  nonce: number;
  parent_consensus_timestamp: unknown;
  result: string;
  scheduled: boolean;
  transaction_hash: string;
  transaction_id: string;
  transfers: Transfer[];
  valid_duration_seconds: string;
  valid_start_timestamp: string;
};

type Transfer = {
  account: string;
  amount: number;
  is_approved: boolean;
};

function TransactionPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [transactions, setTransactions] = React.useState<[]>([]);

  const getAvailableTransactions = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/${params.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data?._status?.messages[0]?.message ===
              'Invalid Transaction id. Please use "shard.realm.num-sss-nnn" format where sss are seconds and nnn are nanoseconds' ||
            data?._status?.messages[0]?.message === "Not found"
          ) {
            setError(true);
          }
          setTransactions(data.transactions);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getAvailableTransactions();
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
            <h1 className="___header">Transaction Details</h1>
            <div className="search__wrapper">
              <Seacrh
                placeholder="Search for transaction using transactionID"
                url={"transaction"}
              />
            </div>
          </div>
          <div className="page__card">
            <div className="page__card__header">
              <h2>Overview</h2>
            </div>
            <div className="block__details">
              <div className="transaction__details">
                {transactions.map((transaction: Transaction) => (
                  <table key={transaction?.transaction_hash}>
                    <tbody>
                      <tr className="name__s">
                        <td>Transaction ID:</td>
                        <td>{transaction?.transaction_id}</td>
                      </tr>
                      <tr className="name__s">
                        <td className="hashed">Transaction Hash:</td>
                        <td>{transaction?.transaction_hash}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Transfer:</td>
                        <td className="hashed">
                          {transaction?.transfers?.map((data) => (
                            <ul
                              className="transactions__transfer"
                              key={data.account}
                            >
                              <li className="account__transfer">
                                Account: <span>{data.account}</span>
                              </li>
                              <li className="account__amount">
                                Amount: <span>{data.amount}</span>
                              </li>
                              <li>
                                Approved:
                                {data.is_approved ? (
                                  <span className="approved__transfer true">
                                    True
                                  </span>
                                ) : (
                                  <span className="approved__transfer false">
                                    False
                                  </span>
                                )}
                              </li>
                            </ul>
                          ))}
                        </td>
                      </tr>
                      <tr className="name__s">
                        <td>Nonce:</td>
                        <td className="hashed">{transaction?.nonce}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Status:</td>
                        <td>{transaction?.result}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Entity ID:</td>
                        <td>{transaction?.entity_id}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Charge TX Fee:</td>
                        <td>{transaction?.charged_tx_fee}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Valid Duration:</td>
                        <td> {transaction?.valid_duration_seconds}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Name:</td>
                        <td className="hashed">{transaction?.name}</td>
                      </tr>
                      <tr className="name__s">
                        <td>Parent Consensus Timestamp:</td>
                        <td className="hashed">
                          {transaction?.parent_consensus_timestamp as string}
                        </td>
                      </tr>
                      <tr className="name__s">
                        <td>Max fee:</td>
                        <td>{transaction?.max_fee}</td>
                      </tr>
                      <tr className="name__s">
                        <td className="hashed">Memo Base64:</td>
                        <td>{transaction?.memo_base64}</td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionPage;
