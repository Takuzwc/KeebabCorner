export function GetImageURL(name) {
  return new URL(`/../src/assets/images/${name}`, import.meta.url).href;
}
