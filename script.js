// Плавна прокрутка для внутрішніх посилань
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Кнопка "Показати ціну" на сторінках продуктів
document.querySelectorAll('.price-actions .btn[data-price]').forEach(btn => {
  btn.addEventListener('click', () => {
    const price = btn.getAttribute('data-price');
    btn.outerHTML = `<span class="chip chip--accent" style="font-weight:700">${price}</span>`;
  });
});

// Конвертація USD → UAH на сторінці цін
const toUAH = document.getElementById('toUAH');
const toUSD = document.getElementById('toUSD');

if (toUAH && toUSD) {
  const rateInput = document.getElementById('rate');
  const usdCells = Array.from(document.querySelectorAll('.price-usd'));
  const uahCells = Array.from(document.querySelectorAll('.price-uah'));

  toUAH.addEventListener('click', () => {
    const rate = parseFloat(rateInput.value || '41');
    usdCells.forEach((cell, i) => {
      const usd = parseFloat(cell.dataset.usd);
      const uah = Math.round(usd * rate);
      uahCells[i].textContent = new Intl.NumberFormat('uk-UA').format(uah) + ' ₴';
    });
  });

  toUSD.addEventListener('click', () => {
    uahCells.forEach(c => c.textContent = '—');
  });
}

