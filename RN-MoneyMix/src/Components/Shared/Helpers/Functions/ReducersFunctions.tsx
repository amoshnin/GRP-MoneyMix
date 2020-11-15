export const deleteImagesFromStorage = async (
  PhotosStorageIDsList: Array<any>,
  userEmail: string,
  storage: any,
  nextFunction?: () => void
) => {
  if (userEmail) {
    let arr = [] as Array<any>
    PhotosStorageIDsList.forEach(async (imageStorageID: string) => {
      const storageRef = storage.ref(
        `${userEmail}/operations/${imageStorageID}`
      )

      await storageRef.delete()
      arr = [...arr, "lol"]

      if (arr.length === PhotosStorageIDsList.length) {
        nextFunction && nextFunction()
      }
    })
  }
}

export const getImageURL = async (
  userEmail: string,
  imageStorageID: string,
  storage: any
) => {
  const storageRef = storage.ref(`${userEmail}/operations/${imageStorageID}`)

  return storageRef.getDownloadURL().then((url: string) => {
    return url
  })
}
