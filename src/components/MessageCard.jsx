import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import messages from "../data/messages.json";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);
  const letterBodyRef = useRef(null);

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
        setCurrentIndex(0);

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

  const handleNextMessage = (e) => {
    if (e) e.stopPropagation();
    if (isTransitioning || messages.length <= 1) return;

    setIsTransitioning(true);
    if (letterBodyRef.current) {
      gsap.to(letterBodyRef.current, {
        opacity: 0,
        x: -20,
        scale: 0.97,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % messages.length);
          gsap.fromTo(
            letterBodyRef.current,
            { opacity: 0, x: 20, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
              onComplete: () => setIsTransitioning(false),
            }
          );
        },
      });
    } else {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setIsTransitioning(false);
    }
  };

  const handlePrevMessage = (e) => {
    if (e) e.stopPropagation();
    if (isTransitioning || messages.length <= 1) return;

    setIsTransitioning(true);
    if (letterBodyRef.current) {
      gsap.to(letterBodyRef.current, {
        opacity: 0,
        x: 20,
        scale: 0.97,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
          gsap.fromTo(
            letterBodyRef.current,
            { opacity: 0, x: -20, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
              onComplete: () => setIsTransitioning(false),
            }
          );
        },
      });
    } else {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
      setIsTransitioning(false);
    }
  };

  const currentMsg = messages[currentIndex] || messages[0] || {};

  return (
    <section className="message">
      <div className="message-header">
        <span className="message-tag">{currentMsg.tag || "💌 CONFIDENTIAL BIRTHDAY NOTE 💌"}</span>
        <h2>{currentMsg.title || "A Special Message For You ✨"}</h2>
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
              <span className="stamp-icon">{currentMsg.stamp?.icon || "👑"}</span>
              <span className="stamp-text">{currentMsg.stamp?.text || "BESTIE AIRMAIL"}</span>
            </div>

            <div ref={letterBodyRef} className="letter-inner-content">
              <div className="letter-greeting">
                {currentMsg.greeting || "Dear Yashi 💖"}
              </div>

              <div className="typed-text-body">
                {Array.isArray(currentMsg.paragraphs) ? (
                  currentMsg.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{currentMsg.paragraphs || currentMsg.message || ""}</p>
                )}
                {currentMsg.closing && (
                  <p className="letter-closing">{currentMsg.closing}</p>
                )}
              </div>

              <div className="letter-footer">
                <div className="letter-author-box">
                  <span className="author-label">From:</span>
                  <span className="bestie-sign">{currentMsg.author || "Bestie"}</span>
                </div>

                <div className="message-nav-controls">
                  {messages.length > 1 && (
                    <button
                      className="msg-nav-btn prev-msg-btn"
                      onClick={handlePrevMessage}
                      title="Previous message"
                      aria-label="Previous message"
                      disabled={isTransitioning}
                    >
                      ❮
                    </button>
                  )}

                  {messages.length > 1 && (
                    <span className="msg-counter">
                      {currentIndex + 1} / {messages.length}
                    </span>
                  )}

                  <button
                    className="msg-nav-btn next-msg-btn"
                    onClick={handleNextMessage}
                    title="Next message"
                    aria-label="Next message"
                    disabled={isTransitioning}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
