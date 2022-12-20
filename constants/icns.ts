export const MAIN_CHAIN_ID =
  process.env.NEXT_PUBLIC_MAIN_CHAIN_ID ?? "osmo-test-4";

export const REFERRAL_KEY =
  process.env.NEXT_PUBLIC_REFERRAL_KEY ?? "icns-referral";

export const RPC_URL =
  process.env.NEXT_PUBLIC_OSMOSIS_RPC_URL ?? "https://rpc.testnet.osmosis.zone";
export const REST_URL =
  process.env.NEXT_PUBLIC_OSMOSIS_REST_URL ??
  "https://lcd.testnet.osmosis.zone";

export const NAME_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_ICNS_NAME_NFT_CONTRACT_ADDRESS ??
  "osmo1xahnjn872smah6xle8n3z5a5teqq390qr959l805mkuw0kcy8g5smtdagg";
export const REGISTRAR_ADDRESS =
  process.env.NEXT_PUBLIC_ICNS_REGISTRAR_CONTRACT_ADDRESS ??
  "osmo1npn97g7hsgqlp70rw8nhd7c7vyvkukv9x0n25sn4fk5mgcjlz4gq9zlgf3";
export const RESOLVER_ADDRESS =
  process.env.NEXT_PUBLIC_ICNS_RESOLVER_CONTRACT_ADDRESS ??
  "osmo1002awr7frr9wk44lc3vfzt0d2w6vz5z03ql6fszjsjy8vdcvk0sskruz3c";

export const CHAIN_ALLOWLIST =
  process.env.NEXT_PUBLIC_CHAIN_ALLOWLIST ||
  [
    "acre_9052-1",
    "ioz_168-1",
    "akashnet-2",
    "mantle-1",
    "axelar-dojo-1",
    "laozi-mainnet",
    "bitcanna-1",
    "bitsong-2b",
    "bostrom",
    "carbon-1",
    "cerberus-chain-1",
    "perun-1",
    "cheqd-mainnet-1",
    "chihuahua-1",
    "comdex-1",
    "commercio-3",
    "cosmoshub-4",
    "crescent-1",
    "cudos-1",
    "mainnet-3",
    "dig-1",
    "emoney-3",
    "fetchhub-4",
    "colosseum-1",
    "gravity-bridge-3",
    "ixo-4",
    "irishub-1",
    "jackal-1",
    "juno-1",
    "kava_2222-10",
    "kichain-2",
    "darchub",
    "kaiyo-1",
    "likecoin-mainnet-2",
    "lum-network-1",
    "odin-mainnet-freya",
    "omniflixhub-1",
    "Oraichain",
    "osmosis-1",
    "panacea-3",
    "core-1",
    "pio-mainnet-1",
    "quicksilver-1",
    "reb_1111-1",
    "regen-1",
    "titan-1",
    "secret-4",
    "sentinelhub-2",
    "shentu-2.2",
    "sifchain-1",
    "sommelier-3",
    "stafihub-1",
    "stride-1",
    "teritori-1",
    "phoenix-1",
    "tgrade-mainnet-1",
    "umee-1",
    "vidulum-1",
    "evmos_9001-2",
    "injective-1",
  ].join(",");
