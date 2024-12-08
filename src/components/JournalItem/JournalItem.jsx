import "./JournalItem.css";

function JournalItem({ title, date, text }) {
  const dateStr = // if its a date object
    date instanceof Date
      ? date.toLocaleDateString()
      : new Date(date).toLocaleDateString();
  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{dateStr}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </>
  );
}

export default JournalItem;
