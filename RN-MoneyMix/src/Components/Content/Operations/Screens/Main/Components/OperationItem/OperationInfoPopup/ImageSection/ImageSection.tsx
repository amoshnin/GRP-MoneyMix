// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Firebase from "~/API/FirebaseConfig"

// COMPONENTS IMPORTS //
import ImageItem from "./ImageItem/ImageItem"
import { getImageURL } from "~/Components/Shared/Helpers/Functions/ReducersFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  PhotosURLsList: Array<any>

  popupVisible: boolean
  setPopupVisible: (popupVisibleStatus: boolean) => void
}

const ImageSection: React.FC<PropsType> = (props) => {
  const [imagesURLsList, setImagesURLsList] = useState([] as Array<any>)

  useEffect(() => {
    if (props.popupVisible) {
      props.PhotosURLsList.map((imageStorageID: string) => {
        if (props.isOnline) {
          getImageURL(
            Firebase.auth().currentUser?.email as any,
            imageStorageID,
            Firebase.storage()
          ).then((urlValue: string) => {
            setImagesURLsList((prevState) => [...prevState, urlValue])
          })
        } else {
          setImagesURLsList((prevState) => [...prevState, imageStorageID])
        }
      })
    }
  }, [props.PhotosURLsList])

  return (
    <View style={styles.container}>
      {imagesURLsList &&
        imagesURLsList.slice(0, 3).map((imageURL: string, index: number) => {
          return (
            <ImageItem
              index={index}
              navigation={props.navigation}
              imagesURLsList={imagesURLsList}
              imageURL={imageURL}
              popupVisible={props.popupVisible}
              setPopupVisible={props.setPopupVisible}
            />
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -3,
    flexDirection: "row",
  },

  image: {
    height: 122,
    width: "100%",
    flex: 1,
  },
})

export default React.memo(ImageSection, isEqualMemoComparison)
