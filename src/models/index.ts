import { Transaction } from "../pages/transaction_page";

export interface Account {
  account: string;
  alias?: unknown;
  auto_renew_period?: number;
  balance: {
    balance: number;
    timestamp: string;
    tokens: [];
  };
  decline_reward?: boolean;
  deleted?: boolean;
  ethereum_nonce?: number;
  evm_address?: unknown;
  expiry_timestamp: unknown;
  max_automatic_token_associations?: number;
  receiver_sig_required?: unknown;
  stake_period_start: string;
  staked_account_id: unknown;
  staked_node_id: number;
  transactions: Transaction[];
}

export interface Block {
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
}

export interface Contract {
  admin_key: unknown;
  bytecode: string;
  auto_renew_account: string;
  auto_renew_period: number;
  contract_id: string;
  created_timestamp: string;
  deleted: boolean;
  evm_address: string;
  expiration_timestamp: unknown;
  file_id: unknown;
  max_automatic_token_associations: number;
  memo: string;
  obtainer_id: unknown;
  permanent_removal: unknown;
  proxy_account_id: unknown;
  timestamp: {
    from: string;
    to: string;
  };
}
