// Manejo del mensaje personalizado
const urlSearchParams = new URLSearchParams(window.location.search)
const messageCustom = urlSearchParams.get('message')

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage')
  mainMessageElement.textContent = decodeURI(messageCustom)
}

// Nueva funcionalidad de click en el sobre
const containerElement = document.querySelector('.container-letter')
let isOpen = false
let isAnimating = false // Nueva variable para controlar el estado de la animación

containerElement.addEventListener('click', () => {
  // Si está animando, ignorar el clic
  if (isAnimating) return

  const coverElement = document.querySelector('.cover')
  const paperElement = document.querySelector('.paper')
  const heartElement = document.querySelector('.heart')

  isAnimating = true // Iniciar estado de animación

  if (!isOpen) {
    // Abrir sobre
    coverElement.classList.add('open-cover')
    setTimeout(() => {
      coverElement.style.zIndex = -1
      paperElement.classList.remove('close-paper')
      paperElement.classList.add('open-paper')
      heartElement.style.display = 'block'
      
      // Permitir nueva interacción después de que termine la animación
      setTimeout(() => {
        isAnimating = false
      }, 1000) // 1000ms = duración total de las animaciones
    }, 500)
  } else {
    // Cerrar sobre
    paperElement.classList.remove('open-paper')
    paperElement.classList.add('close-paper')
    setTimeout(() => {
      coverElement.style.zIndex = 0
      coverElement.classList.remove('open-cover')
      heartElement.style.display = 'none'
      
      // Permitir nueva interacción después de que termine la animación
      setTimeout(() => {
        isAnimating = false
      }, 500)
    }, 1000)
  }
  
  isOpen = !isOpen
})