import { put, takeEvery } from "redux-saga/effects";
import {
    Transaction,
    TransactionResponse,
    TransactionReceipt,
    BrowserProvider,
    Signer,
} from "ethers";

import apolloClient from "../apollo/client";
import { Actions } from "../types";
import { SaveTransaction } from "../queries";
import { navigate } from "../components/NaiveRouter";

function* sendTransaction(action: {
    type: Actions.SendTransaction;
    payload: { recipient: string; amount: string };
}) {
    // this could have been passed along in a more elegant fashion,
    // but for the purpouses of this scenario it's good enough
    // @ts-ignore
    const walletProvider = new BrowserProvider(window.web3.currentProvider);

    const signer: Signer = yield walletProvider.getSigner();

    const transaction = {
        to: action.payload.recipient,
        value: action.payload.amount,
    };

    try {
        const txResponse: TransactionResponse = yield signer.sendTransaction(
            transaction
        );

        const response: TransactionReceipt = yield txResponse.wait();

        const receipt: Transaction = yield response.getTransaction();

        const variables = {
            transaction: {
                gasLimit:
                    (receipt.gasLimit && receipt.gasLimit.toString()) || "0",
                gasPrice:
                    (receipt.gasPrice && receipt.gasPrice.toString()) || "0",
                to: receipt.to,
                from: receipt.from,
                value: (receipt.value && receipt.value.toString()) || "",
                data: receipt.data || null,
                chainId:
                    (receipt.chainId && receipt.chainId.toString()) || "123456",
                hash: receipt.hash,
            },
        };

        yield apolloClient.mutate({
            mutation: SaveTransaction,
            variables,
        });

        // Dispatch a success action
        yield put({ type: Actions.TransactionSuccess });

        // Navigate to the transaction details page
        navigate(`/transaction/${receipt.hash}`);
    } catch (error) {
        // Dispatch a failure action with the error message
        yield put({
            type: Actions.TransactionFailure,
            payload: JSON.stringify(error), // stringify the error object to avoid serializable error
        });
    }
}

export function* rootSaga() {
    yield takeEvery(Actions.SendTransaction, sendTransaction);
}
