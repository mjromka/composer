import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { TreeEventNodeEvent } from 'primereact/tree'
import Navigation from './components/Navigation'
import Form from './components/Form'
import ActionCardPreview from './components/ActionCardPreview'
import { ActionCard } from './interfaces/ActionCard'
import Header from './components/Header'
import { AppContextData } from './interfaces/AppContextData'
import { Fieldset } from 'primereact/fieldset'
import { DataService } from './services/DataService'
import { AppContext } from './AppContext'
import { TreeNodeData } from './interfaces/TreeNodeData'

const urlParams = new URLSearchParams(window.location.search)

function App() {
  const [data, setData] = useState<ActionCard>()
  const [selectedNode, setSelectedNode] = useState<TreeNodeData>()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const template = urlParams.get('template')
  useEffect(() => {
    if (template) {
      DataService.getTemplateData(template).then(data => {
        setData(data)
      })
    }
  }, [template])

  const onSelect = useCallback((event: TreeEventNodeEvent) => {
    setSelectedNode(event.node.data)
  }, [])

  const sourceChanged = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = async e => {
      const text = e.target?.result
      if (text) {
        const data = JSON.parse(text as string)
        setData(data)
      }
    }
    reader.readAsText(file)
  }, [])

  const context: AppContextData = {
    onChange: object => {
      if (data) {
        DataService.updateObject(data, object)
        setData({ ...data })
      }
      // refresh with debounce
      const timeout = setTimeout(() => {
        setRefreshTrigger(refreshTrigger + 1)
      }, 1000)
      return () => {
        clearTimeout(timeout)
      }
    },
  }

  return (
    <AppContext.Provider value={context}>
      <div className="h-screen w-screen flex flex-col">
        {!template && (
          <div className="px-4 pt-4">
            <Header sourceChanged={sourceChanged}></Header>
          </div>
        )}
        <div className="flex flex-1 overflow-auto p-4 gap-4">
          <div className="w-1/4">
            <Navigation onSelect={onSelect} data={data} />
          </div>
          <div className="h-full w-2/4">{selectedNode && <Form data={selectedNode} />}</div>
          <Fieldset className="h-full overflow-auto flex-1 p-2 w-1/4">
            {data && <ActionCardPreview data={data} trigger={refreshTrigger} />}
          </Fieldset>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
