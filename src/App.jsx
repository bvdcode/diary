import "./App.css";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

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
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>New memo</CardButton>
          {data.map((entry, index) => (
            <CardButton key={index}>
              <JournalItem
                title={entry.title}
                date={entry.date}
                text={entry.text}
              />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>Body</Body>
    </div>
  );
}

export default App;
