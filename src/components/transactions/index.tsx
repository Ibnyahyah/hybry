import React from "react";
import Accounts from "./accounts";
import Blocks from "./blocks";
import Contracts from "./contract";
import Transactions from "./transaction";

function HbarTransaction() {
  const [transactions, setTransactions] = React.useState<[]>([]);
  const [blocks, setBlocks] = React.useState<[]>([]);
  const [accounts, setAccounts] = React.useState<[]>([]);
  const [contracts, setContracts] = React.useState<[]>([]);

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
  const getAllAccounts = async () => {
    await fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/accounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data.accounts))
      .catch((error) => console.log(error));
  };
  const getAllContracts = async () => {
    await fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/contracts")
      .then((response) => response.json())
      .then((data) => setContracts(data.contracts))
      .catch((error) => console.log(error));
  };

  setInterval(() => {
    getAvailableBlocks();
    getAvailableTransactions();
  }, 3000);

  React.useEffect(() => {
    getAvailableBlocks();
    getAvailableTransactions();
    getAllAccounts();
    getAllContracts();
  }, []);

  return (
    <div className="container transactions">
      <div className="row">
        <Blocks blocks={blocks} />
        <Transactions transactions={transactions} />
        <Accounts accounts={accounts} />
        <Contracts contracts={contracts} />
      </div>
    </div>
  );
}

export default HbarTransaction;
