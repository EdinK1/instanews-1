export default (templateId, container) => {
  const $template = document.getElementById(templateId)
  return $template.content.cloneNode(true).querySelector(container)
}
