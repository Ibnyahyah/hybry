import React from "react";
import { Link, useParams } from "react-router-dom";
import Seacrh from "../components/seacrh";
import { Contract } from "../models";

function ContractsPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [contracts, setContracts] = React.useState<Contract[]>([]);

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
      `https://mainnet-public.mirrornode.hedera.com/api/v1/contracts?limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => setContracts(data.contracts))
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
        <h1 className="___header">Contracts</h1>
        <div className="search__wrapper">
          <Seacrh placeholder="Search for Account using acountID" />
        </div>
      </div>

      <div className="transaction__blocks">
        <div className="transaction__block__header">
          <h1>Lastest Contracts</h1>
        </div>
        <div className="transaction__block blocks">
          {contracts.map((data) => (
            <div className="df__jb" key={data.contract_id}>
              <div>
                <div className="df__jb">
                  <span className="trans">CRT</span>
                  <Link to={`/contract/${data.contract_id}`}>
                    <p className="hash_tnx">{data.contract_id}</p>
                  </Link>
                </div>
                <span>
                  Auto Renew Account:{" "}
                  <span style={{ color: "seagreen" }}>
                    {data.auto_renew_account}
                  </span>
                </span>
              </div>
              <div className="transfer">
                EVM Address:{" "}
                <span className="hash_tnx">{data.evm_address}</span>
              </div>
              <div>
                <p>
                  Created Timestamp:{" "}
                  <span
                    style={{
                      textTransform: "lowercase",
                      color: "black",
                    }}
                  >
                    {data.created_timestamp}
                  </span>
                </p>
                <p className="fee">
                  Deleted: {data.deleted ? "True" : "False"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContractsPage;
