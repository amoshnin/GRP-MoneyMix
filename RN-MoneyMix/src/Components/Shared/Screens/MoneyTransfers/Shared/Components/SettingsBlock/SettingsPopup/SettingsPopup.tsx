// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, Image, Platform, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import NotificationSelectPopup from "~/Components/Shared/Components/Popups/NotificationSelectPopup/NotificationSelectPopup"
import BackgroundTasksSetPopup from "~/Components/Shared/Components/Popups/BackgroundTasksSetPopup/BackgroundTasksSetPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import OfflineBadge from "~/Components/Shared/Components/Badges/OfflineBadge/OfflineBadge"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialIcons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  isAuthentificated: boolean

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void

  selectedDate: Date
  setSelectedDate: (newSelectedDate: Date) => void

  isIncome: boolean | null
  totalValue: string
  scheduled: {
    boolean: boolean
    id: string | null
  }
  setScheduled: (newScheduledInfo: {
    boolean: boolean
    id: string | null
  }) => void
  removeDateSelection?: boolean
}

const SettingsPopup: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [taskSetPopupVisible, setTaskSetPopupVisible] = useState(false)
  const [notificationsPopupVisible, setNotificationsPopupVisible] = useState(
    false as boolean
  )
  const [date, setDate] = useState(new Date(props.selectedDate))
  const [show, setShow] = useState(false)
  const { t } = useTranslation()

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
    props.setSelectedDate(selectedDate)
    props.setPopupVisible(false)
  }

  return (
    <>
      <TitledPopup
        popupVisible={props.popupVisible}
        setPopupVisible={props.setPopupVisible}
        title={t("MoneyCategoriesTransferScreen.Popups.ChooseAction")}
        removeHeight
        wrapperStyle={styles.wrapper}
      >
        <View style={styles.container}>
          <View>
            <RoundButton
              title={t("Operations.Popup.Notify")}
              backgroundColor="rgba(148, 148, 222, 0.5)"
              onPress={async () => {
                if (props.isAuthentificated) {
                  props.isOnline
                    ? setNotificationsPopupVisible(true)
                    : setOfflinePopup(true)
                } else {
                  await props.setPopupVisible(false)
                  props.navigation.navigate("PremiumVersionScreen")
                }
              }}
            >
              <MaterialIcons name="notifications" size={28} color="#674ABE" />
            </RoundButton>
            {!props.isAuthentificated ? (
              <Image
                style={styles.star}
                source={require("~/Images/star.png")}
              />
            ) : (
              !props.isOnline && (
                <OfflineBadge style={styles.star} iconSize={11} />
              )
            )}
          </View>

          {/* <View>
            <RoundButton
              title={t("Operations.Popup.Repeat")}
              backgroundColor="rgba(148, 148, 222, 0.5)"
              onPress={() =>
                props.isAuthentificated
                  ? setTaskSetPopupVisible(true)
                  : props.navigation.navigate("PremiumVersionScreen")
              }
            >
              <Entypo name="back-in-time" size={28} color="#674ABE" />
            </RoundButton>
            {!props.isAuthentificated && (
              <Image
                style={styles.star}
                source={require("~/Images/star.png")}
              />
            )}
          </View> */}

          {!props.removeDateSelection && (
            <RoundButton
              title={t("Operations.Popup.Date")}
              backgroundColor="rgba(148, 148, 222, 0.5)"
              onPress={() => setShow(true)}
            >
              <AntDesign name="calendar" size={24} color="#674ABE" />
            </RoundButton>
          )}
        </View>
      </TitledPopup>

      <NotificationSelectPopup
        isIncome={props.isIncome}
        moneyAmount={props.totalValue}
        popupVisible={notificationsPopupVisible}
        setPopupVisible={setNotificationsPopupVisible}
        scheduled={props.scheduled}
        setScheduled={props.setScheduled}
      />
      <BackgroundTasksSetPopup
        popupVisible={taskSetPopupVisible}
        setPopupVisible={setTaskSetPopupVisible}
      />

      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <AlertPopup
        popupVisible={offlinePopup}
        setPopupVisible={setOfflinePopup}
        title={t("GeneralPhrases.Popups.TitleNetProblem")}
        content={
          <Text style={styles.text}>
            {t("GeneralPhrases.Popups.PPNetworkProblem")}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: 310,
    marginHorizontal: -19,
    backgroundColor: "#F1F1F1",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },

  star: {
    position: "absolute",
    top: -8,
    right: 10,
    width: 20,
    height: 20,
  },

  text: {
    color: "black",
  },
})

export default React.memo(SettingsPopup, isEqualMemoComparison)
