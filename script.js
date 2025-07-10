// Script adicional para funcionalidades extras de la rosa
// Este archivo puede usarse para futuras mejoras

// Función para vibración táctil en dispositivos compatibles
function vibrateDevice() {
    if (navigator.vibrate) {
        navigator.vibrate(100); // Vibrar por 100ms
    }
}

// Función para feedback visual adicional en toque
function addTouchFeedback(element) {
    // Añadir clase temporal para efecto de pulsación
    element.classList.add('touch-feedback');
    
    // Remover la clase después de la transición para volver al estado normal
    setTimeout(() => {
        element.classList.remove('touch-feedback');
    }, 150);
}

// Función para detectar si es un dispositivo móvil
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para crear partículas brillantes
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = `${Math.random() * 5 + 2}px`;
    sparkle.style.height = sparkle.style.width;
    sparkle.style.backgroundColor = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.opacity = '1';
    sparkle.style.boxShadow = '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #ffeb3b';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '15';

    // Posición aleatoria alrededor del contenedor de la rosa
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 150 + 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    sparkle.style.left = `calc(50% + ${x}px)`;
    sparkle.style.top = `calc(50% + ${y}px - 100px)`;

    document.body.appendChild(sparkle);

    // Animación para desvanecer y eliminar la partícula
    sparkle.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: `scale(0.5) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)` }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-out'
    }).onfinish = () => {
        sparkle.remove();
    };
}

function triggerLetterAnimation() {
    const birthdayTextSpans = document.querySelectorAll('.birthday-text span');
    birthdayTextSpans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.05}s`;
        span.style.animationName = 'letter-appear'; // Asegura que la animación se aplique
    });
}

function resetLetterAnimation() {
    const birthdayTextSpans = document.querySelectorAll('.birthday-text span');
    birthdayTextSpans.forEach(span => {
        span.style.animationName = 'none'; // Quita la animación para poder reiniciarla
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const roseContainer = document.querySelector('.rose-container');
    const instruction = document.querySelector('.instruction');
    const loveMessage = document.querySelector('.love-message');
    const isMobile = isMobileDevice();
    
    // Variables para controlar el estado en móvil
    let isFlowering = false;

    if (isMobile) {
        // Comportamiento para dispositivos móviles
        console.log('Dispositivo móvil detectado');
        
        // Actualizar texto de instrucción para móvil
        instruction.textContent = 'Toca la rosa para ver la magia';                // Manejar toque en móvil - usar click para mejor compatibilidad
        roseContainer.addEventListener('click', (e) => {
            // Si la flor ya está abierta, no hacemos nada aquí. Dejamos que el evento
            // "burbujee" hasta el 'document' para que él gestione el cierre.
            if (isFlowering) {
                return;
            }

            // Si la flor está CERRADA, detenemos la propagación para que el 'document'
            // no la cierre inmediatamente después de abrirla.
            e.stopPropagation(); 
            
            // Vibración táctil si está disponible
            if (window.RoseUtils && window.RoseUtils.vibrateDevice) {
                window.RoseUtils.vibrateDevice();
            }
            
            // Activar efecto de florecimiento
            roseContainer.classList.add('mobile-active');
            instruction.style.opacity = '0';
            loveMessage.style.opacity = '1';
            loveMessage.style.transform = 'translateX(-50%) translateY(-10px)';
            triggerLetterAnimation();
            isFlowering = true;
            
            // Crear partículas brillantes
            for (let i = 0; i < 15; i++) {
                setTimeout(() => createSparkle(), i * 100);
            }
            
            // Feedback visual
            if (window.RoseUtils && window.RoseUtils.addTouchFeedback) {
                window.RoseUtils.addTouchFeedback(roseContainer);
            }
        });

        // Evento para cerrar la flor cuando se toca fuera de ella
        document.addEventListener('click', () => {
            // Solo actuar si la flor está abierta
            if (isFlowering) {
                // Ejecuta la lógica para CERRAR la flor
                roseContainer.classList.remove('mobile-active');
                instruction.style.opacity = '0.6';
                loveMessage.style.opacity = '0';
                loveMessage.style.transform = 'translateX(-50%) translateY(0)';

                // Resetea el estado y la animación del texto
                isFlowering = false;
                resetLetterAnimation(); // Llama a la función que resetea la animación de letras
            }
        });

        // Prevenir solo el zoom en touchstart pero permitir la propagación del evento
        roseContainer.addEventListener('touchstart', (e) => {
            // Prevenir solo comportamientos específicos como zoom en iOS
            // pero permitir que el evento siga su curso natural para generar el click
        });

    } else {
        // Comportamiento para desktop (ratón)
        console.log('Desktop detectado');
        
        // Actualizar texto de instrucción para desktop
        instruction.textContent = 'Pasa el ratón sobre la rosa';

        const loveMessage = document.querySelector('.love-message'); // Asegúrate de que esta variable está disponible aquí

        document.body.addEventListener('mousemove', (e) => {
            if (isMobile) return; // Doble chequeo para no ejecutar en móvil

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calcula el movimiento en un rango de -1 a 1
            const moveX = (clientX / innerWidth - 0.5) * 2;
            const moveY = (clientY / innerHeight - 0.5) * 2;

            // Aplica la transformación parallax. Los valores son pequeños para mantener la sutileza.
            // Es MUY IMPORTANTE no eliminar las animaciones que ya se controlan por CSS.
            // Este transform se combinará con las animaciones de balanceo.
            const roseTransform = `translateX(${moveX * 15}px) translateY(${moveY * 8}px)`;

            // El mensaje se mueve un poco más para aumentar la sensación de profundidad.
            // El 'translateX(-50%)' es para mantenerlo centrado.
            const messageTransform = `translateX(calc(-50% + ${moveX * 30}px)) translateY(${moveY * 15}px)`;

            roseContainer.style.setProperty('transform', roseTransform);

            // Solo modifica el transform del mensaje si la rosa está siendo "hovered"
            if (loveMessage.style.opacity === '1') {
                loveMessage.style.setProperty('transform', messageTransform);
            }
        });

        // Añade un listener para resetear la posición cuando el hover sobre la rosa termina
        roseContainer.addEventListener('mouseleave', () => {
             // Al salir, el CSS se encargará de volver a mostrar el mensaje con su transform original
             loveMessage.style.transform = 'translateX(-50%) translateY(0)';
             resetLetterAnimation();
        });

        // Efecto al pasar el ratón (solo desktop)
        roseContainer.addEventListener('mouseenter', () => {
            // Crear partículas brillantes
            for (let i = 0; i < 20; i++) {
                setTimeout(() => createSparkle(), i * 50);
            }
            triggerLetterAnimation();
        });

        // Opcional: agregar más partículas mientras el ratón está sobre la rosa
        roseContainer.addEventListener('mouseover', (e) => {
            if (Math.random() < 0.1) { // 10% de probabilidad cada vez
                createSparkle();
            }
        });
    }

    // Prevenir el menú contextual en móvil al mantener presionado
    roseContainer.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Optimización para dispositivos con pantalla táctil y ratón (híbridos)
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        // Dispositivo con puntero grueso (touch)
        roseContainer.style.cursor = 'pointer';
    }
});
