// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Platform, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import BlockItem from "../../../../Popups/Shared/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void

  initialDate: Date | number
  setInitialDate: (newInitialDate: Date | number) => void
  finalDate: Date | number
  setFinalDate: (newFinalDate: Date | number) => void
  setDateTypeActionCreator: (dateType: string) => void
}

const CustomDateSelectPopup: React.FC<PropsType> = (props) => {
  const [showInitialDatePicker, setShowInitialDatePicker] = useState(false)
  const [showFinalDatePicker, setShowFinalDatePicker] = useState(false)

  const setData = (initDate?: any, finDate?: any) => {
    props.setDateActionCreator(initDate, finDate)
  }

  const { t } = useTranslation()
  return (
    <>
      <TitledPopup
        popupVisible={props.popupVisible}
        setPopupVisible={props.setPopupVisible}
        title={t("Header.Popups.SelectRange")}
        wrapperStyle={styles.wrapper}
        headerStyle={styles.header}
        isCustomTitle
        removeHeight
      >
        <View style={styles.content}>
          <BlockItem
            title={t("GeneralPhrases.From")}
            subtitle={`${dayjs().format("D")} ${t(
              `Header.Months.${dayjs().format("MMMM")}`
            )}`}
            icon={<AntDesign name="calendar" size={25} color="gray" />}
            onPress={() => {
              props.setPopupVisible(false)
              setShowFinalDatePicker(true)
            }}
          />
          <BlockItem
            title={t("GeneralPhrases.Until")}
            subtitle={`${dayjs().format("D")} ${t(
              `Header.Months.${dayjs().format("MMMM")}`
            )}`}
            icon={<Ionicons name="ios-infinite" size={25} color="gray" />}
            onPress={() => {
              props.setPopupVisible(false)
              setShowInitialDatePicker(true)
            }}
          />
        </View>
      </TitledPopup>

      {showInitialDatePicker && (
        <DateTimePicker
          value={props.finalDate as any}
          mode={"date"}
          is24Hour
          display="default"
          onChange={(event: any, selectedDate: any) => {
            setShowInitialDatePicker(Platform.OS === "ios")
            props.setDateTypeActionCreator("Custom")
            props.setFinalDate(
              new Date(dayjs(selectedDate).add(1, "day") as any).getTime()
            )
            setData(
              props.initialDate,
              new Date(dayjs(selectedDate).add(1, "day") as any).getTime()
            )
          }}
          onTouchCancel={() => setShowInitialDatePicker(false)}
        />
      )}

      {showFinalDatePicker && (
        <DateTimePicker
          value={props.initialDate as any}
          mode={"date"}
          is24Hour
          display="default"
          onChange={(event: any, selectedDate: any) => {
            setShowFinalDatePicker(Platform.OS === "ios")
            props.setDateTypeActionCreator("Custom")
            props.setInitialDate(new Date(dayjs(selectedDate) as any).getTime())
            setData(
              new Date(dayjs(selectedDate) as any).getTime(),
              props.finalDate
            )
            props.setPopupVisible(true)
          }}
          onTouchCancel={() => setShowFinalDatePicker(false)}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    width: 320,
    position: "absolute",
  },

  header: {
    height: 60,
    justifyContent: "center",
  },

  content: {
    marginHorizontal: -19,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: -25,
  },
})

export default React.memo(CustomDateSelectPopup, isEqualMemoComparison)
