// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity, ActivityIndicator, Image } from "react-native"
import { StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  index: number
  navigation: any
  image: { url: string; storageID: string }
  isDeleting: boolean

  images: Array<any>
  setImages: (newImages: Array<any>) => void

  selectedImagesIDs: Array<string>
  setSelectedImagesIDs: (newSelectedImages: Array<string>) => void
}

const ImageItem: React.FC<PropsType> = (props) => {
  const isSelected = props.selectedImagesIDs.includes(props.image.storageID)

  const selectImage = () => {
    if (isSelected) {
      const filteredArray = props.selectedImagesIDs.filter(
        (imageStorageID: string) => imageStorageID !== props.image.storageID
      )
      props.setSelectedImagesIDs(filteredArray)
    } else {
      props.setSelectedImagesIDs([
        ...props.selectedImagesIDs,
        props.image.storageID,
      ])
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("GalleryScreen", {
          PhotosURLsList: props.images,
          initialPage: props.index,
        })
      }
    >
      <Image source={{ uri: props.image.url }} style={styles.image} />
      {!(props.isDeleting && isSelected) && (
        <TouchableOpacity style={styles.icon} onPress={selectImage}>
          {isSelected ? (
            <AntDesign name="checkcircle" size={19} color="silver" />
          ) : (
            <AntDesign name="checkcircleo" size={19} color="silver" />
          )}
        </TouchableOpacity>
      )}
      {props.isDeleting && isSelected && (
        <ActivityIndicator style={styles.loading} color={"white"} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 115,
    width: 115,
    flexWrap: "wrap",
    marginVertical: 3,
  },

  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  loading: {
    position: "absolute",
    top: "40%",
    left: "45%",
  },
})

export default React.memo(ImageItem, isEqualMemoComparison)
