import "./App.css";
import { useState } from "react";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function App() {
  const INITIAL_DATA = [
  ];

  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    item.id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((oldItems) => [...oldItems, item]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <div className="list-header">
          <Header />
          <JournalAddButton />
        </div>
        <JournalList items={items}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
