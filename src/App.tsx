import { Routes, Route } from "react-router-dom";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AccountsPage from "./pages/accounts_page";
import AccountPage from "./pages/account_page";
import BlocksPage from "./pages/blocks_page";

import BlockPage from "./pages/block_page";
import ContractsPage from "./pages/contracts_page";
import ContractPage from "./pages/contract_page";
import HomePage from "./pages/home_page";
import TransactionsPage from "./pages/transactions_page";
import TransactionPage from "./pages/transaction_page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/blocks" element={<BlocksPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/block/:id" element={<BlockPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="/account/:id" element={<AccountPage />} />
        <Route path="/contract/:id" element={<ContractPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
