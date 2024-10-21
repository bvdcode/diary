import "./JournalForm.css";
import { useState } from "react";
import Button from "../Button/Button";

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
    console.log("date :>> ", date);
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
    <form className="journal-form" onSubmit={onFormSubmitted}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        style={{
          border: formValidState.isTitleValid ? "none" : "1px solid red",
        }}
        required
      />
      <input
        type="date"
        name="date"
        style={{
          border: formValidState.isDateValid ? "none" : "1px solid red",
        }}
        required
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        style={{
          border: formValidState.isTagValid ? "none" : "1px solid red",
        }}
        required
      />
      <textarea
        name="text"
        placeholder="What's on your mind?"
        cols="30"
        rows="10"
        style={{
          border: formValidState.isTextValid ? "none" : "1px solid red",
        }}
        required
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
