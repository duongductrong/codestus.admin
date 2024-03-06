"use client"

import { ReactNode } from "react"
import { usePromptInternalActions, usePromptStore } from "."
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog"


export interface PrompterProps {
  children?: ReactNode
}

export const Prompter = ({ children }: PrompterProps) => {
  const promptState = usePromptStore()
  const promptActions = usePromptInternalActions()

  return (
    <AlertDialog open={promptState.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{promptState.title}</AlertDialogTitle>
          <AlertDialogDescription>{promptState.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={promptActions.close}>
            {promptState.cancelText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={promptActions.ok}>
            {promptState.confirmText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
