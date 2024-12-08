import "./App.css";
import Body from "./layouts/Body/Body";
import RemoteApi from "./api/api";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await RemoteApi.fetchData();
      if (data) {
        setItems(data);
      }
    }
    fetchData();
  }, []);

  const addItem = async (item) => {
    console.log("data submitted :>> ", item);
    item.id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    // const newItems = [...items, item];
    // setItems(newItems);
    //await RemoteApi.saveData(items);
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
