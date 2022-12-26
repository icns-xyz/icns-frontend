import { TwitterLoginSuccess } from "../types";
import { TWITTER_LOGIN_ERROR } from "../constants/error-message";
import { WALLET_INSTALL_URL } from "../constants/wallet";

export async function request<TResponse>(
  url: string,
  config: RequestInit = {},
  customConfig?: {
    isErrorIgnore?: boolean;
  },
): Promise<TResponse> {
  const response = await fetch(url, config);
  const data = await response.json();

  if (
    (!response.ok || data.error || data.errors) &&
    !customConfig?.isErrorIgnore
  ) {
    const { error, errors } = data;
    const errorMessage =
      (error && error.toString()) || (errors && errors.toString());

    throw new Error(errorMessage);
  }

  return data;
}

export function buildQueryString(query: Record<string, any>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : "",
    )
    .join("&");
}

export const checkTwitterAuthQueryParameter = (
  query: string,
): TwitterLoginSuccess => {
  // Twitter Login Error Check
  if (query.match("error")) {
    throw new Error(TWITTER_LOGIN_ERROR);
  }

  // Twitter state, auth code check
  const [, state, code] =
    query.match(/^(?=.*state=([^&]+)|)(?=.*code=([^&]+)|).+$/) || [];

  return {
    state,
    code,
  };
};

export const replaceToInstallPage = () => {
  window.location.href = WALLET_INSTALL_URL;
};
