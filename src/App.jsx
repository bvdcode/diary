import "./App.css";
import { useState } from "react";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";

function App() {
  const INITIAL_DATA = [
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

  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [...oldItems, item]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <div className="list-header">
          <Header />
          <JournalAddButton />
        </div>
        <JournalList>
          {items.map((entry, index) => (
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
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
