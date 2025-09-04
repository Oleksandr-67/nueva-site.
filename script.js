// Кнопки на сторінці Ціни: прорахунок у гривнях за курсом ПриватБанку
(async function () {
  const calcBtn = document.getElementById('calcUAH');
  const clearBtn = document.getElementById('clearUAH');
  if (!calcBtn) return;

  const reserveRate = 40.0; // резервний курс, якщо банк не відповідає
  let currentRate = null;

  async function getPrivatRate() {
    try {
      const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', { cache: 'no-store' });
      const data = await res.json();
      const usd = Array.isArray(data) ? data.find(x => (x.ccy === 'USD' || x.ccy === 'usd')) : null;
      const rate = usd && (usd.sale || usd.buy || usd.rate);
      return rate ? parseFloat(rate) : null;
    } catch (e) {
      return null;
    }
  }

  function renderUAH(rate) {
    document.querySelectorAll('[data-usd]').forEach(el => {
      const usd = parseFloat(el.getAttribute('data-usd'));
      const uah = Math.round(usd * rate);
      const holder = el.parentElement.querySelector('.uah');
      if (holder) holder.textContent = `≈ ${uah.toLocaleString('uk-UA')} грн`;
    });
  }

  function clearUAH() {
    document.querySelectorAll('.uah').forEach(el => el.textContent = '');
  }

  calcBtn.addEventListener('click', async () => {
    if (!currentRate) {
      currentRate = await getPrivatRate();
      if (!currentRate) currentRate = reserveRate;
    }
    renderUAH(currentRate);
  });

  clearBtn.addEventListener('click', clearUAH);
})();
/* reveal price on click */
function revealPrice(btn){
  const price = btn.getAttribute('data-price') || '';
  btn.outerHTML = `<span class="price-tag">${price} <small>≈ за курсом ПриватБанку</small></span>`;
}
