import { ComboboxOption } from "@/components/ui/combobox"
import { FormField } from "@/components/ui/form"
import { useSuspenseTags } from "@/services/tag/hooks/use-get-tags"

export interface FormFieldTagsProps {}

const FormFieldTags = (props: FormFieldTagsProps) => {
  const { data } = useSuspenseTags( { variables: { limit: 999 } })
  const tagOptions = data.data.map<ComboboxOption>((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }))

  return <FormField variant="SELECT" name="tags" label="Tags" options={tagOptions} multiple />
}

export default FormFieldTags
