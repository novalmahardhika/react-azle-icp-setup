
export const IDENTITY_PROVIDER = process.env.DFX_NETWORK === "ic"
  ? "https://identity.ic0.app"
  : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`

export const ANONYMOUS_PRINCIPAL = '2vxsx-fae'