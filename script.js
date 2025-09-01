// Конвертація USD → UAH (ПриватБанк). Акуратно з CORS; є фолбек.
async function usdToUah(){
  try{
    const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const data = await res.json();
    const usd = data.find(r => r.ccy === 'USD');
    return parseFloat(usd.sale);
  }catch(e){
    console.warn('Курс не отримано, фолбек 41.0', e);
    return 41.0; // фолбек
  }
}

async function convertPrices(){
  const rate = await usdToUah();
  document.querySelectorAll('[data-price-usd]').forEach(el=>{
    const usd = parseFloat(el.dataset.priceUsd);
    const uah = Math.round(usd * rate).toLocaleString('uk-UA');
    el.innerText = `${uah} ₴`;
  });
  const rateBox = document.getElementById('rateNote');
  if(rateBox) rateBox.textContent = `Курс ПриватБанку ~ ${rate.toFixed(2)} UAH за 1 USD`;
}

window.addEventListener('DOMContentLoaded',()=>{
  const btn = document.getElementById('uahBtn');
  if(btn){ btn.addEventListener('click', convertPrices); }
});
