// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { BackHandler } from "react-native"
import GallerySwiper from "react-native-gallery-swiper"
import { StatusBar } from "expo-status-bar"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
  navigation: any
}

const GalleryScreen: React.FC<PropsType> = (props) => {
  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
    }

    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton as any)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton as any
      )
    })
  }, [props.navigation])

  const photos = props.route.params.PhotosURLsList
  const initialPage = props.route.params.initialPage
  return (
    <>
      <GallerySwiper
        images={photos}
        initialPage={initialPage}
        initialNumToRender={initialPage}
      />
      <StatusBar style="light" backgroundColor="black" />
    </>
  )
}

export default React.memo(GalleryScreen, isEqualMemoComparison)
