// PLUGINS IMPORTS //
import React from "react"
import { Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Components/Popups/Shared/BlockItem/BlockItem"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void
}

const TimeRangeSelectPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  return (
    <Dialog
      width={320}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        } as any)
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <Text style={styles.title}>
          {t("MoneyCategoriesTransferScreen.Popups.PPRepeatOperation")} :
        </Text>
        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.EveryHour")}
          icon={<Ionicons name="ios-infinite" size={25} color="gray" />}
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />

        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.EveryDay")}
          icon={<Feather name="sun" size={25} color="gray" />}
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />

        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.Every3Days")}
          icon={
            <MaterialCommunityIcons
              name="numeric-7-box"
              size={25}
              color="gray"
            />
          }
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />
        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.EveryWeek")}
          icon={<Foundation name="calendar" size={25} color="gray" />}
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />
        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.Every2Weeks")}
          icon={<Foundation name="calendar" size={25} color="gray" />}
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />
        <BlockItem
          title={t("MoneyCategoriesTransferScreen.Popups.EveryMonth")}
          icon={<Foundation name="calendar" size={25} color="gray" />}
          onPress={() => {
            props.setPopupVisible(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: -25,
  },

  title: {
    marginVertical: 10,
    fontWeight: "bold",
  },
})

export default TimeRangeSelectPopup
