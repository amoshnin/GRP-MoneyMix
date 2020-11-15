// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, ScrollView, Text, StyleSheet, BackHandler } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import ProfileItem from "./ProfileItem/ProfileItem"

import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { renderProfile } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: any

  profilesArray: Array<string>
  RestoreDataFromCloudThunkCreator: () => void
  createNewProfileThunkCreator: (newProfileName: string) => any
  deleteProfileThunkCreator: (oldProfileName: string) => void
  getProfilesListThunkCreator: () => void
}

const SelectPopup: React.FC<PropsType> = (props) => {
  const [selectedProfile, setSelectedProfile] = useState("Genessral" as string)
  const [inputPopupVisible, setInputPopupVisible] = useState(false as boolean)
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  const getData = async () => {
    const selectedProfile = await AsyncStorage.getItem("selectedProfile")
    if (props.profilesArray.includes(selectedProfile as string)) {
      setSelectedProfile(selectedProfile as string)
    } else {
      setSelectedProfile(props.profilesArray[0])
      await AsyncStorage.setItem("selectedProfile", props.profilesArray[0])
    }
  }

  useEffect(() => {
    props.popupVisible && props.getProfilesListThunkCreator()
  }, [props.popupVisible])

  useEffect(() => {
    getData()
  }, [props.popupVisible])

  useEffect(() => {
    getData()
  }, [props.profilesArray])

  useEffect(() => {
    props.popupVisible && props.RestoreDataFromCloudThunkCreator()
  }, [selectedProfile])

  const fullProfilesArray = [
    ...props.profilesArray,
    ...props.profilesArray.map((profileName: string) =>
      renderProfile(profileName, t)
    ),
  ]

  return (
    <>
      <Dialog
        width={320}
        dialogStyle={styles.wrapper}
        visible={props.popupVisible}
        onTouchOutside={() => props.setPopupVisible(false)}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "top",
          } as any)
        }
        onDismiss={() =>
          BackHandler.addEventListener(
            "hardwareBackPress",
            () => BackHandler.exitApp() as any
          )
        }
      >
        <DialogContent>
          <ScrollView style={styles.container}>
            <View style={styles.header_wrap}>
              <Text style={styles.title}>{t("Header.Popups.Profile")}</Text>
              <BorderlessButton
                rippleColor="silver"
                onPress={() => {
                  props.setPopupVisible(false)
                  setInputPopupVisible(true)
                }}
              >
                <AntDesign name="plus" size={24} color="white" />
              </BorderlessButton>
            </View>

            {props.profilesArray &&
              props.profilesArray.map((profileTitle: string) => {
                return (
                  <ProfileItem
                    profileTitle={profileTitle}
                    selectedProfile={selectedProfile}
                    setSelectedProfile={setSelectedProfile}
                    setPopupVisible={props.setPopupVisible}
                    deleteProfileThunkCreator={props.deleteProfileThunkCreator}
                  />
                )
              })}
          </ScrollView>
        </DialogContent>
      </Dialog>
      <InputPopup
        popupVisible={inputPopupVisible}
        setPopupVisible={setInputPopupVisible}
        title={t("Header.Popups.CreateNewProfile")}
        saveFunction={async (value: string) => {
          if (
            fullProfilesArray.findIndex(
              (item) => value.trim().toLowerCase() === item.trim().toLowerCase()
            ) > -1
          ) {
            setInputPopupVisible(false)
            setAlertPopupVisible(true)
          } else {
            props.profilesArray.push(value)
            setSelectedProfile(value as string)
            await AsyncStorage.setItem("selectedProfile", value)
            props
              .createNewProfileThunkCreator(value as string)
              .then(() => getData())
          }
        }}
      />
      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t("PremiumVersionScreen.Popups.TitleProfileCreateError")}
        content={
          <Text>{t("PremiumVersionScreen.Popups.PPProfileCreateError")}</Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 0,
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17,
    position: "absolute",
    top: 0,
    height: 400,
  },

  container: {
    marginHorizontal: -18,
    marginBottom: -24,
  },

  header_wrap: {
    marginLeft: -1,
    backgroundColor: "#512DA8",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },
})

export default React.memo(SelectPopup, isEqualMemoComparison)
