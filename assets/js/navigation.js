(() => {
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navigationLinks = [...navigation.querySelectorAll('a')];

function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
});

navigationLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

// Track the section nearest the top, including short sections at the page end.
const sectionLinks = navigationLinks.filter(link => link.hash && document.getElementById(link.hash.slice(1)));
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1)));
let scrollQueued = false;
function updateActiveSection() {
  if (!sections.length) return;
  let activeSection = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 180) activeSection = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    activeSection = sections[sections.length - 1];
  }
  for (const link of sectionLinks) {
    if (link.hash === `#${activeSection.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeMenu();
  updateActiveSection();
});
updateActiveSection();

})();
