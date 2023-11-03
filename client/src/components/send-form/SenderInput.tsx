import { WalletState } from "@web3-onboard/core";
import { FC } from "react";

const SenderInput: FC<{ wallet: WalletState }> = ({ wallet }) => {
    return (
        <>
            <label
                htmlFor="input-sender"
                className="block text-sm font-bold my-2"
            >
                Sender:
            </label>
            <input
                type="text"
                id="input-sender"
                className="opacity-70 pointer-events-none py-3 px-4 block bg-gray-50 border-gray-800 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Sender Address (Autocompleted)"
                defaultValue={wallet.accounts[0].address}
            />
        </>
    );
};

export default SenderInput;
