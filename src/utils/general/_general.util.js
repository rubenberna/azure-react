export const convertToKebabCase = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase();
}

export const isBase64encoded = (string) => {
  const regex = RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$')

  return regex.test(string)
}