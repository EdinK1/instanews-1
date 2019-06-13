import capitalize from './utils/capitalize'
import cloneTemplate from './utils/cloneTemplate'

export default s => {
  const selectOption = cloneTemplate(
    'option-template',
    '.section-form__option',
  )
  selectOption.value = s
  selectOption.innerText = capitalize(s)

  return selectOption
}
