(() => {
  // Keep the fixed global APlayer alive across PJAX navigations.
  // Butterfly calls loadMeting on every pjax:complete; skip when a fixed
  // instance is already mounted so playback is not interrupted.
  const patchMetingReload = () => {
    if (!window.globalFn || !window.globalFn.pjaxComplete) return false
    const current = window.globalFn.pjaxComplete.runMetingJS
    if (typeof current !== 'function' || current.__rayPersistPatched) return !!current

    const safeLoadMeting = () => {
      const fixedAlive =
        Array.isArray(window.aplayers) &&
        window.aplayers.some((player) => player && player.options && player.options.fixed)
      if (fixedAlive) return
      if (typeof loadMeting === 'function') loadMeting()
    }
    safeLoadMeting.__rayPersistPatched = true
    window.globalFn.pjaxComplete.runMetingJS = safeLoadMeting
    return true
  }

  const boot = () => {
    if (patchMetingReload()) return
    let tries = 0
    const timer = setInterval(() => {
      tries += 1
      if (patchMetingReload() || tries > 40) clearInterval(timer)
    }, 50)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
