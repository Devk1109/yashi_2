import { useEffect } from "react";
import "./Hearts.css";

const ICONS = ["💖", "💕", "✨", "🌸", "🎀", "🎉", "⭐", "🧁", "💫", "🦄", "🎈"];

function Hearts() {
  useEffect(() => {
    // Ambient floating particles
    const spawnHeart = () => {
      const container = document.querySelector(".hearts");
      if (!container) return;

      const heart = document.createElement("div");
      heart.className = "floating-particle";
      heart.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];

      const x = Math.random() * window.innerWidth;
      const size = 16 + Math.random() * 22;
      const drift = -60 + Math.random() * 120;
      const duration = 5000 + Math.random() * 4000;
      const initialRotation = Math.random() * 360;

      heart.style.left = `${x}px`;
      heart.style.bottom = "-40px";
      heart.style.fontSize = `${size}px`;
      heart.style.opacity = "0.75";

      container.appendChild(heart);

      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 2);

        const translateY = -(ease * (window.innerHeight + 100));
        const translateX = drift * progress;
        const rotate = initialRotation + progress * 60;
        const opacity = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        heart.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg)`;
        heart.style.opacity = `${opacity * 0.7}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          heart.remove();
        }
      };

      requestAnimationFrame(animate);
    };

    // Spawn regular interval
    const interval = setInterval(spawnHeart, 450);

    // Click / Touch particle burst
    const handlePointerDown = (e) => {
      const container = document.querySelector(".hearts");
      if (!container) return;

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      const burstCount = 6;
      for (let i = 0; i < burstCount; i++) {
        const spark = document.createElement("div");
        spark.className = "tap-spark";
        spark.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
        spark.style.left = `${clientX}px`;
        spark.style.top = `${clientY}px`;
        spark.style.fontSize = `${18 + Math.random() * 14}px`;

        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
        const distance = 40 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 20;

        spark.style.setProperty("--tx", `${tx}px`);
        spark.style.setProperty("--ty", `${ty}px`);

        container.appendChild(spark);
        setTimeout(() => spark.remove(), 900);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return <div className="hearts" aria-hidden="true"></div>;
}

export default Hearts;

