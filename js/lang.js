// 🌍 Load Language Content from JSON
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang-${lang}.json`);
    const data = await response.json();

    // Safely update each element only if it exists
    if (document.getElementById('welcome')) {
      document.getElementById('welcome').innerHTML = data.welcome;
    }

    if (document.getElementById('about-moto')) {
      document.getElementById('about-moto').innerHTML = data['about-moto'];
    }

 if (document.getElementById('nav-home')) {
  document.getElementById('nav-home').textContent = data['nav-home'];
}
if (document.getElementById('nav-about')) {
  document.getElementById('nav-about').textContent = data['nav-about'];
}
if (document.getElementById('nav-events')) {
  document.getElementById('nav-events').textContent = data['nav-events'];
}
if (document.getElementById('nav-contact')) {
  document.getElementById('nav-contact').textContent = data['nav-contact'];
}
  } catch (error) {
    console.error("Language loading failed:", error);
  }
}