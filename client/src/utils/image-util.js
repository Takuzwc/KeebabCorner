export function GetImageURL(name) {
  return new URL(
    `/Users/Taku/Documents/git_Workspace/KeebabCorner/src/assets/images/${name}`,
    import.meta.url
  ).href;
}
