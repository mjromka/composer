/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findControlByAttributeName = function (controls: any, name: string) {
  for (const element of controls) {
    if (element.attributeName == name) {
      return element
    } else if (element.controls.length) {
      const control: any = findControlByAttributeName(element.controls, name)
      if (control) {
        return control
      }
    }
  }
}

export const findControlByKey = function (controls: any, name: string) {
  for (const element of controls) {
    if (element.key == name) {
      return element
    } else if (element.controls.length) {
      const control: any = findControlByKey(element.controls, name)
      if (control) {
        return control
      }
    }
  }
}
