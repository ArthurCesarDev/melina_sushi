"use client"


export function useFlyToCart() {
  const fly = (imgElement: HTMLImageElement, cartButton: HTMLElement) => {
    if (!imgElement || !cartButton) return

    const imgRect = imgElement.getBoundingClientRect()
    const cartRect = cartButton.getBoundingClientRect()

    const clone = imgElement.cloneNode(true) as HTMLImageElement
    clone.style.position = "fixed"
    clone.style.left = `${imgRect.left}px`
    clone.style.top = `${imgRect.top}px`
    clone.style.width = `${imgRect.width}px`
    clone.style.height = `${imgRect.height}px`
    clone.style.zIndex = "9999"
    clone.style.borderRadius = "12px"
    clone.style.transition = "all 0.8s cubic-bezier(0.5, -0.3, 0.7, 1.5)"
    document.body.appendChild(clone)

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left + cartRect.width / 2 - imgRect.width / 4}px`
      clone.style.top = `${cartRect.top}px`
      clone.style.opacity = "0.3"
      clone.style.transform = "scale(0.3)"
    })

    setTimeout(() => {
      clone.remove()
    }, 800)
  }

  return { fly }
}
