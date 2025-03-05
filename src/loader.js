;(() => {
  const CDN_URL = `${import.meta.env.VITE_CDN_URL}`
  const MANIFEST_URL = `${CDN_URL}/manifest.json`

  const fetchManifest = async () => {
    const response = await fetch(`${MANIFEST_URL}?v=${new Date().getTime()}`)
    return response.json()
  }

  const getFilePath = (manifest, key) => `${CDN_URL}/${manifest[key].file}`

  window.initActionCards = async dataProvider => {
    try {
      const manifest = await fetchManifest()
      const mainJsPath = getFilePath(manifest, 'src/main.tsx')
      const cssPath = getFilePath(manifest, 'src/assets/output.min.css')

      const { registerCustomComponent } = await import(/* @vite-ignore */ `${mainJsPath}`)
      registerCustomComponent(dataProvider, cssPath)
    } catch (error) {
      console.error('Failed to initialize action cards component:', error)
    }
  }
})()
