function updateActiveNav(targetId) {
  document.querySelectorAll('.nav-link').forEach(button => {
    button.classList.remove('active');
    if (button.dataset.target === targetId) {
      button.classList.add('active');
    }
  });
}

document.querySelectorAll('.nav-link').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const target = document.querySelector(targetId);

    updateActiveNav(targetId);

    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                const targetId = `#${entry.target.id}`;
                updateActiveNav(targetId);
            }, 300);
        }
    });
}, observerOptions);

document.querySelectorAll('.main > div[id]').forEach(section => {
    if (section.id !== 'contact') {
        observer.observe(section);
    }
});

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function downloadHtml() {
  const html = `<!doctype html>\n${document.documentElement.outerHTML}`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.html';
  a.click();
  URL.revokeObjectURL(url);
}