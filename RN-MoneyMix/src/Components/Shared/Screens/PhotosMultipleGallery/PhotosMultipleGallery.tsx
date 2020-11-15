// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import ImageItem from "./ImageItem/ImageItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  fullImagesURLsList: Array<any>

  deleteImagesFromStorageThunkCreator: (imagesIDs: Array<string>) => any
  getStorageDataThunkCreator: () => void
}

const PhotosMultipleGallery: React.FC<PropsType> = (props) => {
  const [images, setImages] = useState(
    [] as Array<{ url: string; storageID: string }>
  )
  const [selectedImagesIDs, setSelectedImagesIDs] = useState(
    [] as Array<string>
  )
  const { t } = useTranslation()
  const isDeleting = props.route.params.isDeleting

  useEffect(() => {
    props.getStorageDataThunkCreator()
  }, [])

  useEffect(() => {
    setImages(props.fullImagesURLsList)
  }, [props.fullImagesURLsList])

  useEffect(() => {
    if (isDeleting) {
      const filteredArray = images.filter(
        (image) => !selectedImagesIDs.includes(image.storageID)
      )
      props.deleteImagesFromStorageThunkCreator(selectedImagesIDs).then(() => {
        props.getStorageDataThunkCreator()
        setTimeout(() => {
          props.navigation.setParams({
            isDeleting: false,
          })
          setImages(filteredArray)
        }, 3000)
      })
    }
  }, [isDeleting])

  return (
    <ScrollView>
      <View style={styles.container}>
        {images && images.length > 0 ? (
          images.map((image, index: number) => {
            return (
              <ImageItem
                index={index}
                navigation={props.navigation}
                image={image}
                isDeleting={isDeleting}
                images={images}
                setImages={setImages}
                selectedImagesIDs={selectedImagesIDs}
                setSelectedImagesIDs={setSelectedImagesIDs}
              />
            )
          })
        ) : (
          <View>
            <View style={styles.empty_container}>
              <EmptyListSVG height={225} width={225} />
              <Text style={styles.empty_text}>
                {t("EmptyLists.EmptyPhotosMultipleGallery")}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  empty_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  empty_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
})

export default React.memo(PhotosMultipleGallery, isEqualMemoComparison)
