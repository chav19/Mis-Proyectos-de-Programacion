// Espera a que todo el documento HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript cargado y listo para pruebas en el navegador.");

    // Función para alternar el menú móvil de navegación (toggleMenu)
    const navMenu = document.querySelector('nav ul');
    
    // En el CSS pusimos un ::before que simula el botón, le damos clic a la lista para alternarla en móvil
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            // Si la pantalla es móvil, alternamos una clase activa para mostrar/ocultar los enlaces
            if (window.innerWidth <= 768) {
                navMenu.classList.toggle('is-open');
                console.log("Menú navegación alternado (Toggled).");
            }
        });
    }

    // Comportamiento de desplazamiento suave (Smooth Scrolling) para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log(`Desplazamiento suave hacia: ${targetId}`);
            }
        });
    });

    // Función ejemplo para filtrar proyectos (filterProjects)
    // Nota: Añade categorías imaginarias en tu consola para probarlo
    window.filterProjects = function(category) {
        const articles = document.querySelectorAll('#projects article');
        articles.forEach(article => {
            // Si la categoría es 'all' o coincide con el atributo de datos (opcional), se muestra
            if (category === 'all' || article.innerText.toLowerCase().includes(category.toLowerCase())) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
        console.log(`Proyectos filtrados por la categoría: ${category}`);
    };

    // Efecto Lightbox para las imágenes de los proyectos (Modal al hacer clic)
    const projectImages = document.querySelectorAll('#projects img');
    
    // Creamos la estructura del modal dinámicamente con JS para mantener limpio el HTML
    const lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightbox-modal';
    // Estilos rápidos e internos para el modal flotante oscuro
    lightboxModal.style.cssText = `
        display: none; position: fixed; z-index: 1000; left: 0; top: 0;
        width: 100%; height: 100%; background-color: rgba(0,0,0,0.9);
        justify-content: center; align-items: center; cursor: pointer;
    `;
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'max-width: 85%; max-height: 85%; border-radius: 4px; box-shadow: 0 0 20px rgba(255,255,255,0.2);';
    lightboxModal.appendChild(lightboxImg);
    document.body.appendChild(lightboxModal);

    // Evento para abrir el Lightbox al hacer clic en cualquier imagen de proyectos
    projectImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxModal.style.display = 'flex';
            console.log("Lightbox abierto para la imagen:", img.src);
        });
    });

    // Cerrar el Lightbox al hacer clic en el fondo oscuro
    lightboxModal.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
        console.log("Lightbox cerrado.");
    });

    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        // Validación en tiempo real (Feedback mientras el usuario escribe)
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
            // También validar cuando el usuario quita el cursor del campo
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });

        // Evento al intentar enviar el formulario completo
        contactForm.addEventListener('submit', (e) => {
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                e.preventDefault(); // Detiene el envío si hay errores
                alert("Por favor, corrige los campos marcados en rojo antes de enviar.");
                console.error("Formulario rechazado: Faltan campos requeridos o son inválidos.");
            } else {
                e.preventDefault(); // Detener envío real de ejemplo
                alert("¡Formulario validado y enviado con éxito! (Simulación)");
                console.log("Formulario enviado correctamente.");
                contactForm.reset();
                // Limpiamos los estilos de éxito tras reiniciar
                inputs.forEach(input => input.style.outline = 'none');
            }
        });
    }

    // Función auxiliar para validar campos individuales y dar feedback visual
    function validateField(input) {
        let isValid = true;
        const value = input.value.trim();

        // Validación si está vacío
        if (input.hasAttribute('required') && value === '') {
            isValid = false;
        }
        
        // Validación específica si es un campo de tipo Email
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Aplicamos el feedback visual modificando los bordes/outlines directamente
        if (!isValid) {
            input.style.outline = '2px solid #ef4444'; // Rojo si hay un error
            input.style.borderColor = '#ef4444';
            return false;
        } else {
            input.style.outline = '2px solid #22c55e'; // Verde si está correcto
            input.style.borderColor = '#22c55e';
            return true;
        }
    }
});