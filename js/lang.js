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
}