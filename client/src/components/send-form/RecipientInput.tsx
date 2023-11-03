import { getAddress, isAddress } from "ethers";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

const RecipientInput: FC = () => {
    const { control } = useFormContext();

    const validateRecipientAddress = (value: string): string | true => {
        try {
            const validAddress = getAddress(value);
            if (!isAddress(validAddress)) {
                return "Invalid recipient address";
            }
        } catch (error) {
            return "Invalid recipient address";
        }
        return true;
    };

    return (
        <>
            <label
                htmlFor="input-recipient"
                className="block text-sm font-bold my-2"
            >
                Recipient:
            </label>
            <Controller
                name="recipient"
                control={control}
                defaultValue=""
                rules={{
                    required: "Recipient address is required",
                    validate: validateRecipientAddress,
                }}
                render={({ field, fieldState }) => (
                    <>
                        <input
                            type="text"
                            id="input-recipient"
                            className={`${
                                fieldState?.error ? "border-red-500" : ""
                            } opacity-70 py-3 px-4 block bg-gray-50 border-gray-800 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 w-full`}
                            {...field}
                            placeholder="Recipient Address"
                        />
                        {fieldState?.error && (
                            <span className="text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </>
                )}
            />
        </>
    );
};

export default RecipientInput;
