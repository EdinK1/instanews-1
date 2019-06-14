import capitalize from '../utils/capitalize'
import cloneTemplate from '../utils/cloneTemplate'

export default class SectionOption {
  constructor(value) {
    this.el = cloneTemplate(
      'option-template',
      '.section-form__option',
    )
    this.el.value = value
    this.el.innerText = capitalize(value)
  }
}
