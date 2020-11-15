// PLUGINS IMPORTS //
import React, { useState } from "react"
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  index: number
  navigation: any
  imageURL: string

  imagesURLsList: Array<any>
  popupVisible: boolean
  setPopupVisible: (popupVisibleStatus: boolean) => void
}

const ImageItem: React.FC<PropsType> = (props) => {
  const [isOffline, setIsOffline] = useState(false as boolean)

  return (
    <>
      {isOffline ? (
        <View style={[styles.image, styles.empty_wrap]}>
          <View style={styles.wifi_icon}>
            <Feather name="wifi-off" size={24} color="white" />
          </View>
        </View>
      ) : props.imageURL ? (
        <TouchableWithoutFeedback
          onPress={() => {
            props.setPopupVisible(false)
            props.navigation.navigate("GalleryScreen", {
              PhotosURLsList: props.imagesURLsList.map((imageURL: string) => {
                return {
                  url: imageURL,
                }
              }),
              initialPage: props.index,
            })
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: props.imageURL }}
            onError={() => setIsOffline(true)}
          />
        </TouchableWithoutFeedback>
      ) : (
        <View style={[styles.image, styles.empty_wrap]}>
          <ActivityIndicator color={"#674ABE"} />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 122,
    width: "100%",
    flex: 1,
  },

  empty_wrap: {
    justifyContent: "center",
    alignItems: "center",
  },

  wifi_icon: {
    backgroundColor: "orange",
    borderRadius: 100,
    padding: 10,
  },
})

export default React.memo(ImageItem, isEqualMemoComparison)
