import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload'
import { SplitButton } from 'primereact/splitbutton'
import { Toolbar } from 'primereact/toolbar'
import React, { useRef } from 'react'

interface HeaderProps {
  sourceChanged: (file: File) => void
}

const Header: React.FC<HeaderProps> = ({ sourceChanged }) => {
  const fileUploadRef = useRef<FileUpload>(null)
  const items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ]

  const onSelect = (e: FileUploadSelectEvent) => {
    console.log('onUpload', e.files[0])
    sourceChanged(e.files[0])
    fileUploadRef.current?.clear()
  }

  const startContent = (
    <React.Fragment>
      <FileUpload ref={fileUploadRef} mode="basic" accept=".json" onSelect={onSelect} />
    </React.Fragment>
  )

  const endContent = (
    <React.Fragment>
      <SplitButton label="Save" model={items} icon="pi pi-check"></SplitButton>
    </React.Fragment>
  )
  return <Toolbar start={startContent} end={endContent} />
}

export default Header
