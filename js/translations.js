// translations.js
// Simple i18n for Amharic (am), English (en) and Swedish (sv).
// Usage in HTML:
//   <span data-i18n="welcome"></span>
//   <input data-i18n-placeholder="placeholder.search" />
//   <select id="langSelect"><option value="en">English</option><option value="am">አማርኛ</option><option value="sv">Svenska</option></select>

(function (window, document) {
    var STORAGE_KEY = 'site_lang';

    var translations = {
        en: {
            title: "My Website",
            welcome: "Welcome",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.contact": "Contact",
            "btn.submit": "Submit",
            "placeholder.search": "Search...",
            language: "English"
        },
        sv: {
            title: "Min webbplats",
            welcome: "Välkommen",
            "nav.home": "Hem",
            "nav.about": "Om",
            "nav.contact": "Kontakt",
            "btn.submit": "Skicka",
            "placeholder.search": "Sök...",
            language: "Svenska"
        },
        am: {
            title: "የኔ ድህረ ገፅ",
            welcome: "እንኳን ደህና መጡ",
            "nav.home": "ዋና",
            "nav.about": "ስለ እኛ",
            "nav.contact": "አግኙን",
            "btn.submit": "አስገባ",
            "placeholder.search": "ፈልግ...",
            language: "አማርኛ"
        }
    };

    function getBrowserLang() {
        var nav = navigator.language || navigator.userLanguage || 'en';
        return nav.slice(0, 2).toLowerCase();
    }

    function getSavedLang() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* ignore */ }
    }

    function resolve(key, lang) {
        lang = lang || currentLang;
        var map = translations[lang] || translations.en;
        // support dot keys
        return (map && map[key]) || '';
    }

    function translatePage(lang) {
        lang = lang || currentLang;
        var els = document.querySelectorAll('[data-i18n]');
        els.forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var txt = resolve(key, lang);
            if (txt) el.textContent = txt;
        });

        var phEls = document.querySelectorAll('[data-i18n-placeholder]');
        phEls.forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            var txt = resolve(key, lang);
            if (txt) el.setAttribute('placeholder', txt);
        });

        var titleEls = document.querySelectorAll('[data-i18n-title]');
        titleEls.forEach(function (el) {
            var key = el.getAttribute('data-i18n-title');
            var txt = resolve(key, lang);
            if (txt) el.setAttribute('title', txt);
        });

        // optional: update document title if you have a title key
        var pageTitle = resolve('title', lang);
        if (pageTitle) document.title = pageTitle;

        // update language selector if present
        var sel = document.getElementById('langSelect');
        if (sel) sel.value = lang;
    }

    function setLanguage(lang) {
        if (!translations[lang]) lang = 'en';
        currentLang = lang;
        saveLang(lang);
        translatePage(lang);
        // expose current language
        window.currentLang = currentLang;
    }

    // init
    var currentLang = getSavedLang() || (function () {
        var b = getBrowserLang();
        return (b === 'sv' || b === 'am' || b === 'en') ? b : 'en';
    })();

    document.addEventListener('DOMContentLoaded', function () {
        translatePage(currentLang);

        // auto hook a select#langSelect if present
        var sel = document.getElementById('langSelect');
        if (sel) {
            // populate options if empty
            if (sel.options.length === 0) {
                var opts = [
                    { val: 'en', label: translations.en.language },
                    { val: 'am', label: translations.am.language },
                    { val: 'sv', label: translations.sv.language }
                ];
                opts.forEach(function (o) {
                    var option = document.createElement('option');
                    option.value = o.val;
                    option.text = o.label;
                    sel.add(option);
                });
            }
            sel.value = currentLang;
            sel.addEventListener('change', function (e) {
                setLanguage(e.target.value);
            });
        }
    }, false);

    // API
    window.i18n = {
        setLanguage: setLanguage,
        translatePage: translatePage,
        t: resolve,
        available: Object.keys(translations),
        current: function () { return currentLang; }
    };

})(window, document);