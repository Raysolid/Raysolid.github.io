(() => {
  const USER = 'Raysolid'
  const LANG_COLORS = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Java: '#b07219',
    Vue: '#41b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572a5',
    Go: '#00add8',
    Rust: '#dea584',
    Shell: '#89e051'
  }

  const CURATED = [
    {
      name: 'ciro-code',
      featured: true,
      tagline: '本地 Coding Agent',
      description:
        '本地编码智能体：CLI + Web workbench，强调可观测、可扩展的 agent harness，面向真实工程落地。',
      tags: ['coding-agent', 'typescript', 'cli', 'open-core'],
      demo: 'https://raysolid.github.io/ciro-code/'
    },
    {
      name: 'resume-agent',
      tagline: 'AI 简历智能体',
      description: 'Java 实现的简历辅助 Agent，沉淀提示词编排与任务流，服务求职提效。',
      tags: ['java', 'ai-agent', 'resume']
    },
    {
      name: 'estudy',
      tagline: '学习平台前端',
      description: 'Vue 学习/习题前端实践，关注信息架构与交互节奏。',
      tags: ['vue', 'frontend', 'education']
    },
    {
      name: 'game-hub',
      tagline: '迷你游戏平台',
      description: 'AI 辅助实现的小型游戏合集入口，强调快速原型与可玩性。',
      tags: ['javascript', 'games', 'ai-coding']
    }
  ]

  const LANG_FALLBACK = {
    'ciro-code': 'TypeScript',
    'resume-agent': 'Java',
    estudy: 'Vue',
    'game-hub': 'JavaScript'
  }

  const escapeHtml = (s = '') =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const formatNum = (n) => {
    if (n == null) return '—'
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return String(n)
  }

  const iconGithub = `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`
  const iconExternal = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-2.5a.75.75 0 00-1.5 0v2.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h2.5a.75.75 0 000-1.5h-2.5z"/><path d="M8.5 2.75a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V4.56l-4.47 4.47a.75.75 0 11-1.06-1.06l4.47-4.47H9.25a.75.75 0 01-.75-.75z"/></svg>`
  const iconStar = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>`
  const iconFork = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>`
  const iconRepo = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/></svg>`
  const iconCode = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"/></svg>`
  const iconHash = `<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.312 1.5a.75.75 0 01.676.443L8.2 5h4.05a.75.75 0 010 1.5H8.55l.85 3h3.35a.75.75 0 010 1.5h-2.95l.862 3.043a.75.75 0 01-1.418.402L8.35 11H4.3a.75.75 0 010-1.5h3.7l-.85-3H3.8a.75.75 0 010-1.5h2.95L5.888 1.957A.75.75 0 016.312 1.5z"/></svg>`

  const fallbackRepos = Object.fromEntries(
    CURATED.map((c) => [
      c.name,
      {
        name: c.name,
        html_url: `https://github.com/${USER}/${c.name}`,
        description: c.description,
        language: LANG_FALLBACK[c.name] || null,
        stargazers_count: 0,
        forks_count: 0,
        homepage: c.demo || '',
        topics: c.tags || [],
        fork: false
      }
    ])
  )

  const renderTags = (tags = []) =>
    tags.length
      ? `<div class="rp-tags">${tags
          .map((t) => `<span class="rp-tag">${iconHash} ${escapeHtml(t)}</span>`)
          .join('')}</div>`
      : ''

  const renderMeta = (repo) => {
    const lang = repo.language || 'Other'
    const color = LANG_COLORS[lang] || '#8b949e'
    return `
      <div class="rp-meta">
        <span class="rp-meta-item" title="主要语言"><span class="rp-lang-dot" style="background:${color}"></span>${escapeHtml(lang)}</span>
        <span class="rp-meta-item" title="Stars">${iconStar} ${formatNum(repo.stargazers_count || 0)}</span>
        <span class="rp-meta-item" title="Forks">${iconFork} ${formatNum(repo.forks_count || 0)}</span>
      </div>
    `
  }

  const renderIconBtn = (href, icon, label, accent = false) => `
    <a class="rp-icon-btn${accent ? ' is-accent' : ''}"
       href="${escapeHtml(href)}"
       target="_blank"
       rel="noopener"
       aria-label="${escapeHtml(label)}"
       data-tip="${escapeHtml(label)}">${icon}</a>
  `

  const renderStats = (profileStats) => `
    <div class="rp-metrics" id="rp-stats" role="group" aria-label="GitHub 概览">
      <div class="rp-metric">
        <span class="rp-metric-label">${iconRepo} 仓库</span>
        <strong class="rp-metric-value">${formatNum(profileStats?.repos)}</strong>
      </div>
      <div class="rp-metric">
        <span class="rp-metric-label">${iconStar} Star</span>
        <strong class="rp-metric-value">${formatNum(profileStats?.stars)}</strong>
      </div>
      <div class="rp-metric">
        <span class="rp-metric-label">${iconCode} 语言</span>
        <strong class="rp-metric-value">${formatNum(profileStats?.langs)}</strong>
      </div>
    </div>
  `

  const renderFeatured = (item, repo) => {
    const homepage = repo.homepage || item.demo
    return `
      <article class="rp-featured">
        <div class="rp-toolbar">
          <div class="rp-toolbar-left">
            <span class="rp-badge"><i class="fas fa-star"></i> 精选</span>
            ${renderMeta(repo)}
          </div>
          <div class="rp-icon-actions">
            ${renderIconBtn(repo.html_url, iconGithub, '打开仓库', true)}
            ${
              homepage
                ? renderIconBtn(homepage, iconExternal, '在线演示')
                : renderIconBtn(repo.html_url, iconExternal, '查看详情')
            }
          </div>
        </div>
        <h3><a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a></h3>
        <p class="rp-desc">${escapeHtml(item.description || repo.description || item.tagline)}</p>
        ${renderTags(item.tags || repo.topics || [])}
      </article>
    `
  }

  const renderCard = (item, repo) => {
    const desc = item.description || repo.description || item.tagline || 'Open source project'
    const homepage = repo.homepage || item.demo
    return `
      <article class="rp-card">
        <div class="rp-toolbar">
          <div class="rp-toolbar-left">
            <span class="rp-card-icon" aria-hidden="true">${iconGithub}</span>
            ${renderMeta(repo)}
          </div>
          <div class="rp-icon-actions">
            ${renderIconBtn(repo.html_url, iconGithub, '打开仓库', true)}
            ${
              homepage
                ? renderIconBtn(homepage, iconExternal, '在线演示')
                : `<span class="rp-icon-btn is-muted" data-tip="${escapeHtml(item.tagline || 'Repository')}" aria-label="${escapeHtml(item.tagline || 'Repository')}"><i class="fas fa-tag"></i></span>`
            }
          </div>
        </div>
        <h3><a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a></h3>
        <p class="rp-desc">${escapeHtml(desc)}</p>
        ${renderTags((item.tags || repo.topics || []).slice(0, 4))}
      </article>
    `
  }

  const paint = (root, repoMap, profileStats) => {
    const featuredItem = CURATED.find((c) => c.featured) || CURATED[0]
    const featuredRepo = repoMap[featuredItem.name] || fallbackRepos[featuredItem.name]
    const gridItems = CURATED.filter((c) => !c.featured)

    root.innerHTML = `
      <div class="rp-stage">
        <header class="rp-hero">
          <p class="rp-kicker">GitHub</p>
          <h1 class="rp-title">开源与工程实践</h1>
          <p class="rp-lead">精选仓库与项目说明，数据来自 GitHub。主要关注 Agent、全栈与可落地交付。</p>
          <div class="rp-actions rp-actions-hero">
            <a class="rp-btn rp-btn-primary" href="https://github.com/${USER}" target="_blank" rel="noopener">${iconGithub} 访问 GitHub</a>
            <a class="rp-btn rp-btn-ghost" href="https://github.com/${USER}?tab=repositories" target="_blank" rel="noopener">${iconExternal} 全部仓库</a>
          </div>
          ${renderStats(profileStats)}
        </header>

        <section class="rp-block">
          <div class="rp-section-head">
            <h2>精选项目</h2>
          </div>
          <div id="rp-featured">${renderFeatured(featuredItem, featuredRepo)}</div>
        </section>

        <section class="rp-block">
          <div class="rp-section-head">
            <h2>更多仓库</h2>
          </div>
          <div class="rp-grid" id="rp-grid">
            ${gridItems.map((item) => renderCard(item, repoMap[item.name] || fallbackRepos[item.name])).join('')}
          </div>
        </section>
      </div>
    `
  }

  const load = async (root) => {
    paint(root, fallbackRepos, { repos: CURATED.length, stars: 0, langs: 4 })
    try {
      const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, {
        headers: { Accept: 'application/vnd.github+json' }
      })
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const repos = await res.json()
      const own = repos.filter((r) => !r.fork && !r.archived)
      const map = Object.fromEntries(own.map((r) => [r.name, r]))
      const stars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0)
      const langs = new Set(own.map((r) => r.language).filter(Boolean))
      paint(root, map, { repos: own.length, stars, langs: langs.size })
    } catch (err) {
      console.warn('[ray-projects]', err)
    }
  }

  const initRayProjects = () => {
    const root = document.getElementById('ray-projects')
    if (!root) {
      document.documentElement.classList.remove('page-projects')
      document.body && document.body.classList.remove('page-projects')
      return
    }
    if (root.dataset.booted === '1' && root.querySelector('.rp-stage')) return
    root.dataset.booted = '1'
    document.documentElement.classList.add('page-projects')
    document.body && document.body.classList.add('page-projects')
    load(root)
  }

  const teardown = () => {
    document.documentElement.classList.remove('page-projects')
    document.body && document.body.classList.remove('page-projects')
    const root = document.getElementById('ray-projects')
    if (root) root.dataset.booted = '0'
  }

  window.initRayProjects = initRayProjects

  if (!window.__rayProjectsBound) {
    window.__rayProjectsBound = true
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRayProjects)
    } else {
      initRayProjects()
    }
    document.addEventListener('pjax:complete', initRayProjects)
    document.addEventListener('pjax:send', teardown)
  } else {
    initRayProjects()
  }
})()
