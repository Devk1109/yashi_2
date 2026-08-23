import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Check localStorage to persist birthday reached state
  const [birthdayReached, setBirthdayReached] = useState(() => {
    const saved = localStorage.getItem("birthdayReached");
    return saved === "true";
  });

  const [showEffects, setShowEffects] = useState(false);

  const page1Ref = useRef(null); // Countdown page
  const page2Ref = useRef(null); // Celebration Page
  const page3Ref = useRef(null); // MessageCard
  const page4Ref = useRef(null); // Gallery
  const musicPlayerRef = useRef(null); // Music player control

  const goToPage = (pageNumber) => {
    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const currentPageRef = refs[currentPage];
    const nextPageRef = refs[pageNumber];

    const isForward = pageNumber > currentPage;

    // Animate out current page
    gsap.to(currentPageRef.current, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Prepare next page
    gsap.set(nextPageRef.current, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      visibility: "visible",
    });

    // Animate in next page
    gsap.to(nextPageRef.current, {
      x: "0%",
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
      delay: 0.15,
      onComplete: () => {
        setCurrentPage(pageNumber);
        gsap.set(currentPageRef.current, { x: "0%", visibility: "hidden" });
        gsap.to(window, { duration: 0.3, scrollTo: { y: 0 } });
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    localStorage.setItem("birthdayReached", "true");
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 10000);
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />

      {/* PAGE 1: Countdown Timer */}
      <div
        ref={page1Ref}
        className={`page ${currentPage === 1 ? "active" : ""}`}
        style={{ visibility: currentPage === 1 ? "visible" : "hidden" }}
      >
        <section className="hero">
          <div className="crown-badge">👑 Bestie Special Edition 👑</div>
          <h1 id="heroTitle">
            {birthdayReached ? (
              <>
                Happy Birthday <span className="highlight">Yashi</span> 🎂✨
              </>
            ) : (
              <>
                Counting down to <span className="highlight">Yashi's</span>{" "}
                Birthday 🎂
              </>
            )}
          </h1>
          <p className="hero-subtext">✨ Celebrating the most awesome, sweet & chaotic bestie ✨</p>
        </section>

        <Countdown
          onBirthdayReached={handleBirthdayReached}
          birthdayReached={birthdayReached}
        />

        <section className="teaser">
          <div className="teaser-card">
            <div className="teaser-icon">🎁</div>
            <h2 id="teaserHeading">
              {birthdayReached
                ? "💖 Your Grand Birthday Surprise is Ready! 💖"
                : "✨ A magical celebration awaits you at midnight... ✨"}
            </h2>
            <p className="teaser-hint">Get ready for something cute & unforgettable 💫</p>
          </div>
        </section>

        <button
          id="surpriseBtn"
          className="celebrate-btn"
          disabled={!birthdayReached}
          onClick={() => goToPage(2)}
        >
          <span className="btn-sparkles">🎀</span> Let's Celebrate! <span className="btn-sparkles">🎉</span>
        </button>
      </div>

      {/* PAGE 2: Celebration/QNA Page */}
      <div
        ref={page2Ref}
        className={`page ${currentPage === 2 ? "active" : ""}`}
        style={{ visibility: currentPage === 2 ? "visible" : "hidden" }}
      >
        <CelebrationPage
          onComplete={() => goToPage(3)}
          musicPlayerRef={musicPlayerRef}
        />
      </div>

      {/* PAGE 3: Message Card */}
      <div
        ref={page3Ref}
        className={`page ${currentPage === 3 ? "active" : ""}`}
        style={{ visibility: currentPage === 3 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(2)}>
          ← Back to Party
        </button>
        <MessageCard isActive={currentPage === 3} />
        <button className="page-nav-btn" onClick={() => goToPage(4)}>
          📸 View Our Memories Together ✨
        </button>
      </div>

      {/* PAGE 4: Gallery */}
      <div
        ref={page4Ref}
        className={`page ${currentPage === 4 ? "active" : ""}`}
        style={{ visibility: currentPage === 4 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(3)}>
          ← Back to Letter
        </button>
        <Gallery isActive={currentPage === 4} />
        <section className="final">
          <div className="bestie-card">
            <div className="bestie-duo-avatar">
              <span className="avatar-icon">⚡</span>
              <span className="heart-separator">💛</span>
              <span className="avatar-icon">🦘</span>
            </div>
            <h2 className="final-message"></h2>
            <p className="final-subtitle">
              Happiest Birthday to the sweetest, coolest girl in the world! 🌸✨
            </p>
            <div className="final-stickers">
              <span>🎂</span>
              <span>🍨</span>
              <span>🎈</span>
              <span>🎉</span>
              <span>💖</span>
            </div>
          </div>
        </section>
      </div>

      {/* Effects */}
      {showEffects && <Effects />}
    </div>
  );
}

export default App;

