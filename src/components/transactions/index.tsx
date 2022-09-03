import React from "react";
import Blocks from "./blocks";
import Transactions from "./transaction";

function HbarTransaction() {
  const [transactions, setTransactions] = React.useState<[]>([]);
  const [blocks, setBlocks] = React.useState<[]>([]);

  const getAvailableBlocks = async () => {
    await fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/blocks")
      .then((response) => response.json())
      .then((data) => setBlocks(data.blocks))
      .catch((error) => console.log(error));
  };
  const getAvailableTransactions = async () => {
    await fetch(
      "https://mainnet-public.mirrornode.hedera.com/api/v1/transactions"
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.log(error));
  };

  setInterval(() => {
    getAvailableBlocks();
    getAvailableTransactions();
  }, 10000);
  React.useEffect(() => {
    getAvailableBlocks();
    getAvailableTransactions();
  }, []);

  return (
    <div className="container transactions">
      <div className="row">
        <Blocks blocks={blocks} />
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
}

export default HbarTransaction;
