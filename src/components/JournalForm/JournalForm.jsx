import { useState } from "react";
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
    <form className={styles["journal-form"]} onSubmit={onFormSubmitted}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className={styles.input + formValidState.isTitleValid ? "" : " invalid"}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        className={styles.input + formValidState.isDateValid ? "" : " invalid"}
        required
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        className={styles.input + formValidState.isTagValid ? "" : " invalid"}
        required
      />
      <textarea
        name="text"
        placeholder="What's on your mind?"
        cols="30"
        rows="10"
        className={styles.input + formValidState.isTextValid ? "" : " invalid"}
        required
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
