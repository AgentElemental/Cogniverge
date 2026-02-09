// ===== Hamburger Menu =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
  });
});

// ===== Modal Functions =====
const modal = document.getElementById('eventModal');

function openModal(title, description) {
  if (!modal) return;
  
  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
    `;
  }
  
  modal.classList.add('active');
}

function closeModal(event) {
  if (event && event.target !== modal) return;
  modal?.classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// ===== Schedule Tab Switching =====
function switchDay(day) {
  // Hide all schedule contents
  document.querySelectorAll('.day-schedule').forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from all tabs
  document.querySelectorAll('.day-tab').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected day
  const selectedContent = document.querySelector(`.day-schedule[data-day="${day}"]`);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Add active class to clicked tab
  const activeTab = document.querySelector(`.day-tab[data-day="${day}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Set first tab as active on page load
document.addEventListener('DOMContentLoaded', () => {
  switchDay(1);
});

// ===== Event Selection Functions =====
function selectEvent(eventId) {
  // Show modal with event details
  const eventDetails = {
    Project_Expo: {
      title: 'Project Expo',
      description: 'Project Expo 2026 at MGIT Cogniverge is an inspiring platform built around the theme “Spark Ideas, Shine Bright, Win Big!”, where participants conceptualize, design, and develop innovative projects that highlight creativity, technical expertise, and real-world problem-solving. The expo offers a dynamic showcase experience in which participants present their ideas, explain their methodology, discuss challenges, and demonstrate practical solutions, while engaging with peers, mentors, and judges. Beyond competition and the opportunity to win cash prizes, the event fosters collaboration and valuable feedback, helping participants strengthen essential skills such as innovation, communication, and teamwork. Scheduled for 12th–13th February 2026, Project Expo 2026 is a celebration of ideas turning into impactful solutions.'
    },
    Poster_Presentation: {
      title: 'Poster Presentation',
      description: 'Showcase your technical ideas, research, and innovations through a visually impactful poster presentation that transforms complex concepts into clear, creative, and concise narratives. This event offers a professional platform for participants to design and present a technical poster detailing their chosen topic, methodology, and key insights before a panel of judges, with evaluation focused on innovation, technical depth, clarity of explanation, poster aesthetics, and presentation skills. Open to students from all colleges and all branches 🎓—think smart, design better, and let your ideas speak for themselves 🚀'
    },
    PPT_Presentation: {
      title: 'PPT Presentation',
      description: 'Compete in an engaging Paper Presentation 🎤.Showcase your ideas, research, and innovative solutions in front of a curious tech audience.Open to students from all colleges and all branches 🎓Team up, present smart, and prove your technical thinking & communication skills 🚀'
    },
    Workshop_Agentic_AI: {
      title: 'Workshop (Agentic AI)',
      description: 'Discover the world of Agentic AIs through an immersive and comprehensive workshop designed to introduce participants to the concepts, tools, and techniques behind building intelligent agents, empowering you to design, develop, and deploy your own AI-driven solutions with confidence and practical insight.'
    },
    Code_Crime: {
      title: 'Code Crime',
      description: 'Compete in an exciting Tech Quiz ⚡ followed by a one-of-a-kind AI Mystery Challenge 🤖🕵️ that tests logic, pattern recognition, and smart reasoning over rote learning. Open to students from all colleges and all branches 🎓, this event invites you to team up, think analytically, and prove your tech intelligence in a fast-paced, brain-teasing environment 🚀.'
    },
    IPL_Auction: {
      title: 'IPL Auction',
      description: 'Experience the thrill of an IPL-style auction where participants form teams and strategically bid for real IPL players using a virtual budget. This high-energy event blends cricket knowledge with smart planning and tactical decision-making as teams aim to build the strongest and most balanced squad within a fixed purse. With intense bidding battles, sharp strategies, and exciting prizes on the line, the ultimate team with the smartest picks emerges victorious—let the auction war begin! 🏏🔥'
    },
    Double_Trouble: {
      title: 'Double Trouble',
      description: 'Double Trouble 2026 is a high-energy, crowd-pulling event at MGIT Cogniverge that lives up to its name by delivering twice the excitement and twice the challenge. Designed to blend fun with friendly competition, this event invites participants to test both skill and focus in an engaging, fast-paced environment. With the theme “Double the Fun, Double the Challenge,” Double Trouble promises an experience that’s lively, interactive, and packed with adrenaline. The event features two thrilling games to look forward to: the Balloon Dart Challenge, where sharp aim and quick reflexes can earn you exciting prizes, and the Steady Hands Challenge, a precision-based test that pushes your concentration and control to the limit. Scheduled to take place on 12th and 13th February 2026, Double Trouble is more than just a game zone—it’s a celebration of fun, competition, and unforgettable moments, making it a must-attend highlight of Cogniverge.'
    },
    Anime_Fiesta: {
      title: 'Anime Fiesta',
      description: 'Step into a world where legends are born and fandoms collide at Anime Fiesta, a high-octane anime quiz crafted for true otakus, casual fans, and competitive minds alike. Spanning iconic classics to the latest chart-toppers, this event pushes your anime knowledge to its limits with mind-bending questions, visual and audio challenges, rapid-fire rounds, and unexpected twists that keep the adrenaline high. Whether you’re showcasing encyclopedic recall or teaming up with fellow fans, Anime Fiesta delivers intense competition, electric energy, and pure fandom thrill—because this isn’t just a quiz, it’s a full-scale celebration of anime culture. Think fast, play smart, and prove you’re the ultimate anime mastermind. 🔥'
    },
    Smash_Karts_Tournament: {
      title: 'Smash Karts Tournament',
      description: 'Get ready for high-speed action and nonstop fun with Smash Karts, an exciting multiplayer kart battle game where players race through vibrant arenas while using powerful weapons and boosts to smash their opponents. Fast-paced, competitive, and packed with surprises in every match, the game features quick rounds, easy-to-learn controls, and thrilling gameplay that keeps both players and spectators fully engaged. Step into the chaos, showcase your driving and combat skills, and battle your way to victory in an adrenaline-filled showdown.'
    },
    Hit_and_Drop: {
      title: 'Hit & Drop',
      description: 'Hit & Drop is a fun and engaging skill-based game where glasses are stacked in a pyramid formation and participants must use precision and timing to knock them all down by throwing a ball within a limited number of chances. The challenge lies in accurate aim and controlled power, as only the player who successfully clears the entire pyramid emerges victorious, making every attempt thrilling and competitive.'
    },
    Vortex_Arena: {
      title: 'Vortex Arena',
      description: 'Step into the arena and battle it out in the official Clash Royale Tournament at the College Fest, where sharp strategy, quick decision-making, and seamless teamwork define success. Compete against top players, showcase your skills in intense matchups, and fight your way to victory for glory and bragging rights.'
    },
  };

  const event = eventDetails[eventId];
  if (event && modal) {
    const modalBody = document.getElementById('modalBody');
    if (modalBody) {
      modalBody.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <button class="btn btn-red" style="margin-top: 20px;" onclick="document.getElementById('register').scrollIntoView({behavior: 'smooth'}); closeModal();">Register for Event</button>
      `;
    }
    modal.classList.add('active');
  }
}

function selectEventForRegistration(redirectUrl) {
  console.log('[v0] Redirecting to:', redirectUrl);
  window.location.href = redirectUrl;
}

// ===== Smooth Scroll Enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.documentElement.style.setProperty('--scroll-width', scrollPercent + '%');
});

// ===== Scroll-based Animations =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all event cards and feature blocks
document.querySelectorAll('.event-card, .feature-block, .speaker-card').forEach(el => {
  observer.observe(el);
});

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.feature-counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 30;
    
    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCount();
  });
}

// Trigger counter animation when section comes into view
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counters-animated')) {
      entry.target.classList.add('counters-animated');
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const whyCogniverge = document.querySelector('.why-cogniverge');
if (whyCogniverge) {
  counterObserver.observe(whyCogniverge);
}

// ===== Rotating Tagline Text =====
const taglines = ['Code.', 'Creativity.', 'Intelligence.'];
let taglineIndex = 0;
const taglineElement = document.querySelector('.hero-tagline');

function rotateTagline() {
  if (taglineElement) {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    taglineElement.style.opacity = '0';
    setTimeout(() => {
      taglineElement.textContent = taglines[taglineIndex];
      taglineElement.style.opacity = '1';
    }, 300);
  }
}

setInterval(rotateTagline, 3000);

// ===== Scroll Enhancement =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  // Progress tracking enabled
});

// ===== Animated Red Dots Background =====
const dotsContainer = document.querySelector('.red-dots');

if (dotsContainer) {
  const DOT_COUNT = 40;

  for (let i = 0; i < DOT_COUNT; i++) {
    const dot = document.createElement('span');

    const size = Math.random() * 4 + 3;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 25 + 10}s`;
    dot.style.animationDelay = `${Math.random() * 10}s`;

    dotsContainer.appendChild(dot);
  }
}




