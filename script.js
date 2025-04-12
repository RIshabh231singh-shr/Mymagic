document.addEventListener("DOMContentLoaded", () => {
  //Radhe Radhe
  const heartContainer = document.querySelector(".floating-hearts");

  function createBubble() {
    const bubble = document.createElement("span");
    bubble.textContent = "Radhe Radhe";

    const size = Math.random() * 20 + 30; // size between 30-50px
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.fontSize = `${Math.random() * 0.5 + 0.8}rem`;
    bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;

    heartContainer.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 15000); // Remove after animation ends
  }

  setInterval(createBubble, 800); // One bubble every 0.8s

  //navbar
  const nav = document.querySelector(".navigation");
  const heroSection = document.querySelector("#hero");

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        nav.style.opacity = "1";
        nav.style.pointerEvents = "auto";
      } else {
        nav.style.opacity = "0";
        nav.style.pointerEvents = "none";
      }
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  observer.observe(heroSection);

  // Music Toggle
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.remove("muted");
    } else {
      bgMusic.pause();
      musicToggle.classList.add("muted");
    }
  });

  // Piano Melody
  const playMelody = document.getElementById("playMelody");
  const melodyAudio = document.getElementById("melodyAudio");

  playMelody.addEventListener("click", () => {
    melodyAudio.currentTime = 0;
    melodyAudio.play();
  });

  // Floating Hearts
  const floatingHearts = document.querySelector(".floating-hearts");
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${15 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    floatingHearts.appendChild(heart);
  }

  // Timeline Animation
  const timelineItems = document.querySelectorAll(".timeline-item");

  function checkScroll() {
    timelineItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < window.innerHeight * 0.8) {
        item.classList.add("animate");
      }
    });

    // Love Letter Animation
    const loveTexts = document.querySelectorAll(".love-text");
    loveTexts.forEach((text) => {
      const textTop = text.getBoundingClientRect().top;
      if (textTop < window.innerHeight * 0.8) {
        text.classList.add("visible");
      }
    });

    // Wishes Animation
    const wishCards = document.querySelectorAll(".wish-card");
    wishCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight * 0.8) {
        setTimeout(() => {
          card.classList.add("animate");
        }, index * 200);
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on load

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots
  carouselItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function goToSlide(index) {
    if (index < 0) index = carouselItems.length - 1;
    if (index >= carouselItems.length) index = 0;

    carouselItems.forEach((item, i) => {
      item.style.transform = `translateX(-${index * 100}%)`;
    });

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // Auto slide
  let slideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
  carousel.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  });

  // Video Modal
  const videoBtn = document.getElementById("videoButton");
  const videoModal = document.getElementById("videoModal");
  const closeVideoModal = videoModal.querySelector(".close-modal");
  const birthdayVideo = document.getElementById("birthdayVideo");

  videoBtn.addEventListener("click", () => {
    videoModal.style.display = "flex";
    // Add confetti when video opens
    createConfetti();
  });

  closeVideoModal.addEventListener("click", () => {
    videoModal.style.display = "none";
    birthdayVideo.pause();
  });

  birthdayVideo.addEventListener("ended", () => {
    createConfetti();
  });

  // Gallery Modal
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryModal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeGalleryModal = galleryModal.querySelector(".close-modal");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const caption = item.querySelector(".gallery-caption p").textContent;

      modalImage.src = imgSrc;
      modalCaption.textContent = caption;
      galleryModal.style.display = "flex";
    });
  });

  closeGalleryModal.addEventListener("click", () => {
    galleryModal.style.display = "none";
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      birthdayVideo.pause();
    }
    if (e.target === galleryModal) {
      galleryModal.style.display = "none";
    }
  });

  // Confetti Animation
  function createConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "9999";
    document.body.appendChild(confettiContainer);

    const colors = ["#f7cac9", "#d8c2e7", "#bd8c7d", "#d4af37", "#fffff0"];

    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 5 + 5}px`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.opacity = Math.random() * 0.5 + 0.5;
      confettiContainer.appendChild(confetti);

      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) rotate(${
              Math.random() * 360
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          fill: "forwards",
        }
      );
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 6000);
  }

  // Star Heart Animation
  const starHeart = document.getElementById("starHeart");

  function createStarParticle() {
    const particle = document.createElement("div");
    particle.className = "star-particle";

    // Heart shape coordinates using parametric equations
    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    particle.style.position = "absolute";
    particle.style.left = `${50 + x * 1.5}%`;
    particle.style.top = `${50 - y * 1.5}%`;
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.borderRadius = "50%";
    particle.style.background = "white";
    particle.style.opacity = "0.6";
    particle.style.boxShadow = `0 0 4px white`;

    starHeart.appendChild(particle);

    setInterval(() => {
      particle.style.opacity = Math.random() * 0.5 + 0.5;
      particle.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px white`;
    }, Math.random() * 2000 + 1000);
  }

  // Create 100 stars in heart shape
  for (let i = 0; i < 100; i++) {
    createStarParticle();
  }

  // EASTER EGG HEARTS
  const hiddenHearts = document.querySelectorAll(".hidden-heart");

  hiddenHearts.forEach((heart) => {
    const x = Math.random() * 90 + 5; // 5–95%
    const y = Math.random() * 80 + 10; // a little margin from top/bottom

    Object.assign(heart.style, {
      position: "fixed",
      left: `${x}%`,
      top: `${y}%`,
      width: "20px",
      height: "20px",
      background:
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f7cac9"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>\') no-repeat center center',
      backgroundSize: "contain",
      opacity: "0.3",
      cursor: "pointer",
      zIndex: "1000",
    });

    heart.addEventListener("click", () => {
      const message = heart.getAttribute("data-message");

      const popup = document.createElement("div");
      Object.assign(popup.style, {
        position: "fixed",
        left: `${x}%`,
        top: `${y - 5}%`,
        background: "white",
        padding: "10px 15px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: "1001",
        fontFamily: "Great Vibes, cursive",
        fontSize: "1.2rem",
        color: "#bd8c7d",
        transition: "opacity 0.5s ease",
      });

      popup.textContent = message;
      document.body.appendChild(popup);

      setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
      }, 3000);
      particle.style.animationDelay = `${Math.random() * 3}s`; // Stagger the glow for natural look
    });
  });
});
