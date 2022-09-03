import React from "react";
import { useParams } from "react-router-dom";

type Block = {
  count: number;
  gas_used: number;
  hash: string;
  logs_bloom: string;
  name: string;
  number: string;
  previous_hash: string;
  size: number;
  timestamp: {
    from: number;
    to: number;
  };
};

function BlockPage(): JSX.Element {
  const params = useParams<string>();

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
    await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/blocks/${params.id}`
    )
      .then((response) => response.json())
      .then((data) => setBlock(data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    getAvailableBlocks();
  }, [params]);

  return (
    <div className="container transaction__page">
      <h1 className="___header">
        Block #<span>{block?.number}</span>
      </h1>
      <div className="page__card">
        <div className="page__card__header">
          <h2>Overview</h2>
        </div>
        <div className="block__details">
          <table>
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
                From: {block?.timestamp?.from} To :{block?.timestamp?.from}
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default BlockPage;
