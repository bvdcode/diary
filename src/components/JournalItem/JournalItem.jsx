import "./JournalItem.css";
import PropTypes from "prop-types";

function JournalItem({ title, date, text }) {
  return (
    <div className="journal-item">
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{date.toLocaleDateString()}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </div>
  );
}
JournalItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
};

export default JournalItem;
