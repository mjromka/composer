import React from 'react'
import { Switch } from 'antd'

interface FormSwitchProps {
  label: string
  disabled?: boolean
  value?: boolean
  onChange?: (checked: boolean) => void
}

const FormSwitch: React.FC<FormSwitchProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Switch {...props} />
      <span>{label}</span>
    </label>
  )
}

export default FormSwitch
