import Input from "../Input/Input";
import classnames from "classnames";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isFormValid, isValid, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    if (!isValid.title) {
      titleRef.current.focus();
    } else if (!isValid.date) {
      dateRef.current.focus();
    } else if (!isValid.text) {
      textRef.current.focus();
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
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
        <Input
          type="text"
          isValid={isValid.title}
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          name="title"
          placeholder="Title"
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt="Calendar" />
          <span>Date</span>
        </label>
        <Input
          type="date"
          isValid={isValid.date}
          value={values.date}
          onChange={onChange}
          ref={dateRef}
          id="date"
          name="date"
          placeholder="Date"
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="tag" className={styles.formLabel}>
          <img src="/folder.svg" alt="Tag" />
          <span>Tag</span>
        </label>
        <Input
          type="text"
          isValid={isValid.tag}
          value={values.tag}
          onChange={onChange}
          id="tag"
          name="tag"
          placeholder="Tag"
        />
      </div>
      <textarea
        name="text"
        value={values.text}
        onChange={onChange}
        ref={textRef}
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
