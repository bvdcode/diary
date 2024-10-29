import "./App.css";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import { useEffect, useState, useCallback } from "react";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function App() {
  const [items, setItems] = useState([]);

  const getUrl = useCallback(() => {
    const clientId = getClientId();
    return `https://api.belov.us/key-value/diary-${clientId}`;
  }, []);

  useEffect(() => {
    const url = getUrl();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // fix Date field
          data.forEach((item) => {
            item.date = new Date(item.date);
          });
          setItems(data);
        }
      });
  }, [getUrl]);

  const addItem = (item) => {
    item.id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((oldItems) => [...oldItems, item]);
    const url = getUrl();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  };

  function getClientId() {
    const localStorageKey = "CLIENT_ID";
    let clientId = localStorage.getItem(localStorageKey);
    if (!clientId) {
      // generate a new client id from random characters, length 32
      clientId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem(localStorageKey, clientId);
    }
    return clientId;
  }

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
