import { useEffect, useReducer } from "react";
import classnames from "classnames";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isFormValid, isValid, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 700);
    }
    return () => clearTimeout(timerId);
  }, [isValid]);

  useEffect(() => {
    if (isFormValid) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormValid, values, onSubmit]);

  const onChange = (event) => {
    const { name, value } = event.target;
    dispatchForm({
      type: "SET_VALUE",
      payload: { [name]: value },
    });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div className={styles.formRow}>
        <input
          type="text"
          value={values.title}
          onChange={onChange}
          name="title"
          placeholder="Title"
          className={classnames(styles.input, {
            [styles.invalid]: !formState.isValid.title,
          })}
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt="Calendar" />
          <span>Date</span>
        </label>
        <input
          type="date"
          value={values.date}
          onChange={onChange}
          id="date"
          name="date"
          placeholder="Date"
          className={classnames(styles.input, {
            [styles.invalid]: !formState.isValid.date,
          })}
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="tag" className={styles.formLabel}>
          <img src="/folder.svg" alt="Tag" />
          <span>Tag</span>
        </label>
        <input
          type="text"
          value={values.tag}
          onChange={onChange}
          id="tag"
          name="tag"
          placeholder="Tag"
          className={classnames(styles.input)}
        />
      </div>
      <textarea
        name="text"
        value={values.text}
        onChange={onChange}
        placeholder="What's on your mind?"
        cols="30"
        rows="10"
        className={classnames(styles.input, {
          [styles.invalid]: !formState.isValid.text,
        })}
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
