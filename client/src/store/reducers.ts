import { AnyAction } from "@reduxjs/toolkit";
import { Actions } from "../types";

// Define the state type
export interface RootState {
    transactions: any[];
    isTransactionSuccess: boolean;
    error: string | null;
}

// Initial state
const initialState: RootState = {
    transactions: [],
    isTransactionSuccess: false,
    error: null,
};

// Reducer to handle transaction state changes
export const transactionStatusReducer = (
    state: RootState = initialState,
    action: AnyAction
): RootState => {
    switch (action.type) {
        case Actions.TransactionSuccess:
            return {
                ...state,
                isTransactionSuccess: true,
                error: null,
            };
        case Actions.TransactionFailure:
            return {
                ...state,
                isTransactionSuccess: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
