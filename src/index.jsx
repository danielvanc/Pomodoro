import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// Refer to Wes's Clock tutorial:
// https://courses.wesbos.com/account/access/584fcb88d26b631f4f4e6981/view/194130581

const Clock = styled.main`
  margin: 100px auto 0 auto;
  max-width: 700px;
  text-align: center;
`;

const NormalButton = styled.button`
  cursor: pointer;
`;

const BreakLabel = styled.label``;
const SessionLabel = styled.label``;
const TimerLabel = styled.label``;

const ClockLengths = styled.form`
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const BreakLength = styled.div``;
const SessionLength = styled.div``;

const BreakDecrement = styled(NormalButton)``;
const SessionDecrement = styled(NormalButton)``;
const BreakIncrement = styled(NormalButton)``;
const SessionIncrement = styled(NormalButton)``;

const ClockTimer = styled.div`
  p {
    font-size: 32px;
    letter-spacing: 0.1em;
  }
`;

const StartStop = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
`;
const ButtonStart = styled.button``;
const ButtonReset = styled.button``;

const App = () => {
  const sessionHourStarting = 25;
  const breakHoursStarting = 5;
  const sessionSecsStarting = "00";
  const breakSecsStarting = "00";
  const [inProgress, setInProgress] = React.useState(true);
  const [timerStatus, setTimerStatus] = React.useState(false);
  const [breakLength, setBreakLength] = React.useState(breakHoursStarting);
  const [seshLength, setSeshLength] = React.useState(sessionHourStarting);
  const [timeLeft, setTimeLeft] = React.useState(
    `${seshLength <= 9 ? "0" : ""}${seshLength}:${sessionSecsStarting}`
  );
  const [breakTimeLeft, setBreakTimeLeft] = React.useState(
    `${breakLength <= 9 ? "0" : ""}${breakLength}:${breakSecsStarting}`
  );

  const audioToPlay = React.useRef(null);

  let countdown;

  React.useEffect(() => {
    inProgress
      ? timer(getTimeInSeconds(timeLeft))
      : timer(getTimeInSeconds(breakTimeLeft));

    return () => {
      clearInterval(countdown);
    };
  }, [timerStatus, timeLeft, inProgress, breakLength]);

  function getTimeInSeconds(timeRemaining) {
    const currentTime = timeRemaining;

    const loc = currentTime.indexOf(":");
    if (loc) {
      const mins = parseInt(currentTime.substring(0, loc));
      const seconds = currentTime.substring(loc + 1, currentTime.length);

      return Math.round(mins * 60) + parseInt(seconds);
    }
  }

  function timer(seconds) {
    const now = Date.now();
    let secondsLeft;
    let then = now + seconds * 1000;

    if (timerStatus === true) {
      displayTimeLeft(seconds);
      countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft === 0) {
          audioToPlay.current.pause();
          audioToPlay.current.currentTime = 1;
          audioToPlay.current.play();
        }
        if (secondsLeft < 0) {
          clearInterval(countdown);
          if (inProgress) {
            // Time for a break
            setBreakTimeLeft(
              `${
                breakLength <= 9 ? "0" : ""
              }${breakLength}:${breakSecsStarting}`
            );
            setInProgress(false);
          } else {
            setTimeLeft(
              `${
                seshLength <= 9 ? "0" : ""
              }${seshLength}:${sessionSecsStarting}`
            );
            setInProgress(true);
          }
          return;
        }

        displayTimeLeft(secondsLeft);
      }, 1000);
    }
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    let setTime;
    let remainderSeconds = seconds % 60;

    setTime = `${minutes < 10 ? "0" : ""}${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;

    inProgress ? setTimeLeft(setTime) : setBreakTimeLeft(setTime);
  }

  const handleBreakDecrement = (e) => {
    e.preventDefault();
    handleBreakChange(0);
  };
  const handleBreakIncrement = (e) => {
    e.preventDefault();
    handleBreakChange(1);
  };

  const handleSessionDecrement = (e) => {
    e.preventDefault();
    handleTimeChange(0);
  };
  const handleSessionIncrement = (e) => {
    e.preventDefault();
    handleTimeChange(1);
  };

  function handleTimeChange(change) {
    let currentTime = timeLeft;
    let currLength = seshLength;

    let currentHour = parseInt(currentTime.substring(0, 2));
    let currentSeconds = parseInt(currentTime.substring(3, currentTime.length));
    let newTime = currentTime;

    if (change === 1 && currLength < 60) {
      currLength < 60 ? (currLength += 1) : currLength;

      newTime =
        currentHour + 1 <= 9
          ? `0${(currentHour += 1)}:${
              currentSeconds <= 9 ? "0" : ""
            }${currentSeconds}`
          : `${(currentHour += 1)}:${
              currentSeconds <= 9 ? "0" : ""
            }${currentSeconds}`;
    } else if (change === 0 && currLength > 1) {
      currLength > 1 ? (currLength -= 1) : currLength;

      // make sure we don't get into minus hour
      if (currentHour - 1 > -1) {
        newTime =
          currentHour - 1 <= 9
            ? `0${(currentHour -= 1)}:${
                currentSeconds <= 9 ? "0" : ""
              }${currentSeconds}`
            : `${(currentHour -= 1)}:${
                currentSeconds <= 9 ? "0" : ""
              }${currentSeconds}`;
      }
    }

    setSeshLength(currLength);
    setTimeLeft(newTime);
  }

  function handleBreakChange(change) {
    let currentTime = breakTimeLeft;
    let currLength = breakLength;
    let currentHour = parseInt(currentTime.substring(0, 2));
    let currentSeconds = parseInt(currentTime.substring(3, currentTime.length));
    let newTime = currentTime;

    if (change === 1 && currLength < 60) {
      currLength < 60 ? (currLength += 1) : currLength;

      newTime =
        currentHour + 1 <= 9
          ? `0${(currentHour += 1)}:${
              currentSeconds <= 9 ? "0" : ""
            }${currentSeconds}`
          : `${(currentHour += 1)}:${
              currentSeconds <= 9 ? "0" : ""
            }${currentSeconds}`;
    } else if (change === 0 && currLength > 1) {
      currLength > 1 ? (currLength -= 1) : currLength;

      // make sure we don't get into minus hour
      if (currentHour - 1 > -1) {
        newTime =
          currentHour - 1 <= 9
            ? `0${(currentHour -= 1)}:${
                currentSeconds <= 9 ? "0" : ""
              }${currentSeconds}`
            : `${(currentHour -= 1)}:${
                currentSeconds <= 9 ? "0" : ""
              }${currentSeconds}`;
      }
    }

    setBreakLength(currLength);
    setBreakTimeLeft(newTime);
  }

  const handleResetTimer = (e) => {
    setBreakLength(5);
    setSeshLength(25);
    setBreakTimeLeft(
      `${breakLength <= 9 ? "0" : ""}${breakLength}:${breakSecsStarting}`
    );
    setTimeLeft(`25:00`);
    setInProgress(true);
    if (timerStatus) setTimerStatus(false);
    audioToPlay.current.pause();
    audioToPlay.current.currentTime = 0;
  };

  const handleStartClock = (e) => {
    e.preventDefault();
    setTimerStatus(!timerStatus);
  };
  return (
    <Clock>
      <h1>Pomodoro Clock</h1>

      <ClockLengths>
        <BreakLength>
          <BreakLabel id="break-label">Break Length</BreakLabel>
          <p id="break-length">{breakLength}</p>
          <BreakDecrement id="break-decrement" onClick={handleBreakDecrement}>
            Break Decrement
          </BreakDecrement>
          <BreakIncrement id="break-increment" onClick={handleBreakIncrement}>
            Increment
          </BreakIncrement>
        </BreakLength>

        <SessionLength>
          <SessionLabel id="session-label">Session Length</SessionLabel>
          <p id="session-length">{seshLength}</p>
          <SessionDecrement
            id="session-decrement"
            onClick={handleSessionDecrement}
          >
            Session Decrement
          </SessionDecrement>
          <SessionIncrement
            id="session-increment"
            onClick={handleSessionIncrement}
          >
            Session Increment
          </SessionIncrement>
        </SessionLength>
      </ClockLengths>

      <ClockTimer>
        <TimerLabel id="timer-label">
          {inProgress ? "Session" : "Break has begun"}
        </TimerLabel>
        <p id="time-left">{inProgress ? timeLeft : breakTimeLeft}</p>
      </ClockTimer>

      <StartStop>
        <ButtonStart id="start_stop" onClick={handleStartClock}>
          {timerStatus ? "Stop" : "Start"}
        </ButtonStart>
        <ButtonReset id="reset" onClick={handleResetTimer}>
          Reset
        </ButtonReset>
      </StartStop>
      <AudioElement ref={audioToPlay} />
    </Clock>
  );
};

const AudioElement = React.forwardRef((props, ref) => {
  return (
    <audio ref={ref} id="beep">
      <source src="https://res.cloudinary.com/danielvanc/video/upload/v1592073663/alarm.mp3" />
    </audio>
  );
});

ReactDOM.render(<App />, document.getElementById("root"));
