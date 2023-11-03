import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

const AmountInput: FC = () => {
    const { control } = useFormContext();

    const validateAmount = (value: string): string | true => {
        const floatValue = parseFloat(value);
        if (isNaN(floatValue)) {
            return "Invalid number";
        }

        if (floatValue <= 0) {
            return "Amount must be greater than 0";
        }

        return true;
    };

    return (
        <>
            <label
                htmlFor="input-amount"
                className="block text-sm font-bold my-2"
            >
                Amount:
            </label>
            <Controller
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                    required: "Amount is required",
                    validate: validateAmount,
                }}
                render={({ field, fieldState }) => (
                    <>
                        <input
                            type="number"
                            id="input-amount"
                            className={`${
                                fieldState?.error ? "border-red-500" : ""
                            } opacity-70 py-3 px-4 block bg-gray-50 border-gray-800 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 w-full`}
                            {...field}
                            placeholder="Amount"
                            min={0}
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

export default AmountInput;
