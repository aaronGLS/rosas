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

// Exportar funciones para uso en el HTML
window.RoseUtils = {
    vibrateDevice,
    addTouchFeedback
};
