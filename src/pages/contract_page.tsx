import React from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "../components/404_page";
import Seacrh from "../components/seacrh";
import { Contract } from "../models";
import { Transaction } from "./transaction_page";

function ContractPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [contract, setContract] = React.useState<Contract>({
    admin_key: null,
    bytecode: "",
    auto_renew_account: "",
    auto_renew_period: 0,
    contract_id: "",
    created_timestamp: "",
    deleted: false,
    evm_address: "",
    expiration_timestamp: null,
    file_id: null,
    max_automatic_token_associations: 0,
    memo: "",
    obtainer_id: null,
    permanent_removal: null,
    proxy_account_id: null,
    timestamp: {
      from: "",
      to: "",
    },
  });

  const getAvailableContracts = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://mainnet-public.mirrornode.hedera.com/api/v1/contracts/${params.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data?._status?.messages[0]?.message ===
              "Invalid parameter: contractid" ||
            data?._status?.messages[0]?.message === "Not found"
          ) {
            setError(true);
          }
          setContract(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getAvailableContracts();
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
              ContractID #<span>{contract?.contract_id}</span>
            </h1>
            <div className="search__wrapper">
              <Seacrh
                placeholder="Search for Account using acountID"
                url={"contract"}
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
                    <td>Contract ID:</td>
                    <td>{contract?.contract_id}</td>
                  </tr>
                  <tr className="name__s">
                    <td>EVM Address:</td>
                    <td className="hashed">{contract?.evm_address}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Admin Key:</td>
                    <td className="hashed">{contract?.admin_key as string}</td>
                  </tr>
                  <tr className="name__s">
                    <td>File ID:</td>
                    <td>{contract?.file_id as string}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Auto Renew Account:</td>
                    <td className="hashed">{contract?.auto_renew_account}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Auto Renew Period:</td>
                    <td className="hashed">{contract?.auto_renew_period}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Timestamp:</td>
                    <td className="hashed">
                      From: {contract?.timestamp?.from} To:{" "}
                      {contract?.timestamp?.to}
                    </td>
                  </tr>
                  <tr className="name__s">
                    <td>Memo:</td>
                    <td>{contract?.memo}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Byte Code:</td>
                    <td>{contract?.bytecode}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Deleted:</td>
                    <td>{contract?.deleted ? "True" : "False"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContractPage;
