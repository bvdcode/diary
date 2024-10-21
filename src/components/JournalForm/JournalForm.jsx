import { useState } from "react";
import classnames from "classnames";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    isTitleValid: true,
    isDateValid: true,
    isTagValid: true,
    isTextValid: true,
  });

  const isFormValid = (formProps) => {
    const { title, date, tag, text } = formProps;
    const isTitleValid = title.trim().length > 0;
    const isDateValid = Date.parse(date) > 0;
    const isTagValid = tag.trim().length > 0;
    const isTextValid = text.trim().length > 0;
    setFormValidState({
      isTitleValid,
      isDateValid,
      isTagValid,
      isTextValid,
    });
    return isTitleValid && isDateValid && isTagValid && isTextValid;
  };

  const onFormSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    const isValid = event.target.checkValidity() && isFormValid(formProps);
    if (!isValid) {
      return;
    }
    formProps.date = new Date(formProps.date);
    onSubmit(formProps);
    event.target.reset();
  };

  return (
    <form className={styles.journalForm} onSubmit={onFormSubmitted}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className={classnames(styles.input, {
          [styles.invalid]: !formValidState.isTitleValid,
        })}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        className={classnames(styles.input, {
          [styles.invalid]: !formValidState.isDateValid,
        })}
        required
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        className={classnames(styles.input, {
          [styles.invalid]: !formValidState.isTagValid,
        })}
        required
      />
      <textarea
        name="text"
        placeholder="What's on your mind?"
        cols="30"
        rows="10"
        className={classnames(styles.input, {
          [styles.invalid]: !formValidState.isTextValid,
        })}
        required
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
