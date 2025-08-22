// 🌍 Load Language Content from JSON
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang-${lang}.json`);
    const data = await response.json();

    const ids = ['welcome', 'about-moto', 'nav-home', 'nav-about', 'nav-events', 'nav-contact'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = data[id];
    });
  } catch (error) {
    console.error("Language loading failed:", error);
  }
}
