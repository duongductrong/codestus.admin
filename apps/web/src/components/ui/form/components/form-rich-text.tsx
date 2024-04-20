// import { EditorProviderProps } from "@tiptap/react"
// import { ChangeEvent } from "react"
// import { InputProps } from "@/components/ui/input"
// import { RichText } from "@/components/ui/editor/rich-editor"

// export interface FormRichTextProps extends InputProps {}

// const FormRichText = ({ value, onBlur, onChange }: FormRichTextProps) => {
//   const handleUpdateContents: EditorProviderProps["onUpdate"] = ({ editor }) => {
//     if (onChange) {
//       onChange(editor.getHTML() as unknown as ChangeEvent<HTMLInputElement>)
//     }
//   }

//   return (
//     <RichText
//       content={value as string}
//       onBlur={({ event }) => onBlur && onBlur(event as any)}
//       onUpdate={handleUpdateContents}
//     />
//   )
// }

// export default FormRichText
