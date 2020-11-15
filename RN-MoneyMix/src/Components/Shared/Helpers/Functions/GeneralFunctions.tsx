import * as Localization from "expo-localization"
import AsyncStorage from "@react-native-community/async-storage"
import ImagePicker from "react-native-image-picker"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import { BackHandler } from "react-native"
import { useEffect } from "react"

export const setLocaleLanguage = async (i18n: any) => {
  const language = String(Localization.locale).slice(0, 2)

  if (language === "ru") {
    i18n.changeLanguage(language)
    await AsyncStorage.setItem("selectedLanguage", "Russian")
  } else if (language === "es") {
    i18n.changeLanguage(language)
    await AsyncStorage.setItem("selectedLanguage", "Spanish")
  } else if (language === "de") {
    i18n.changeLanguage(language)
    await AsyncStorage.setItem("selectedLanguage", "German")
  } else {
    i18n.changeLanguage("en")
    await AsyncStorage.setItem("selectedLanguage", "English")
  }
}

export const getImage = async (
  setFunction: (blob: Blob) => void,
  isCamera?: boolean,
  setURI?: (imageUri: string) => void
) => {
  if (Constants.platform?.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
    }
  }

  let options = {
    title: "Select Image",

    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  }

  if (isCamera) {
    ImagePicker.launchCamera(options, async (response) => {
      console.log("Response = ", response)

      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
        alert(response.customButton)
      } else {
        const photo = await fetch(response.uri)
        const blob = await photo.blob()
        setFunction(blob)
      }
    })
  } else {
    ImagePicker.launchImageLibrary(options, async (response) => {
      console.log("Response = ", response)

      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        setURI && setURI(response.uri)
        const photo = await fetch(response.uri)
        const blob = await photo.blob()
        setFunction(blob)
      }
    })
  }
}

export const handleBackButton = () => {
  BackHandler.exitApp()
}
