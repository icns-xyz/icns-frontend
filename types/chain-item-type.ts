export interface ChainItemType {
  chainId: string;
  chainName: string;
  prefix: string;
  chainImageUrl: string;
  address: string;
}

export interface DisabledChainItemType extends ChainItemType {
  disabled: true;

  // Show reason why this chain is disabled to user if needed.
  reason?: Error;
}
