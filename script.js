document.addEventListener("DOMContentLoaded", () => {
  // Анимация для fade-in элементов
  document.querySelectorAll(".fade-in").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 200 + i * 200);
  });

  // Таймер до свадьбы
  function startCountdown() {
    const eventDate = new Date("2025-08-21T17:00:00+03:00");

    function update() {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        document.querySelector(".countdown").innerHTML = "Мероприятие уже началось!";
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
      const days = Math.floor((totalSeconds / (24 * 60 * 60)) % 7);
      const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
      const minutes = Math.floor((totalSeconds / 60) % 60);
      const seconds = totalSeconds % 60;

      document.getElementById("weeks").textContent = String(weeks).padStart(2, '0');
      document.getElementById("days").textContent = String(days).padStart(2, '0');
      document.getElementById("hours").textContent = String(hours).padStart(2, '0');
      document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
      document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown();

  // Именное приглашение через ?name=Имя
  const params = new URLSearchParams(window.location.search);
  const nameRaw = params.get("name");
  if (nameRaw) {
    const name = decodeURIComponent(nameRaw);
    const greeting = document.getElementById("personalized");
    if (greeting) greeting.textContent = `Уважаемый (ая) ${name}!`;
  }

  // Плавный автоскролл на второй экран через 8 секунд
  function smoothScrollTo(targetY, duration = 2000) {
    const startY = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));
      const scrollY = startY + (targetY - startY) * easeInOut;

      window.scrollTo(0, scrollY);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

  setTimeout(() => {
    const section = document.querySelector(".details-screen");
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(offsetTop, 2000); // 2 секунды плавности
    }
  }, 8000); // через 8 секунд

  // Музыка — кнопка включения/выключения
  const button = document.getElementById("music-btn");
  const music = document.getElementById("bg-music");

  if (button && music) {
    button.classList.add("fade-in");
    button.style.opacity = 0;
    button.style.transform = "translateY(20px)";
    setTimeout(() => {
      button.style.transition = "opacity 1s ease, transform 1s ease";
      button.style.opacity = 1;
      button.style.transform = "translateY(0)";
    }, 1000);

    button.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => {
      button.innerHTML = "Выключить музыку <span style='text-decoration: line-through;'>♪</span>";
    }).catch(err => {
      console.error("Ошибка при воспроизведении музыки:", err);
    });
  } else {
    music.pause();
    music.currentTime = 0;
    button.innerHTML = "Включить музыку ♪";
    }
    });
    }
});