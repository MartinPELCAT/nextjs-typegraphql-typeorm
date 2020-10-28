import { AppProps } from "next/app";
import React from "react";
import "../styles/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
