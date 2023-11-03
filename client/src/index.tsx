import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import client from "./apollo/client";
import "./index.css";
import "@preline/overlay";

import App from "./App";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </ReduxProvider>
    </React.StrictMode>
);
