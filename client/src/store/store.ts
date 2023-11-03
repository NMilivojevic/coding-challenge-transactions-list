import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { transactionStatusReducer } from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: transactionStatusReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ["payload"],
            },
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
