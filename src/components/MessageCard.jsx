import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  // Handle page transitions
  useEffect(() => {
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      const duration = isSmallMobile ? 1.1 : isMobile ? 1.3 : 1.4;
      const rotationAngle = isSmallMobile ? 12 : isMobile ? 15 : 18;

      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.35,
        ease: "power2.in",
      });

      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "-105%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "105%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.45,
          delay: isMobile ? 0.7 : 0.9,
        },
        0
      );

      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.7 : 0.9,
          ease: "back.out(1.3)",
          delay: isMobile ? 0.5 : 0.7,
        },
        0
      );
    }
  };

  const handleSendLove = (e) => {
    e.stopPropagation();
    setLoveCount((prev) => prev + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    const btn = document.querySelector(".send-love-btn");
    if (btn) {
      gsap.fromTo(
        btn,
        { scale: 0.85 },
        { scale: 1.1, yoyo: true, repeat: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  return (
    <section className="message">
      <div className="message-header">
        <span className="message-tag">💌 CONFIDENTIAL BIRTHDAY NOTE 💌</span>
        <h2>A Special Message For You ✨</h2>
      </div>

      <div className="curtain-container">
        <div className="curtain-rod">
          <div className="rod-finial finial-left"></div>
          <div className="rod-finial finial-right"></div>
        </div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the royal curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left">
            <div className="curtain-tassel tassel-left">🎀</div>
          </div>
          <div ref={curtainRightRef} className="curtain curtain-right">
            <div className="curtain-tassel tassel-right">🎀</div>
          </div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ Tap to Open Curtains 🎪 ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <div className="letter-stationery">
            <div className="washi-tape washi-left"></div>
            <div className="washi-tape washi-right"></div>

            <div className="stamp-badge">
              <span className="stamp-icon">👑</span>
              <span className="stamp-text">BESTIE AIRMAIL</span>
            </div>

            <div className="letter-greeting">
              Dear <span className="highlight-name">Yashi</span> 💖
            </div>

            <div className="typed-text-body">
              <p>
                <strong>Happy Birthday, Yashi! 🎉🎂</strong>
              </p>
              <p>
                Party toh dekho banti h, vo change nhi hoga ok na! 😉 And ha cake bhi katega chotu sa kyuki tum kehti toh ho ki u don't like celebration, but ha you like to celebrate deep down — itna toh tumhe janta hi hu! 🤭✨
              </p>
              <p>
                And ek din toh dekho <strong>ice cream tub khana h</strong> 🍨, vo bhi change nhi hoga pakka!
              </p>
              <p>
                Thank you fir se trust ke liye 💛.
              </p>
              <p className="letter-closing">
                Happpppppy Birthday! Enjoy karo aaj pure din aur fir story sunno! 🥳✨
              </p>
            </div>

            <div className="letter-footer">
              <button className="send-love-btn" onClick={handleSendLove}>
                💖 Send Love ({loveCount > 0 ? `${loveCount} ❤️` : "Tap to Heart"})
              </button>
              <span className="bestie-sign">~ Pikachu ⚡</span>
            </div>
          </div>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;

