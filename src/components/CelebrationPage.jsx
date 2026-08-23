import { gsap } from "gsap";
import { useEffect, useState } from "react";
import "./CelebrationPage.css";
import Confetti from "./Confetti";

// Generate heart positions outside component to avoid render issues
const generateHeartPositions = () =>
  [...Array(16)].map(() => ({
    left: Math.random() * 95,
    delay: Math.random() * 5,
    duration: 7 + Math.random() * 5,
    icon: ["🥳", "✨", "💖", "🌸", "🎈", "🍰"][Math.floor(Math.random() * 6)],
  }));

const heartPositions = generateHeartPositions();

function CelebrationPage({ onComplete, musicPlayerRef }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [activatedButtons, setActivatedButtons] = useState({
    lights: false,
    music: false,
    cakeCut: false,
    decorate: false,
    balloons: false,
    message: false,
  });
  const [lightsOn, setLightsOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [showWishBanner, setShowWishBanner] = useState(false);

  // QNA Slides data
  const slides = [
    {
      icon: "🎉",
      badge: "DAY OF CELEBRATION",
      text: "It's Your Special Day Yeyey! 🥳",
      subtext: "Time for unlimited smiles, cake & fun vibes! 💖",
      type: "announcement",
    },
    {
      icon: "🎁",
      badge: "CURIOUS QUESTION",
      text: "Do you wanna see what I made for you??",
      subtext: "Pick an answer wisely... 😏✨",
      type: "question",
      options: [
        { text: "YESSS! 💖", value: "yes" },
        { text: "No 😜", value: "no" },
      ],
    },
    {
      icon: "👑",
      badge: "HERE WE GO",
      text: "Have a look at it, Duffer! 🤭🎂",
      subtext: "Let's turn this place into the ultimate party zone!",
      type: "announcement",
    },
  ];

  // Handle slide progression
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      gsap.to(".slide-content", {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.35,
        onComplete: () => {
          setCurrentSlide(currentSlide + 1);
          gsap.fromTo(
            ".slide-content",
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }
          );
        },
      });
    } else {
      gsap.to(".slides-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        onComplete: () => setShowButtons(true),
      });
    }
  };

  const handleAnswer = (value) => {
    if (value === "no") {
      setNoAttempts((prev) => prev + 1);
      const noBtn = document.querySelector(".no-button");
      if (noBtn) {
        gsap.timeline()
          .to(noBtn, { x: 30, rotation: 8, duration: 0.1 })
          .to(noBtn, { x: -30, rotation: -8, duration: 0.1 })
          .to(noBtn, { x: 20, rotation: 5, duration: 0.1 })
          .to(noBtn, { x: 0, rotation: 0, duration: 0.1 });
      }
    } else {
      handleNext();
    }
  };

  // Determine button sequence
  const showLightsButton = true;
  const showMusicButton = activatedButtons.lights;
  const showCakeCutButton = activatedButtons.music;
  const showDecorateButton = activatedButtons.cakeCut;
  const showBalloonsButton = activatedButtons.decorate;
  const showMessageButton = activatedButtons.balloons;

  useEffect(() => {
    if (showButtons) {
      gsap.fromTo(
        ".celebration-buttons",
        { opacity: 0, scale: 0.85, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }
      );
    }
  }, [showButtons]);

  useEffect(() => {
    if (showMusicButton && !activatedButtons.music) {
      const btn = document.querySelector('[data-button="music"]');
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showMusicButton, activatedButtons.music]);

  useEffect(() => {
    if (showCakeCutButton && !activatedButtons.cakeCut) {
      const btn = document.querySelector('[data-button="cakeCut"]');
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showCakeCutButton, activatedButtons.cakeCut]);

  useEffect(() => {
    if (showDecorateButton && !activatedButtons.decorate) {
      const btn = document.querySelector('[data-button="decorate"]');
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showDecorateButton, activatedButtons.decorate]);

  useEffect(() => {
    if (showBalloonsButton && !activatedButtons.balloons) {
      const btn = document.querySelector('[data-button="balloons"]');
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showBalloonsButton, activatedButtons.balloons]);

  useEffect(() => {
    if (showMessageButton) {
      const btn = document.querySelector('[data-button="message"]');
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
        );
      }
    }
  }, [showMessageButton]);

  const executeCakeCutting = () => {
    if (isCutting || activatedButtons.cakeCut) return;

    setIsCutting(true);

    const knife = document.querySelector(".cake-knife");
    const timeline = gsap.timeline();

    // 1. Move knife into position above cake
    timeline.to(knife, {
      opacity: 1,
      x: 10,
      y: -10,
      rotation: -30,
      duration: 0.5,
      ease: "power2.out",
    });

    // 2. Slice down into cake
    timeline.to(knife, {
      x: -5,
      y: 65,
      rotation: 12,
      duration: 0.7,
      ease: "power2.inOut",
    });

    // 3. Shake slightly as it cuts through layers
    timeline.to(knife, {
      x: -12,
      duration: 0.2,
      yoyo: true,
      repeat: 2,
    });

    // 4. Knife lifts back up and sparkles
    timeline.to(knife, {
      y: -40,
      x: 40,
      rotation: -45,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setIsCutting(false);
        setActivatedButtons((prev) => ({ ...prev, cakeCut: true }));
        setShowWishBanner(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4500);

        // Animate out the slice onto the plate
        const slice = document.querySelector(".separated-slice-card");
        if (slice) {
          gsap.fromTo(
            slice,
            { opacity: 0, scale: 0.4, x: -30, y: -20 },
            { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.6)" }
          );
        }
      },
    });
  };

  const handleButtonClick = (buttonType) => {
    if (activatedButtons[buttonType]) return;

    const button = document.querySelector(`[data-button="${buttonType}"]`);
    if (button) {
      gsap.to(button, {
        scale: 0.92,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    if (buttonType === "cakeCut") {
      executeCakeCutting();
      return;
    }

    setActivatedButtons((prev) => ({ ...prev, [buttonType]: true }));

    if (buttonType === "lights") {
      setLightsOn(true);
      gsap.to(".celebration-page", {
        background: "linear-gradient(135deg, #180824 0%, #2f123d 50%, #1e092b 100%)",
        duration: 1.2,
        ease: "power2.inOut",
      });
      return;
    }

    if (buttonType === "music") {
      if (musicPlayerRef && musicPlayerRef.current) {
        musicPlayerRef.current.play();
      }
    }

    setTimeout(() => {
      const decoration = document.querySelector(`.decoration-${buttonType}`);
      if (decoration) {
        if (buttonType === "decorate") {
          gsap.fromTo(
            decoration,
            { opacity: 0, y: -60, scaleY: 0.6 },
            { opacity: 1, y: 0, scaleY: 1, duration: 0.9, ease: "bounce.out" }
          );
        } else if (buttonType === "music") {
          gsap.fromTo(
            decoration,
            { opacity: 0, scale: 0.4, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)" }
          );
        } else if (buttonType === "balloons") {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4500);

          gsap.fromTo(
            decoration,
            { opacity: 0, y: 250 },
            { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" }
          );
        }
      }
    }, 150);

    if (buttonType === "message") {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200);
    }
  };

  return (
    <div className={`celebration-page ${lightsOn ? "lights-on" : ""}`}>
      {showConfetti && <Confetti />}

      {/* Floating festive icons background */}
      <div className="floating-hearts-bg">
        {heartPositions.map((pos, i) => (
          <div
            key={i}
            className="heart-float"
            style={{
              left: `${pos.left}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          >
            {pos.icon}
          </div>
        ))}
      </div>

      {/* QNA Slides Section */}
      {!showButtons && (
        <div className="slides-container">
          <div className="slide-content">
            <div className="slide-badge">{slides[currentSlide].badge}</div>
            <div className="slide-icon">{slides[currentSlide].icon}</div>
            <h2 className="slide-text">{slides[currentSlide].text}</h2>
            <p className="slide-subtext">{slides[currentSlide].subtext}</p>

            {slides[currentSlide].type === "question" ? (
              <div className="question-wrapper">
                <div className="question-options">
                  <button
                    className="option-button yes-button"
                    onClick={() => handleAnswer("yes")}
                  >
                    {slides[currentSlide].options[0].text}
                  </button>
                  <button
                    className="option-button no-button"
                    onClick={() => handleAnswer("no")}
                  >
                    {noAttempts > 0
                      ? noAttempts === 1
                        ? "Are you sure? 😜"
                        : noAttempts === 2
                        ? "Try again! 😂"
                        : "Click Yes! 💖"
                      : slides[currentSlide].options[1].text}
                  </button>
                </div>
                {noAttempts > 0 && (
                  <p className="playful-warning">⚠️ "No" is strictly forbidden on your birthday! 😜</p>
                )}
              </div>
            ) : (
              <button className="next-button" onClick={handleNext}>
                {currentSlide < slides.length - 1 ? "Next Step ✨" : "Let's Decorate! 🎉"}
              </button>
            )}
          </div>

          <div className="slide-progress">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentSlide ? "active" : ""
                } ${index < currentSlide ? "completed" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Celebration Room & Action Buttons */}
      {showButtons && (
        <>
          <div className="celebration-buttons">
            <div className="party-zone-badge">🎪 THE BIRTHDAY ARENA 🎪</div>
            <h2 className="celebration-title">Let's Celebrate, Yashi! 🎉</h2>
            <p className="celebration-subtitle">
              Tap the magical buttons below to set up your party!
            </p>

            <div className="buttons-grid">
              {showLightsButton && !activatedButtons.lights && (
                <button
                  className="action-button lights-button"
                  data-button="lights"
                  onClick={() => handleButtonClick("lights")}
                >
                  💡 1. Turn On Fairy Lights
                </button>
              )}

              {showMusicButton && !activatedButtons.music && (
                <button
                  className="action-button music-button"
                  data-button="music"
                  onClick={() => handleButtonClick("music")}
                >
                  🎵 2. Bring The Birthday Cake & Music
                </button>
              )}

              {showCakeCutButton && !activatedButtons.cakeCut && (
                <button
                  className="action-button cut-cake-button"
                  data-button="cakeCut"
                  onClick={() => handleButtonClick("cakeCut")}
                >
                  🔪 3. Cut The Birthday Cake! 🎂✨
                </button>
              )}

              {showDecorateButton && !activatedButtons.decorate && (
                <button
                  className="action-button decorate-button"
                  data-button="decorate"
                  onClick={() => handleButtonClick("decorate")}
                >
                  🎨 4. Hang Birthday Bunting
                </button>
              )}

              {showBalloonsButton && !activatedButtons.balloons && (
                <button
                  className="action-button balloons-button"
                  data-button="balloons"
                  onClick={() => handleButtonClick("balloons")}
                >
                  🎈 5. Release The Balloons & Confetti
                </button>
              )}

              {showMessageButton && (
                <button
                  className="action-button message-button"
                  data-button="message"
                  onClick={() => handleButtonClick("message")}
                >
                  💌 Well, I Have a Special Message for You Tamatar 💖
                </button>
              )}
            </div>
          </div>

          {/* Festive Room Decorations */}
          <div className="decorations-container">
            {/* 1. Fairy String Lights */}
            {activatedButtons.lights && (
              <div className="decoration-lights string-lights">
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className={`light light-${i % 4}`}
                    style={{
                      left: `${4 + i * 5.2}%`,
                      animationDelay: `${(i % 5) * 0.25}s`,
                    }}
                  >
                    <div className="bulb-glow"></div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Birthday Bunting Garlands */}
            {activatedButtons.decorate && (
              <div className="decoration-decorate bunting">
                <div className="bunting-string">
                  {"HAPPY BIRTHDAY YASHI ✨".split("").map((letter, i) => (
                    <div
                      key={i}
                      className={`bunting-flag flag-${i % 5} ${letter === " " ? "space-flag" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Delicious Birthday Cake with Interactive Cutting */}
            {activatedButtons.music && (
              <div className="decoration-music cake-container">
                {/* Wish Banner after cut */}
                {showWishBanner && (
                  <div className="wish-banner">
                    <span className="wish-tag">🎉 FIRST SLICE FOR YASHI! 🍰</span>
                    <p className="wish-text">Make a special wish, Bestie! ✨💖</p>
                  </div>
                )}

                <div
                  className={`cake ${activatedButtons.cakeCut ? "cake-is-cut" : ""}`}
                  onClick={!activatedButtons.cakeCut ? executeCakeCutting : undefined}
                  style={{ cursor: !activatedButtons.cakeCut ? "pointer" : "default" }}
                  title={!activatedButtons.cakeCut ? "Click to cut the cake! 🔪" : "Happy Birthday Yashi!"}
                >
                  {/* Floating Knife */}
                  <div className={`cake-knife ${isCutting ? "cutting" : ""}`}>
                    <span className="knife-blade">🗡️</span>
                    <span className="knife-ribbon">🎀</span>
                  </div>

                  {!activatedButtons.cakeCut && (
                    <div className="cut-hint-badge">✨ Tap Cake or Button to Cut! 🔪</div>
                  )}

                  <div className="cake-sparkles">✨ 🌸 ✨</div>

                  {/* Candle Flames */}
                  <div className="cake-candles">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="candle">
                        <div className={`flame ${activatedButtons.cakeCut ? "blown-out" : ""}`}></div>
                        {activatedButtons.cakeCut && <div className="smoke-puff">💨</div>}
                        <div className="wick"></div>
                      </div>
                    ))}
                  </div>

                  {/* Top Layer */}
                  <div className="cake-layer layer-top">
                    <div className="icing-drips">
                      <span className="drip"></span>
                      <span className="drip"></span>
                      <span className="drip"></span>
                      <span className="drip"></span>
                    </div>
                    <div className="strawberries">🍓 🍓 🍓</div>
                    {activatedButtons.cakeCut && <div className="cut-wedge top-wedge"></div>}
                  </div>

                  {/* Middle Layer */}
                  <div className="cake-layer layer-middle">
                    <div className="layer-frosting"></div>
                    {activatedButtons.cakeCut && <div className="cut-wedge middle-wedge"></div>}
                  </div>

                  {/* Bottom Layer */}
                  <div className="cake-layer layer-bottom">
                    <div className="layer-base-shadow"></div>
                    {activatedButtons.cakeCut && <div className="cut-wedge bottom-wedge"></div>}
                  </div>

                  <div className="cake-plate"></div>
                </div>

                {/* Separated Slice on Plate */}
                {activatedButtons.cakeCut && (
                  <div className="separated-slice-card">
                    <div className="slice-plate">
                      <div className="served-slice">🍰</div>
                      <div className="served-fork">🍴</div>
                      <div className="served-label">For Yashi 💖</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. Cheerful Floating Balloons */}
            {activatedButtons.balloons && (
              <div className="decoration-balloons">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`balloon balloon-${i % 4}`}
                    style={{
                      left: `${6 + i * 11}%`,
                      animationDelay: `${i * 0.18}s`,
                      animationDuration: `${3.5 + (i % 3) * 0.6}s`,
                    }}
                  >
                    <div className="balloon-body">
                      <div className="balloon-shine"></div>
                    </div>
                    <div className="balloon-knot"></div>
                    <div className="balloon-string"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CelebrationPage;


