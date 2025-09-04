// показ / приховування ціни на сторінках продуктів
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-toggle-price]');
  if(!btn) return;
  const box = btn.closest('.card');
  box.classList.toggle('show-price');
});

