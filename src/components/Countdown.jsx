import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ onBirthdayReached, birthdayReached }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevTime, setPrevTime] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    if (birthdayReached) {
      return;
    }

    // 🎂 Target Birthday
    const targetDate = new Date("2026-08-25T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });

      if (diff <= 0 && !birthdayReached) {
        onBirthdayReached();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onBirthdayReached, birthdayReached]);

  useEffect(() => {
    setPrevTime(time);
  }, [time]);

  const Digit = ({ value, label, icon, prevValue }) => {
    const shouldFlip = prevValue !== null && prevValue !== value;

    return (
      <div className="digit">
        <div className={`card ${shouldFlip ? "flip" : ""}`}>
          <div className="card-glare"></div>
          <div className="text">{String(value).padStart(2, "0")}</div>
        </div>
        <div className="label">
          <span className="label-icon">{icon}</span> {label}
        </div>
      </div>
    );
  };

  if (birthdayReached) {
    return (
      <section className="countdown">
        <div className="celebration-banner-wrapper">
          <div className="celebration-badge">🎂 TODAY'S THE DAY 🎂</div>
          <span className="birthday-celebration">
            🎉 It's Your Birthday, Yashi! 🎉
          </span>
          <div className="celebration-subtext">✨ Let the magical party begin! ✨</div>
        </div>
      </section>
    );
  }

  return (
    <section className="countdown">
      <div className="flip-timer">
        {time.days > 0 && (
          <Digit
            value={time.days}
            label="Days"
            icon="📅"
            prevValue={prevTime.days}
          />
        )}
        <Digit
          value={time.hours}
          label="Hours"
          icon="⏳"
          prevValue={prevTime.hours}
        />
        <Digit
          value={time.minutes}
          label="Minutes"
          icon="⌛"
          prevValue={prevTime.minutes}
        />
        <Digit
          value={time.seconds}
          label="Seconds"
          icon="⚡"
          prevValue={prevTime.seconds}
        />
      </div>
    </section>
  );
}

export default Countdown;

