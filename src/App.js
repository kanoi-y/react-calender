import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./App.css";

const NOW = new Date();

function Header(props) {
  const [title, setTitle] = useState(
    `${props.now.getFullYear()}/${props.now.getMonth() + 1}`
  );
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
      <h2 className="calender_header_title">{title}</h2>
      <FontAwesomeIcon
        className="calender_header_right calender_header_arrow"
        icon={faChevronRight}
      />
      {weekItem}
    </div>
  );
}

function Body(props) {
  const [days, setDays] = useState([]);

  // 月の最終日を求める関数
  const getLastDay = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getCalenderBody = (year, month) => {
    // 先月の最終日
    const beforeLastDay =
      month === 0 ? getLastDay(year - 1, 12) : getLastDay(year, month);

    // 今月の最終日
    const thisLastDay = getLastDay(year, month + 1);

    //  一日の曜日
    const weekDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < weekDay; i++) {
      const num = beforeLastDay - weekDay + i + 1;
      setDays([...days, { num, disable: true }]);
    }
  };
  getCalenderBody();

  // const days = [
  //   { num: 1, disable: false },
  //   { num: 2, disable: false },
  //   { num: 3, disable: false },
  //   { num: 4, disable: false },
  //   { num: 5, disable: false },
  //   { num: 6, disable: false },
  //   { num: 7, disable: false },
  //   { num: 8, disable: false },
  //   { num: 9, disable: false },
  //   { num: 10, disable: false },
  //   { num: 11, disable: false },
  //   { num: 12, disable: false },
  //   { num: 13, disable: false },
  //   { num: 14, disable: false },
  //   { num: 15, disable: false },
  //   { num: 16, disable: false },
  //   { num: 17, disable: false },
  //   { num: 18, disable: false },
  //   { num: 19, disable: false },
  //   { num: 20, disable: false },
  //   { num: 21, disable: false },
  //   { num: 22, disable: false },
  //   { num: 23, disable: false },
  //   { num: 24, disable: false },
  //   { num: 25, disable: false },
  //   { num: 26, disable: false },
  //   { num: 27, disable: false },
  //   { num: 28, disable: false },
  //   { num: 29, disable: false },
  //   { num: 30, disable: false },
  //   { num: 31, disable: false },
  //   { num: 1, disable: true },
  //   { num: 2, disable: true },
  //   { num: 3, disable: true },
  //   { num: 4, disable: true },
  // ];
  const daysItems = days.map((day, i) => {
    return (
      <div
        key={i}
        className={
          day.disable ? "calender_body_day disabled" : "calender_body_day"
        }
      >
        {day.num}
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
  const [now, setNow] = useState(NOW);
  return (
    <div className="calender">
      <Header now={now} setNow={setNow} />
      <Body now={now} setNow={setNow} />
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
