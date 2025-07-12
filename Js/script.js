
function renderCarousel(slides) {
    const container = document.getElementById('list');
    slides.forEach((slide, i) => {
      fetch('partials/carousel.html')
        .then(r => r.text())
        .then(tpl => {
          const temp = document.createElement('div');
          temp.innerHTML = tpl.trim();
          const item = temp.firstElementChild;
          item.style.backgroundImage = `url(${slide.img})`;
          if (slide.titulo) {
            item.querySelector('.titulo').textContent = slide.titulo;
            item.querySelector('.nombre').textContent = slide.nombre;
            item.querySelector('.descripcion').textContent = slide.descripcion;
            item.querySelector('#boton a').setAttribute('href', slide.link);
          }
          item.classList.add(`slide-${i+1}`);
          container.appendChild(item);
        });
    });
  }
function showSection() {
    const hash = location.hash.replace('#','') || 'home';
    document.querySelectorAll('main > section').forEach(sec => {
      sec.style.display = sec.id === hash + '-section' ? '' : 'none';
    });
    document.querySelectorAll('#barraNav a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + hash);
    });
}
fetch('partials/nav.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('nav-container').innerHTML = html;
    attachNavListeners();
  });
fetch('data/slides.json')
  .then(r => r.json())
  .then(slides => renderCarousel(slides))
  .catch(console.error);
window.addEventListener('load', showSection);
window.addEventListener('hashchange', showSection);
var siguienteBtn= document.querySelector('.next'),
    atrasBtn=document.querySelector('.prev'),
    carousel= document.querySelector('.carousel'),
    list= document.querySelector('.list'),
    item= document.querySelector('.item'),
    tiempoCambio= document.querySelector('.tiempoCambio');
let tiempoC=3000;
let tiempoAN=7000;

siguienteBtn.onclick= function(){
    mostrarSlider('next');
}
atrasBtn.onclick= function(){
    mostrarSlider('prev');
}
function mostrarSlider(type){
    let sliderItemsDom= list.querySelectorAll('.carousel .list .item');
    if (type=='next'){
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    }else{
        list.prepend(sliderItemsDom[sliderItemsDom.length-1]);
        carousel.classList.add('prev');
    }
}


