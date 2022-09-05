import React from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../components/404_page";
import Seacrh from "../components/seacrh";
import { Block } from "../models";

function BlockPage(): JSX.Element {
  const params = useParams<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [block, setBlock] = React.useState<Block>({
    count: 0,
    gas_used: 0,
    hash: "",
    logs_bloom: "",
    name: "",
    number: "",
    previous_hash: "",
    size: 0,
    timestamp: {
      from: 0,
      to: 0,
    },
  });

  const getAvailableBlocks = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://mainnet-public.mirrornode.hedera.com/api/v1/blocks/${params.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data?._status?.messages[0]?.message ===
              "Invalid parameter: hashOrNumber" ||
            data?._status?.messages[0]?.message === "Not found" ||
            data?._status?.messages[0]?.message === "Service unavailable"
          ) {
            setError(true);
          }
          setBlock(data);
        })
        .catch((error) => console.log(error));
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
              Block #<span>{block?.number}</span>
            </h1>
            <div className="search__wrapper">
              <Seacrh
                placeholder="Search for blocks using hash or block number"
                url={"block"}
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
                    <td>Block Size:</td>
                    <td>{block?.size}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Hash:</td>
                    <td className="hashed">{block?.hash}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Prev hash:</td>
                    <td className="hashed">{block?.previous_hash}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Timestamp:</td>
                    <td>
                      From: {block?.timestamp?.from} To :
                      {block?.timestamp?.from}
                    </td>
                  </tr>
                  <tr className="name__s">
                    <td>Logs bloom:</td>
                    <td className="hashed">{block?.logs_bloom}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Count:</td>
                    <td>{block?.count}</td>
                  </tr>
                  <tr className="name__s">
                    <td>Gas fee:</td>
                    <td>{block?.gas_used}</td>
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

export default BlockPage;
