import { useEffect, useReducer } from "react";
import classnames from "classnames";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormValid } = formState;

  useEffect(() => {
    if (!isFormValid) {
      const timeout = setTimeout(() => {
        console.log("Resetting validation");
        dispatchForm({ type: "RESET_VALIDATION" });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isFormValid]);

  const onFormSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: "SUBMIT", payload: formProps });
    if (!isFormValid) {
      return;
    }
    formProps.date = new Date(formProps.date);
    onSubmit(formProps);
    event.target.reset();
  };

  return (
    <form className={styles.journalForm} onSubmit={onFormSubmitted}>
      <div className={styles.formRow}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className={classnames(styles.input, {
            [styles.invalid]: !isValid.title,
          })}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt="Calendar" />
          <span>Date</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          className={classnames(styles.input, {
            [styles.invalid]: !isValid.date,
          })}
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="tag" className={styles.formLabel}>
          <img src="/folder.svg" alt="Tag" />
          <span>Tag</span>
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          placeholder="Tag"
          className={classnames(styles.input, {
            [styles.invalid]: !isValid.tag,
          })}
          required
        />
      </div>
      <textarea
        name="text"
        placeholder={JSON.stringify(formState)}
        // placeholder="What's on your mind?"
        cols="30"
        rows="10"
        className={classnames(styles.input, {
          [styles.invalid]: !isValid.text,
        })}
        required
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
