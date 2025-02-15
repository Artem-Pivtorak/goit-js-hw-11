document.addEventListener("DOMContentLoaded", () => {
  const datetimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector('button[data-start]');
  const daysSpan = document.querySelector("[data-days]");
  const hoursSpan = document.querySelector("[data-hours]");
  const minutesSpan = document.querySelector("[data-minutes]");
  const secondsSpan = document.querySelector("[data-seconds]");

  let selectedDate = null;
  let timerIntervalId = null;

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  const fp = flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const date = selectedDates[0];

      if (date <= new Date()) {
        iziToast.error({
          title: "Error",
          message: "Please choose a date in the future",
          position: "topCenter",
        });
        startButton.disabled = true;
        selectedDate = null;
      } else {
        startButton.disabled = false;
        selectedDate = date;
      }
    },
  });

  function updateTimer() {
    const now = new Date();
    const deltaMs = selectedDate - now;

    if (deltaMs <= 0) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;

      daysSpan.textContent = "00";
      hoursSpan.textContent = "00";
      minutesSpan.textContent = "00";
      secondsSpan.textContent = "00";

      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaMs);

    daysSpan.textContent = days < 10 ? addLeadingZero(days) : days;
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }

  startButton.addEventListener("click", () => {
    if (!selectedDate) return;

    startButton.disabled = true;
    datetimePicker.disabled = true;

    updateTimer();
    timerIntervalId = setInterval(updateTimer, 1000);
  });
});
