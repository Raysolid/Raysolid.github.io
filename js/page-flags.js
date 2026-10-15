(() => {
  const matchPage = (base) => {
    const path = location.pathname
    return path === base || path === `${base}/` || path.indexOf(`${base}/`) === 0
  }

  const syncPageFlags = () => {
    const isAbout = matchPage('/about')
    const isProjects = matchPage('/projects')
    const root = document.documentElement
    const body = document.body

    root.classList.toggle('page-about', isAbout)
    root.classList.toggle('page-projects', isProjects)
    if (body) {
      body.classList.toggle('page-about', isAbout)
      body.classList.toggle('page-projects', isProjects)
    }
  }

  window.syncRayPageFlags = syncPageFlags

  // Clear sticky flags as soon as navigation starts, then resync on complete.
  document.addEventListener('pjax:send', () => {
    document.documentElement.classList.remove('page-about', 'page-projects')
    if (document.body) document.body.classList.remove('page-about', 'page-projects')
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncPageFlags)
  } else {
    syncPageFlags()
  }

  document.addEventListener('pjax:complete', syncPageFlags)
})()
