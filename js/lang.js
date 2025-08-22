// 🌍 Load Language Content from JSON
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang-${lang}.json`);
    const data = await response.json();

    document.getElementById('welcome').textContent = data.welcome;
    document.getElementById('about').innerHTML = data.about;
  } catch (error) {
    console.error("Could not load language file:", error);
  }
}