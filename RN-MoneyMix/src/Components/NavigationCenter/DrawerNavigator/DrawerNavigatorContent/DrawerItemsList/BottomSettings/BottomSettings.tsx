// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import * as Linking from "expo-linking"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import DrawerItemComponent from "../Components/DrawerItemComponent/DrawerItemComponent"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isOnline: boolean
  isAuthentificated: boolean

  downloadSVGThunkCreator: (t: any) => any
  deleteAllDataThunkCreator: (i18n: any) => any
  setOfflinePopup: (offlinePopupVisibility: boolean) => void
}

const BottomSettings: React.FC<PropsType> = (props) => {
  const [rateAppPopupVisible, setRateAppPopupVisible] = useState(false)
  const [deleteDataPopupVisible, setDeleteDataPopupVisible] = useState(false)
  const [CSVDownloadPopupVisible, setCSVDownloadPopupVisible] = useState({
    visible: false as boolean,
    positive: true as boolean,
  })
  const { t, i18n } = useTranslation()

  const deleteData = () => {
    props.deleteAllDataThunkCreator(i18n)
  }

  return (
    <>
      <Text style={styles.title}>
        {t("DrawerNavigator.ButtonsList.Settings")}
      </Text>
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.ReserveData")}
        icon={<AntDesign name="sync" size={24} color="gray" />}
        onPress={() => {
          if (props.isOnline) {
            props.isAuthentificated
              ? props.navigation.navigate("ReserveDataScreen")
              : props.navigation.navigate("PremiumVersionScreen")
          }
        }}
        clearAttributes
        vipOption={props.isAuthentificated ? false : true}
        isOffline={!props.isOnline}
        setOfflinePopupVisible={props.setOfflinePopup}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.ExportDataInCSV")}
        icon={<Ionicons name="md-document" size={24} color="gray" />}
        onPress={() => {
          props.isAuthentificated
            ? props
                .downloadSVGThunkCreator(t)
                .then(() =>
                  setCSVDownloadPopupVisible({ visible: true, positive: true })
                )
                .catch(() =>
                  setCSVDownloadPopupVisible({ visible: true, positive: false })
                )
            : props.navigation.navigate("PremiumVersionScreen")
        }}
        clearAttributes
        vipOption={props.isAuthentificated ? false : true}
      />
      <View style={styles.half_divider} />
      {/* <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.BankSMS")}
        icon={<MaterialIcons name="phonelink-ring" size={24} color="gray" />}
        onPress={() => {
          props.isAuthentificated
            ? props.navigation.navigate("BankSMSSettings")
            : props.navigation.navigate("PremiumVersionScreen")
        }}
        clearAttributes
        vipOption={props.isAuthentificated ? false : true}
      /> */}
      {/* <View style={styles.half_divider} /> */}
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.DeleteData")}
        icon={
          <MaterialCommunityIcons name="delete" size={24} color="#FF3940" />
        }
        onPress={() => {
          setDeleteDataPopupVisible(true)
        }}
        clearAttributes
      />
      <View style={styles.full_divider} />
      {/*  */}
      <Text style={styles.title}>
        {t("DrawerNavigator.ButtonsList.AppInfo")}
      </Text>
      <DrawerItemComponent
        title="Money Mix"
        icon={<Feather name="info" size={24} color="gray" />}
        onPress={() => {
          setRateAppPopupVisible(true)
        }}
        clearAttributes
      />
      <View style={styles.half_divider} />
      <View style={{ marginBottom: 10 }}>
        <DrawerItemComponent
          title={t("DrawerNavigator.ButtonsList.ContactSupport")}
          icon={<FontAwesome name="envelope-o" size={24} color="gray" />}
          onPress={() => {
            Linking.openURL("mailto:moneyappcorp@gmail.com")
          }}
          clearAttributes
        />
      </View>

      <AlertPopup
        popupVisible={deleteDataPopupVisible}
        setPopupVisible={setDeleteDataPopupVisible}
        content={<Text>{t("DrawerNavigator.Popup.PPDeleteData")}</Text>}
        function={deleteData}
      />
      <AlertPopup
        popupVisible={rateAppPopupVisible}
        setPopupVisible={setRateAppPopupVisible}
        title={t("DrawerNavigator.Popup.RateAppTitle")}
        content={<Text>{t("DrawerNavigator.Popup.PPRateApp")}</Text>}
        function={() =>
          Linking.openURL(`market://details?id=${"com.monmix"}`).catch((err) =>
            alert("Please check for the Google Play Store")
          )
        }
      />

      <AlertPopup
        popupVisible={CSVDownloadPopupVisible.visible}
        setPopupVisible={(popupVisibility: boolean) =>
          setCSVDownloadPopupVisible({
            positive: CSVDownloadPopupVisible.positive,
            visible: popupVisibility,
          })
        }
        content={
          <View>
            <Text style={styles.popup_title}>
              {CSVDownloadPopupVisible.positive
                ? t("DrawerNavigator.Popup.TitleCSVDownload")
                : t("DrawerNavigator.Popup.TitlePCSFailDownload")}
            </Text>
            <Text>
              {CSVDownloadPopupVisible.positive
                ? t("DrawerNavigator.Popup.PPCSVDownload")
                : t("DrawerNavigator.Popup.PPCSVFailDownload")}
            </Text>
            {CSVDownloadPopupVisible.positive && (
              <Text style={styles.dir_text}>
                {`(Download/MoneyMix-Report-${dayjs().format(
                  "DD:MM:YYYY-hh:mm"
                )}.csv)`}
              </Text>
            )}
          </View>
        }
        removeCancelBtn
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
    marginBottom: 4,
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

  popup_title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },

  dir_text: {
    fontSize: 12,
  },
})

export default React.memo(BottomSettings, isEqualMemoComparison)
