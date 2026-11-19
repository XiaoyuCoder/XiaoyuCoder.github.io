(() => {
  const sheet = document.querySelector('#site-dark-theme');
  let preference = 'light';
  try {
    const saved = localStorage.getItem('site-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch (_) {}
  function apply(value) {
    preference = value;
    sheet.media = value === 'dark' ? 'all' : 'not all';
  }
  apply(preference);
  window.siteTheme = {
    get preference() { return preference; },
    set(value) {
      if (!['light', 'dark'].includes(value)) return;
      apply(value);
      try { localStorage.setItem('site-theme', value); } catch (_) {}
    }
  };
})();
