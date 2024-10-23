import "./App.css";
import { useEffect, useState } from "react";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const localStorageKey = "CLIENT_ID";
    let clientId = localStorage.getItem(localStorageKey);
    if (!clientId) {
      // generate a new client id from random characters, length 32
      clientId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem(localStorageKey, clientId);
    }
    const url = `https://api.belov.us/key-value/diary-${clientId}`;
    // load data from the server
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // fix Date field
          data.forEach((item) => {
            item.date = new Date(item.date);
          });
          setItems(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const addItem = (item) => {
    // load data from the server
    loadData().then(() => {
      item.id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems((oldItems) => [...oldItems, item]);

      // save data to the server
      const localStorageKey = "CLIENT_ID";
      const clientId = localStorage.getItem(localStorageKey);
      const url = `https://api.belov.us/key-value/diary-${clientId}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
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
