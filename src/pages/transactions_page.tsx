import React from "react";
import { useParams } from "react-router-dom";

type Transaction = {
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

  const [transactions, setTransactions] = React.useState<[]>([]);
  const [transaction, setTransaction] = React.useState<Transaction>({
    bytes: "",
    charged_tx_fee: 0,
    consensus_timestamp: "",
    entity_id: "",
    max_fee: "",
    memo_base64: "",
    name: "",
    node: "",
    nonce: 0,
    parent_consensus_timestamp: "",
    result: "",
    scheduled: false,
    transaction_hash: "",
    transaction_id: "",
    transfers: [],
    valid_duration_seconds: "",
    valid_start_timestamp: "",
  });

  const getAvailableTransactions = async () => {
    await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/${params.id}`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.log(error));
  };

  console.log(transaction);
  React.useEffect(() => {
    getAvailableTransactions();
  }, [params]);

  return (
    <div className="container transaction__page">
      <h1 className="___header">Transaction Details</h1>
      <div className="page__card">
        <div className="page__card__header">
          <h2>Overview</h2>
        </div>
        <div className="block__details">
          <div className="transaction__details">
            {transactions.map((transaction: Transaction) => (
              <table key={transaction.transaction_hash}>
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
                      <ul className="transactions__transfer" key={data.account}>
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
                  <td>parent_consensus_timestamp:</td>
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
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
