import "./App.css";
import Body from "./layouts/Body/Body";
import { useApi } from "./hooks/useApi.hook";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((item) => {
    item.date = new Date(item.date);
    return item;
  });
}

function App() {
  const [items, setItems] = useApi("diary");

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
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
