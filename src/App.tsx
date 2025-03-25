import { Layout } from 'antd'
import './App.css'
import Navigation from './components/Navigation'
import ActionCardPreview from './components/ActionCardPreview'
import FormPlaceholder from './components/FormPlaceholder'
import React, { useState } from 'react'
import { DataService } from './services/DataService'
import { useAppContext } from './hooks/useAppContext'

const { Content } = Layout

function App() {
  const { actionCard } = useAppContext()
  const [selectedObject, setSelectedObject] = useState<{ type: string; object: { id: React.Key } }>()

  const onSelect = (selectedKey: React.Key) => {
    setSelectedObject(DataService.getObject(actionCard!, selectedKey))
  }

  return (
    <Layout className="h-screen w-screen flex flex-row gap-0">
      <Content className="w-1/4 p-4">
        <Navigation onSelect={onSelect} />
      </Content>
      <Content className="w-2/4 pt-4 pb-4 flex items-center justify-center">
        <FormPlaceholder data={selectedObject}></FormPlaceholder>
      </Content>
      <Content className="w-1/4 p-4 flex items-center justify-center">
        <ActionCardPreview></ActionCardPreview>
      </Content>
    </Layout>
  )
}

export default App
