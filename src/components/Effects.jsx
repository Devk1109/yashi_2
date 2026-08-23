import { useEffect } from "react";
import "./Effects.css";

function Effects() {
  useEffect(() => {
    launchBalloons();
    launchFireworks();
    launchCrackers();

    const timer1 = setTimeout(() => {
      launchFireworks();
    }, 3000);

    const timer2 = setTimeout(() => {
      launchCrackers();
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const launchBalloons = () => {
    const balloonEmojis = ["🎈", "💖", "🎈", "🌸", "🎈", "✨", "🎀"];
    const colors = [
      "#FF2D75",
      "#FFB703",
      "#00B4D8",
      "#9C27B0",
      "#06D6A0",
      "#FF6B9D",
    ];

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const balloon = document.createElement("div");
        balloon.className = "effects-balloon";
        balloon.textContent = balloonEmojis[i % balloonEmojis.length];

        const xPos = Math.random() * (window.innerWidth - 80);
        balloon.style.left = `${xPos}px`;
        balloon.style.color = colors[i % colors.length];

        const drift = (Math.random() - 0.5) * 240;
        const rotate = (Math.random() - 0.5) * 360;
        balloon.style.setProperty("--drift", `${drift}px`);
        balloon.style.setProperty("--rotate", `${rotate}deg`);
        balloon.style.animationDelay = `${Math.random() * 0.4}s`;

        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 8000);
      }, i * 250);
    }
  };

  const createFirework = (x, y, color) => {
    const particleCount = 36;
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "firework-particle";
      particle.style.background = color;
      particle.style.boxShadow = `0 0 8px ${color}`;

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 60 + Math.random() * 120;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      firework.appendChild(particle);
    }

    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1600);
  };

  const launchFireworks = () => {
    const colors = [
      "#FF007F",
      "#FFB703",
      "#00F5D4",
      "#FF6B9D",
      "#9C27B0",
      "#70E000",
      "#FF5400",
      "#7209B7",
    ];

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const x = 50 + Math.random() * (window.innerWidth - 100);
        const y = 80 + Math.random() * (window.innerHeight * 0.45);
        const color = colors[i % colors.length];
        createFirework(x, y, color);
      }, i * 350);
    }
  };

  const launchCrackers = () => {
    const crackerEmojis = ["🎉", "🎊", "✨", "🎆", "🎇", "💫", "🥳", "💖"];

    for (let i = 0; i < 16; i++) {
      setTimeout(() => {
        const cracker = document.createElement("div");
        cracker.className = "cracker";
        cracker.textContent = crackerEmojis[i % crackerEmojis.length];

        const x = 30 + Math.random() * (window.innerWidth - 60);
        const y = 40 + Math.random() * (window.innerHeight * 0.65);

        cracker.style.left = `${x}px`;
        cracker.style.top = `${y}px`;

        document.body.appendChild(cracker);
        setTimeout(() => cracker.remove(), 1100);
      }, i * 140);
    }
  };

  return null;
}

export default Effects;

