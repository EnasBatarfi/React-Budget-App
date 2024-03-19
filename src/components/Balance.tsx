// React imports
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

// Component import
import ToastMessage from "./ToastMessage";
import { BudgetContext } from "../context/Context";
import { SubmitHandler, useForm } from "react-hook-form";

// Define type for transfer
type transferType = { transfer: number };

// Balance component
const Balance = () => {
  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<transferType>();

  // Extract necessary context values
  const {
    incomeAmount,
    expenseAmount,
    balanceAmount,
    setBalanceAmount,
    transferAmount,
    setTransferAmount,
  } = useContext(BudgetContext);

  // Memoize balance calculation
  setBalanceAmount(
    useMemo(() => {
      return incomeAmount - expenseAmount - transferAmount;
    }, [incomeAmount, expenseAmount, transferAmount])
  );

  // Function to handle form submission
  const submitForm: SubmitHandler<transferType> = (data, event) => {
    // Confirm transfer with user
    const isConfirmed = confirm(
      `Are you sure you want to transfer ${data.transfer} SAR`
    );
    if (isConfirmed) {
      // Proceed with transfer if confirmed
      if (!errors.transfer) {
        // Update balance and saving amount
        ToastMessage("The amount is transferred successfully", true);
        setTransferAmount(transferAmount + data.transfer);
        setBalanceAmount(balanceAmount - transferAmount);
        setValue("transfer", 0);
      } else {
        // Handle invalid transfer
        ToastMessage("Unsuccessful transferring ... try again", false);
      }
    }
  };

  // JSX rendering
  return (
    <section className="balance-section">
      {/* Display current balance and saving amount */}
      <h1>Current balance</h1>
      <p>{balanceAmount || 0}</p>
      {/* Form for transferring amount */}
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="transfer">Transfer to saving account</label>
        <input
          type="number"
          placeholder=""
          id="transfer"
          required
          // Validate transfer amount
          {...register("transfer", {
            required: true,
            max: {
              value: balanceAmount,
              message: "Insufficient balance amount",
            },
            min: { value: 1, message: "Transfer amount must be positive" },
          })}
        />
        {/* Display validation error if any */}
        <p className="error-msg">{errors.transfer?.message}</p>
        {/* Submit button */}
        <button
          className="btn"
          type="submit"
          // disabled={isValidForm ? false : true}
        >
          Transfer
        </button>
      </form>
    </section>
  );
};

export default Balance;
