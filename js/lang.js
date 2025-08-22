// 🌍 Load Language Content from JSON
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang-${lang}.json`);
    const data = await response.json();

    // Update welcome section
    //document.getElementById('welcome').innerHTML = data.welcome;

    // ✅ Update about-moto section
    document.getElementById('about-moto').innerHTML = data['about-moto'];
  } catch (error) {
    console.error("Could not load language file:", error);
  }
document.getElementById('nav-home').textContent = data['nav-home'];
document.getElementById('nav-about').textContent = data['nav-about'];
document.getElementById('nav-events').textContent = data['nav-events'];
document.getElementById('nav-contact').textContent = data['nav-contact'];
}