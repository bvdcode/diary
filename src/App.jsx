import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";

function App() {
  const data = [
    {
      title: "Journal Entry",
      date: new Date(),
      text: "This is a journal entry",
    },
    {
      title: "Journal Entry 2",
      date: new Date(),
      text: "This is another journal entry",
    },
  ];

  return (
    <>
      <h1>Header</h1>
      <p>Some text</p>
      <Button />
      <CardButton>New memo</CardButton>
      {data.map((entry, index) => (
        <CardButton>
          <JournalItem
            key={index}
            title={entry.title}
            date={entry.date}
            text={entry.text}
          />
        </CardButton>
      ))}
    </>
  );
}

export default App;
