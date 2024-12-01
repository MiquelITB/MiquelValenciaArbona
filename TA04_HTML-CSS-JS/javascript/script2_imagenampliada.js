const imagenes = document.querySelectorAll('.galeria .imagen');

imagenes.forEach(imagen => {
    imagen.addEventListener('click', () => {
    if (imagen.classList.contains('ampliada')) {
        imagen.classList.remove('ampliada');
    } else {
        imagenes.forEach(img => img.classList.remove('ampliada'));
        imagen.classList.add('ampliada');
    }
  });
});