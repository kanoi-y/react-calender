import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./App.css";

const todayColor = {
  backgroundColor: "rgb(255, 117, 75)",
};

const backColor = {
  backgroundColor: "#fff",
};

const NOW = new Date();

function Header(props) {
  const { now, handleSetNow } = props;
  const title = `${now.getFullYear()}/${now.getMonth() + 1}`;
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
        onClick={() =>
          handleSetNow(new Date(now.getFullYear(), now.getMonth() - 1))
        }
      />
      <h2 className="calender_header_title">{title}</h2>
      <FontAwesomeIcon
        className="calender_header_right calender_header_arrow"
        icon={faChevronRight}
        onClick={() =>
          handleSetNow(new Date(now.getFullYear(), now.getMonth() + 1))
        }
      />
      {weekItem}
    </div>
  );
}

function Body(props) {
  const { now } = props;
  const [days, setDays] = useState([]);

  useEffect(() => {
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

      // 今月の最終日の曜日
      const endDayOfWeek = new Date(year, month + 1, 0).getDay();

      let newDays = [];

      for (let i = 0; i < weekDay; i++) {
        const num = beforeLastDay - weekDay + i + 1;
        newDays.push({ num, disable: true, today: false });
      }

      for (let i = 0; i < thisLastDay; i++) {
        if (
          now.getFullYear() === NOW.getFullYear() &&
          now.getMonth() === NOW.getMonth() &&
          i + 1 === NOW.getDate()
        ) {
          newDays.push({ num: i + 1, disable: false, today: true });
        } else {
          newDays.push({ num: i + 1, disable: false, today: false });
        }
      }

      for (let i = 0; i < 6 - endDayOfWeek; i++) {
        newDays.push({ num: i + 1, disable: true, today: false });
      }

      return newDays;
    };

    setDays(getCalenderBody(now.getFullYear(), now.getMonth()));
    console.log(now.getFullYear());
    console.log(now.getMonth() + 1);
    console.log(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const daysItems = days.map((day, i) => {
    return (
      <div
        key={i}
        className={
          day.disable ? "calender_body_day disabled" : "calender_body_day"
        }
        style={day.today ? todayColor : backColor}
      >
        {day.num}
      </div>
    );
  });
  return <div className="calender_body">{daysItems}</div>;
}

function Footer(props) {
  const { handleSetNow } = props;
  return (
    <div className="calender_footer">
      <button onClick={() => handleSetNow(NOW)}>Today</button>
    </div>
  );
}

function Calender() {
  const [now, setNow] = useState(NOW);
  console.log(now);
  const handleSetNow = (newNow) => {
    setNow(newNow);
  };
  return (
    <div className="calender">
      <Header now={now} handleSetNow={handleSetNow} />
      <Body now={now} />
      <Footer handleSetNow={handleSetNow} />
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
