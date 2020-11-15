// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-community/async-storage"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import DrawerItemComponent from "../Components/DrawerItemComponent/DrawerItemComponent"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import ChangePasswordPopup from "~/Components/Shared/Components/Popups/ChangePasswordPopup/ChangePasswordPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  localUserName: string | null
  PremiumFinishDate: string | null

  LogoutUserThunkCreator: () => void
  setLocalUserName: (newLocalUserName: string) => void
  setOfflinePopup: (offlinePopupVisibility: boolean) => void
}

const AccountInfo: React.FC<PropsType> = (props) => {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false as boolean)
  const [changeNamePopupVisible, setChangeNamePopupVisible] = useState(false)
  const [changePassPopupVisible, setChangePassPopupVisible] = useState(false)

  const submitNewLocalName = async (name: string) => {
    await AsyncStorage.setItem("localUserName", name as string)
  }
  const { t } = useTranslation()

  return (
    <>
      <Text style={styles.title}>
        {t("DrawerNavigator.ButtonsList.AccountInfo")}
      </Text>
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Subscription")}
        subtitle={`${t("GeneralPhrases.Until").toLowerCase()} ${dayjs(
          props.PremiumFinishDate as string
        ).format("DD")} ${t(
          `Header.Months.${dayjs(props.PremiumFinishDate as string).format(
            "MMMM"
          )}`
        )} ${dayjs(props.PremiumFinishDate as string).format("YYYY")} (${dayjs(
          props.PremiumFinishDate as string
        ).diff(dayjs(), "day")} ${t(
          "DrawerNavigator.ButtonsList.Days"
        ).toLowerCase()}) `}
        icon={
          <Image
            source={require("~/Images/star.png")}
            style={styles.star_img}
          />
        }
        onPress={() => props.navigation.navigate("PremiumVersionScreen")}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("CreateScreen.Header.Name")}
        subtitle={props.localUserName || ""}
        icon={<MaterialIcons name="account-circle" size={24} color="gray" />}
        onPress={() => setChangeNamePopupVisible(true)}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.ChangePassword")}
        icon={<MaterialIcons name="lock-outline" size={24} color="gray" />}
        onPress={() => setChangePassPopupVisible(true)}
        setOfflinePopupVisible={props.setOfflinePopup}
        isOffline={!props.isOnline}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Logout")}
        icon={<AntDesign name="logout" size={20} color="gray" />}
        onPress={() => setLogoutPopupVisible(true)}
      />
      <View style={styles.half_divider} />

      <AlertPopup
        popupVisible={logoutPopupVisible}
        setPopupVisible={setLogoutPopupVisible}
        content={
          <Text style={styles.text}>
            {t("DrawerNavigator.Popup.PPLogoutUser")}
          </Text>
        }
        confirmButtonText={t("DrawerNavigator.ButtonsList.Logout")}
        function={() => props.LogoutUserThunkCreator()}
      />

      <InputPopup
        title={t("CreateScreen.Header.Name") as string}
        value={props.localUserName as string}
        onChangeFunction={props.setLocalUserName}
        popupVisible={changeNamePopupVisible}
        setPopupVisible={setChangeNamePopupVisible}
        saveFunction={(text: string) => submitNewLocalName(text)}
      />

      <ChangePasswordPopup
        popupVisible={changePassPopupVisible}
        setPopupVisible={setChangePassPopupVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#674ABE",
    fontWeight: "bold",
    marginHorizontal: 13,
    marginTop: 14,
  },

  star_img: {
    height: 24,
    width: 24,
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  full_divider: {
    borderTopColor: "black",
    opacity: 0.15,
    borderTopWidth: 1,
    marginVertical: 3,
  },

  half_divider: {
    borderTopColor: "black",
    opacity: 0.15,
    borderTopWidth: 1,
    marginLeft: 50,
    marginVertical: 1,
  },

  text: {
    color: "black",
  },
})

export default React.memo(AccountInfo, isEqualMemoComparison)
