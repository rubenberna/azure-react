export const convertToKebabCase = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase();
}