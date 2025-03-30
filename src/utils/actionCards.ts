import { ActionCard } from '../interfaces/ActionCard'

const CDN_URL = `${import.meta.env.VITE_CDN_URL}`
const MANIFEST_URL = `${CDN_URL}/manifest.json`

interface Manifest {
  [key: string]: { file: string }
}

const fetchManifest = async (): Promise<Manifest> => {
  const response = await fetch(`${MANIFEST_URL}?v=${new Date().getTime()}`)
  return response.json() as Promise<Manifest>
}

const getFilePath = (manifest: Manifest, key: string) => `${CDN_URL}/${manifest[key].file}`

export const initActionCards = async (dataProvider: { getData: () => ActionCard; getMode: () => string }) => {
  try {
    const manifest = await fetchManifest()
    const mainJsPath = getFilePath(manifest, 'src/main.tsx')
    const cssPath = getFilePath(manifest, 'src/assets/output.min.css')

    const module = (await import(/* @vite-ignore */ `${mainJsPath}`)) as {
      registerCustomComponent: (dataProvider: unknown, cssPath: string) => void
    }
    const { registerCustomComponent } = module
    registerCustomComponent(dataProvider, cssPath)
  } catch (error) {
    console.error('Failed to initialize action cards component:', error)
  }
}
