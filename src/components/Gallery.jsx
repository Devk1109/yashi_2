import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Gallery.css";

function Gallery({ isActive }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photosRevealed, setPhotosRevealed] = useState(false);
  const [photoLikes, setPhotoLikes] = useState({});

  const photosRef = useRef([]);
  const lightboxImgRef = useRef(null);

  const photos = [
    { src: "/images/6.jpeg", alt: "Memory 1", caption: "Pure smiles & happy vibes! ✨" },
    { src: "/images/3.png", alt: "Memory 2", caption: "Sweet memories we cherish 💖" },
    { src: "/images/4.jpeg", alt: "Memory 3", caption: "Unfiltered fun moments 🥳" },
    { src: "/images/5.jpeg", alt: "Memory 4", caption: "Bestie energy at its peak! ⚡" },
    { src: "/images/1.jpeg", alt: "Memory 5", caption: "The classic cute snap 🌸" },
    { src: "/images/7.jpeg", alt: "Memory 6", caption: "Golden hour memories ☀️" },
    { src: "/images/8.jpeg", alt: "Memory 7", caption: "Never a dull moment! 💫" },
    { src: "/images/9.jpeg", alt: "Memory 8", caption: "Too cool for rules 😎" },
    { src: "/images/10.jpeg", alt: "Memory 9", caption: "Memories that make us smile 😊" },
    { src: "/images/11.jpeg", alt: "Memory 10", caption: "Laughter in every frame ✨" },
    { src: "/images/12.jpeg", alt: "Memory 11", caption: "The chaotic duo strikes again 😜" },
    { src: "/images/13.jpeg", alt: "Memory 12", caption: "Pure happiness! 💖" },
    { src: "/images/14.jpeg", alt: "Memory 13", caption: "Good times & great vibes 🎈" },
    { src: "/images/15.jpeg", alt: "Memory 14", caption: "Unforgettable days 🌟" },
    { src: "/images/16.jpeg", alt: "Memory 15", caption: "Stay awesome always! 👑" },
    { src: "/images/17.jpeg", alt: "Memory 16", caption: "The best bond 💛" },
    { src: "/images/18.jpeg", alt: "Memory 17", caption: "Picture perfect 📸" },
    { src: "/images/19.jpeg", alt: "Memory 18", caption: "Memories etched forever 💫" },
    { src: "/images/20.jpeg", alt: "Memory 19", caption: "Sweetest smile around 🌸" },
    { src: "/images/21.jpeg", alt: "Memory 20", caption: "Crazy times together 🤪" },
    { src: "/images/22.jpeg", alt: "Memory 21", caption: "Moments to treasure 💎" },
    { src: "/images/23.jpeg", alt: "Memory 22", caption: "Party animal vibes! 🥳" },
    { src: "/images/24.jpeg", alt: "Memory 23", caption: "The genuine joy 😄" },
    { src: "/images/25.jpeg", alt: "Memory 24", caption: "Fun times unlocked 🔑" },
    { src: "/images/26.jpeg", alt: "Memory 25", caption: "Forever besties ⚡🦘" },
    { src: "/images/27.jpeg", alt: "Memory 26", caption: "Making every day brighter 🌈" },
    { src: "/images/28.jpeg", alt: "Memory 27", caption: "Too many inside jokes 🤭" },
    { src: "/images/29.jpeg", alt: "Memory 28", caption: "Candid & cute 💕" },
    { src: "/images/30.jpeg", alt: "Memory 29", caption: "Celebrating life & friendship 🥂" },
    { src: "/images/31.jpeg", alt: "Memory 30", caption: "Radiant & glowing ✨" },
    { src: "/images/32.jpeg", alt: "Memory 31", caption: "Special moments captured 📷" },
    { src: "/images/33.jpeg", alt: "Memory 32", caption: "Awesome energy ⚡" },
    { src: "/images/34.jpeg", alt: "Memory 33", caption: "So many laughs together 😂" },
    { src: "/images/35.jpeg", alt: "Memory 34", caption: "True friendship magic 🪄" },
    { src: "/images/36.jpeg", alt: "Memory 35", caption: "Vibes that never fade 🌺" },
    { src: "/images/37.jpeg", alt: "Memory 36", caption: "Best times ahead 🚀" },
    { src: "/images/38.jpeg", alt: "Memory 37", caption: "Simply wonderful 💖" },
    { src: "/images/39.jpeg", alt: "Memory 38", caption: "One in a million 🌟" },
    { src: "/images/40.jpeg", alt: "Memory 39", caption: "The happiest memories 🎂" },
    { src: "/images/41.jpeg", alt: "Memory 40", caption: "Queen of the day 👑" },
    { src: "/images/42.jpeg", alt: "Memory 41", caption: "Never change, Yashi! 💖" },
    { src: "/images/43.jpeg", alt: "Memory 42", caption: "Cheers to our journey 🥂" },
    { src: "/images/44.jpeg", alt: "Memory 43", caption: "Pure positivity & love 🌸" },
    { src: "/images/45.jpeg", alt: "Memory 44", caption: "Our treasured scrapbook 📖" },
    { src: "/images/46.jpeg", alt: "Memory 45", caption: "Forever & always! 💛" },
  ];

  // Reveal photos with GSAP when page becomes active
  useEffect(() => {
    if (isActive && !photosRevealed) {
      setTimeout(() => setPhotosRevealed(true), 10);

      gsap.fromTo(
        photosRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.3)",
          delay: 0.15,
        }
      );
    }
  }, [isActive, photosRevealed]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);

    if (lightboxImgRef.current) {
      gsap.fromTo(
        lightboxImgRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }
      );
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const showNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % photos.length;
    if (lightboxImgRef.current) {
      gsap.to(lightboxImgRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            lightboxImgRef.current,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, photos.length]);

  const showPrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    if (lightboxImgRef.current) {
      gsap.to(lightboxImgRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            lightboxImgRef.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNext, showPrev, closeLightbox]);

  const toggleLike = (index, e) => {
    e.stopPropagation();
    setPhotoLikes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="gallery">
      <div className="gallery-header-sticky">
        <div className="gallery-badge">✨ TREASURED SCRAPBOOK ✨</div>
        <h2>📸 Cherished Memories With Yashi 💖</h2>
        <p className="gallery-subtitle">Tap on any picture to view full size & captions! 💫</p>
      </div>

      <div className="photos">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="polaroid-card"
            onClick={() => openLightbox(index)}
          >
            <div className="polaroid-pin">📍</div>
            <img
              ref={(el) => (photosRef.current[index] = el)}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <img
              ref={lightboxImgRef}
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
            />
            <div className="lightbox-caption-bar">
              <span className="lightbox-caption-text">
                {photos[currentIndex].caption}
              </span>
              <button
                className={`like-snap-btn ${photoLikes[currentIndex] ? "liked" : ""}`}
                onClick={(e) => toggleLike(currentIndex, e)}
              >
                {photoLikes[currentIndex] ? "💖 Loved!" : "🤍 Love"}
              </button>
            </div>
            <div className="lightbox-counter">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✖
          </button>
          <button
            className="nav-btn nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            className="nav-btn nav-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;

