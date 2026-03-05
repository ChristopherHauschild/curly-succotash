"use client";

import { useCallback, useState } from "react";
import styles from "./styles.module.css";

export default function Transactions() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOnSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!amount || !description) {
        return setFeedback("Fill all fields!");
      }

      try {
        const data = await fetch("http://localhost:8080/transactions", {
          method: "POST",
        });

        if (!data.ok) {
          return setFeedback("There is some problem. Please, try again");
        }

        setFeedback(`Transaction success: ${amount}x of ${description}`);
      } catch (error) {
        setFeedback("There is some problem. Please, try again");
      }
    },
    [amount, description],
  );

  return (
    <div>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <label htmlFor="amount">Transaction Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="description">Transaction Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Submit</button>
      </form>

      {feedback && (
        <div>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
