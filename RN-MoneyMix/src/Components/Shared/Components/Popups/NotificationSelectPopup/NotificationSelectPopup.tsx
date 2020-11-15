// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, Platform, StyleSheet, BackHandler } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import * as Notifications from "expo-notifications"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Components/Popups/Shared/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  isIncome: boolean | null
  moneyAmount: string

  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void
  scheduled: {
    boolean: boolean
    id: string | null
  }
  setScheduled: (newScheduledInfo: {
    boolean: boolean
    id: string | null
  }) => void
}

const NotificationSelectPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showMode = (currentMode: any) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  const showTimepicker = () => {
    showMode("time")
  }

  const scheduleNotification = () => {
    const trigger = date

    Notifications.scheduleNotificationAsync({
      content: {
        title: t("Notifications.OperationReminder"),
        body: `${t("Notifications.PPRemindToAdd")} ${
          props.isIncome === null
            ? t("Categories.Main.Transaction").toLowerCase()
            : props.isIncome
            ? t("Notifications.Income")
            : t("Notifications.Expense")
        } ${t("Notifications.for")} ${props.moneyAmount || 0}`,
        badge: 1,
        // @ts-ignore
        vibrate: true,
        sound: true,
      },
      trigger,
    }).then((id: string) => {
      props.setScheduled({
        boolean: true,
        id: id,
      })
    })
  }

  const cancelNotification = async () => {
    await Notifications.cancelScheduledNotificationAsync(
      props.scheduled.id as string
    ).then(() => props.setScheduled({ id: null, boolean: false }))
  }

  return (
    <>
      <Dialog
        width={320}
        visible={props.popupVisible}
        onTouchOutside={() => {
          props.setPopupVisible(false)
        }}
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
          <BlockItem
            title={String(dayjs(date).format("DD MMMM YYYY - HH:mm"))}
            icon={
              <View
                style={[
                  styles.button,
                  props.scheduled.boolean
                    ? { backgroundColor: "#01CA5C" }
                    : { backgroundColor: "#FF555B" },
                ]}
              >
                <Text style={styles.button_text}>
                  {props.scheduled.boolean
                    ? t("Notifications.Confirmed")
                    : t("Notifications.ClickToSchedule")}
                </Text>
              </View>
            }
            onPress={
              props.scheduled.boolean
                ? cancelNotification
                : scheduleNotification
            }
            containerStyle={styles.info_block}
          />
          <BlockItem
            title={t("Notifications.Date")}
            icon={<AntDesign name="calendar" size={25} color="gray" />}
            onPress={showDatepicker}
          />
          <BlockItem
            title={t("Notifications.Time")}
            icon={<Entypo name="back-in-time" size={24} color="black" />}
            onPress={showTimepicker}
          />
        </DialogContent>
      </Dialog>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode as any}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -18,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: -25,
  },

  info_block: {
    width: "100%",
  },

  button: {
    backgroundColor: "red",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },

  button_text: {
    color: "white",
  },
})

export default React.memo(NotificationSelectPopup, isEqualMemoComparison)
