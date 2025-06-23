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
    element.style.transform += ' scale(0.98)';
    setTimeout(() => {
        element.style.transform = element.style.transform.replace(' scale(0.98)', '');
    }, 150);
}

// Exportar funciones para uso en el HTML
window.RoseUtils = {
    vibrateDevice,
    addTouchFeedback
};
