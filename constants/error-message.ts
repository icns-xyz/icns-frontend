export const TWITTER_LOGIN_ERROR = "Twitter login access denied";
export const TWITTER_PROFILE_ERROR = "Twitter auth code is not valid";

export const KEPLR_NOT_FOUND_ERROR = "Can't found window.keplr";
export const KEPLR_VERSION_ERROR = "You should update keplr";

export const KEPLR_NO_ACCOUNT_ERROR = "key doesn't exist";
export const KEPLR_NO_ACCOUNT_MESSAGE =
  "Create a wallet account to get started with ICNS!";

export const INSUFFICIENT_GAS_ERROR = "insufficient funds: invalid request";
export const INSUFFICIENT_GAS_MESSAGE =
  "Not enough OSMO in your account. Please add more OSMO to your account";

export const ACCOUNT_NOT_EXIST_ERROR = "does not exist: unknown address";
export const ACCOUNT_NOT_EXIST_MESSAGE =
  "Account has not been registered on chain. Please add some OSMO to your account and try again.";

export const VERIFICATION_THRESHOLD_ERROR = "verfication is below threshold:";
export const VERIFICATION_THRESHOLD_MESSAGE =
  "Verifier consensus failed. Verifiers may be offline. Please try again later.";

export const INVALID_REFERRAL_ERROR = "Invalid referral:";
export const INVALID_REFERRAL_MESSAGE =
  "Make sure that the referrer ICNS name has been registered.";

export const TOO_MANY_CHAINS_IN_LEDGER_ERROR = "Output buffer too small";
export const TOO_MANY_CHAINS_IN_LEDGER_MESSAGE =
  "Due to hardware constraints, limited number of chains can be linked at a time(1-2 on Ledger Nano S / 25 on Ledger Nano S+/X). Please select less chains and try again.";

export const EVM_CHAIN_IN_LEDGER_ERROR = "Ledger is unsupported for this chain";
export const EVM_CHAIN_IN_LEDGER_MESSAGE =
  "ICNS for Cosmos chains using Ethereum/EVM keys are not supported. Remove EVM-based Cosmos SDK chains and try again.";

export const LEDGER_MAX_REGISTER_ERROR =
  "Data is invalid : JSON. Too many tokens";
