import "./JournalForm.css";
import { useState } from "react";
import Button from "../Button/Button";

function JournalForm({ onSubmit }) {
  const [inputData, setInputData] = useState("");

  const onInputChanged = (event) => {
    setInputData(event.target.value);
  };

  const onFormSubmitted = (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    if (!isValid) {
      return;
    }
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    formProps.date = new Date(formProps.date);
    onSubmit(formProps);
  };

  return (
    <form className="journal-form" onSubmit={onFormSubmitted}>
      <input type="text" name="title" placeholder="Title" required />
      <input type="date" name="date" required />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        value={inputData}
        onChange={onInputChanged}
        required
      />
      <textarea
        name="text"
        placeholder="What's on your mind?"
        cols="30"
        rows="10"
        required
      ></textarea>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default JournalForm;
