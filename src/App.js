import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";
import { Repository } from "./Repository";

function App() {
  return (
    <ApolloProvider client={client}>
      <Repository/>
    </ApolloProvider>
  );
}

export default App;
