import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

function JournalList({ items }) {
  if (items.length === 0) {
    return (
      <div className="journal-list__empty">
        No items - but you can add one 🙂
        <img className="arrow-up-icon" src="/arrow-up.png" alt="Arrow Up" />
      </div>
    );
  }

  const sortItems = (a, b) => {
    return a.date > b.date ? -1 : 1;
  };

  return (
    <div className="journal-list">
      {items.sort(sortItems).map((entry) => (
        <CardButton key={entry.id}>
          <JournalItem
            title={entry.title}
            date={entry.date}
            text={entry.text}
          />
        </CardButton>
      ))}
    </div>
  );
}

export default JournalList;
