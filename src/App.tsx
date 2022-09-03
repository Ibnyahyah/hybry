import { Routes, Route } from "react-router-dom";

import Footer from "./components/footer";
import Navbar from "./components/navbar";

import BlockPage from "./pages/blocks_page";
import HomePage from "./pages/home_page";
import TransactionPage from "./pages/transactions_page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/block/:id" element={<BlockPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
