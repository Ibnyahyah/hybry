import { Link } from "react-router-dom";
import { Account } from "../../models";

type Props = {
  accounts: Account[];
};

function Accounts({ accounts }: Props) {
  return (
    <div className="transaction__blocks">
      <div className="transaction__block__header">
        <h1>Lastest Accounts</h1>
      </div>
      <div className="transaction__block blocks">
        {accounts.map((data) => (
          <div className="df__jb" key={data.account}>
            <div>
              <div className="df__jb">
                <span className="trans">AcID</span>
                <Link to={`/account/${data.account}`}>
                  <p className="hash_tnx">{data.account}</p>
                </Link>
              </div>
              <span>Balance:{data?.balance?.balance}</span>
              <div>Tokens:{data?.balance?.tokens?.length}</div>
            </div>
            <div>
              <p>
                Reward Status:
                <span
                  style={{
                    textTransform: "lowercase",
                    color: "black",
                    marginLeft: "2px",
                  }}
                >
                  {data.decline_reward ? "false" : "true"}
                </span>
              </p>
              <p className="fee">NodeID: {data?.staked_node_id}</p>
            </div>
            <div className="transfer">
              Auto Renew Period:
              <>{data?.auto_renew_period}</>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
