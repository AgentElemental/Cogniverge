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
      description: '24-hour intensive coding marathon where you build amazing projects. Compete with the brightest minds, win amazing prizes, and showcase your innovation to industry leaders. Perfect for teams and individuals looking to push their coding skills to the limit.'
    },
    Poster_Presentation: {
      title: 'Poster Presentation',
      description: 'Test your problem-solving skills in real-world competitive programming challenges. Solve algorithmic problems under time pressure and compete against talented developers worldwide. Multiple rounds with increasing difficulty levels.'
    },
    PPT_Presentation: {
      title: 'PPT Presentation',
      description: 'Deep dive into machine learning and artificial intelligence techniques. Learn from experts about neural networks, deep learning, and practical AI applications in modern technology. Hands-on workshops and industry insights included.'
    },
    Workshop_Agentic_AI: {
      title: 'Workshop (Agentic AI)',
      description: 'Design, build, and program autonomous robots to complete challenging real-world tasks. Showcase your robotics expertise and compete in various categories for prizes. Teams will have access to state-of-the-art equipment.'
    },
    Code_Crime: {
      title: 'Code Crime',
      description: 'Hands-on cybersecurity challenge where you defend systems from cyber attacks. Learn ethical hacking techniques and security best practices from industry experts. Real-world scenarios and competitive environment.'
    },
    IPL_Auction: {
      title: 'IPL Auction',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
    },
    Double_Trouble: {
      title: 'Double Trouble',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
    },
    Anime_Fiesta: {
      title: 'Anime Fiesta',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
    },
    Smash_Karts_Tournament: {
      title: 'Smash Karts Tournament',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
    },
    Hit_and_Drop: {
      title: 'Hit & Drop',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
    },
    Vortex_Arena: {
      title: 'Vortex Arena',
      description: 'Master modern web technologies and frameworks. Learn responsive design, front-end and back-end development from industry professionals with hands-on projects. Build a complete project from scratch.'
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
