import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function Header() {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekItem = week.map((day, i) => {
    return (
      <div
        key={i}
        className={`calender_header_oneWeek calender_header_oneWeek_${i}`}
      >
        {day}
      </div>
    );
  });
  return (
    <div className="calender_header">
      <FontAwesomeIcon
        className="calender_header_left calender_header_arrow"
        icon={faChevronLeft}
      />
      <h2 className="calender_header_title">2021/08/15</h2>
      <FontAwesomeIcon
        className="calender_header_right calender_header_arrow"
        icon={faChevronRight}
      />
      {weekItem}
    </div>
  );
}

function Body() {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const daysItems = days.map((day) => {
    return (
      <div key={day} className="calender_body_day">
        {day}
      </div>
    );
  });
  return <div className="calender_body">{daysItems}</div>;
}

function Footer() {
  return (
    <div className="calender_footer">
      <button>Today</button>
    </div>
  );
}

function Calender() {
  return (
    <div className="calender">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Calender />
    </div>
  );
}

export default App;
