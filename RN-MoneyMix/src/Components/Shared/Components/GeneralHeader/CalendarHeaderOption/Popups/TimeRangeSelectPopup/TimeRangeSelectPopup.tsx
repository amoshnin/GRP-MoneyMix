// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Platform, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import BlockItem from "../../../../Popups/Shared/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  setCustomDateSelectPopupVisible: (
    customDateSelectPopupVisibility: boolean
  ) => void

  initialDate: Date | number
  setInitialDate: (newInitialDate: Date | number) => void
  finalDate: Date | number
  setFinalDate: (newFinalDate: Date | number) => void
  setDateTypeActionCreator: (dateType: string) => void
}

const TimeRangeSelectPopup: React.FC<PropsType> = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    setShowDatePicker(Platform.OS === "ios")
    props.setDateActionCreator(props.initialDate, props.finalDate)
  }, [props.initialDate])

  useEffect(() => {
    setShowDatePicker(Platform.OS === "ios")
    props.setDateActionCreator(props.initialDate, props.finalDate)
  }, [props.finalDate])

  const { t } = useTranslation()

  console.log(new Date(dayjs().startOf("month") as any), "start")
  console.log(new Date(dayjs().endOf("month").add(5, "day") as any), "end")

  return (
    <>
      <TitledPopup
        popupVisible={props.popupVisible}
        setPopupVisible={props.setPopupVisible}
        title={t("Header.Popups.SelectRange")}
        wrapperStyle={styles.wrapper}
        headerStyle={styles.header}
        isSlideAnimation
        isCustomTitle
        removeHeight
      >
        <View style={styles.content}>
          {/* <BlockItem
            title={t("Header.Popups.SelectDay")}
            icon={<AntDesign name="calendar" size={25} color="gray" />}
            onPress={() => {
              setInitialDate(new Date(dayjs() as any).getTime())
              setFinalDate(new Date(dayjs() as any).getTime())
              props.setPopupVisible(false)

              setShowDatePicker(true)
            }}
          /> */}
          <BlockItem
            title={t("Header.AllTime")}
            icon={<Ionicons name="ios-infinite" size={25} color="gray" />}
            onPress={() => {
              props.setPopupVisible(false)
              props.setDateTypeActionCreator("Infinite")
              props.setInitialDate("Infinite" as any)
              props.setFinalDate("Infinite" as any)
            }}
          />
          <BlockItem
            title={t("Header.Popups.Day")}
            subtitle={`${dayjs().format("D")} ${t(
              `Header.Months.${dayjs().format("MMMM")}`
            )}`}
            icon={
              <MaterialCommunityIcons
                name="numeric-1-box"
                size={25}
                color="gray"
              />
            }
            onPress={() => {
              props.setPopupVisible(false)
              props.setDateTypeActionCreator("Day")
              props.setInitialDate(
                new Date(dayjs().startOf("day") as any).getTime()
              )
              props.setFinalDate(
                new Date(dayjs().endOf("day") as any).getTime()
              )
            }}
          />
          <BlockItem
            title={t("Header.Popups.Year")}
            subtitle={dayjs().format("YYYY")}
            icon={<Feather name="sun" size={25} color="gray" />}
            onPress={() => {
              props.setPopupVisible(false)
              props.setDateTypeActionCreator("Year")
              props.setInitialDate(
                new Date(dayjs().startOf("year") as any).getTime()
              )
              props.setFinalDate(
                new Date(dayjs().endOf("year") as any).getTime()
              )
            }}
          />

          <BlockItem
            title={t("Header.Popups.Week")}
            subtitle={`${`${dayjs().format("D")} ${t(
              `Header.Months.${dayjs().format("MMMM")}`
            )}`} - ${dayjs().subtract(7, "day").format("D")} ${t(
              `Header.Months.${dayjs().subtract(7, "day").format("MMMM")}`
            )}`}
            icon={
              <MaterialCommunityIcons
                name="numeric-7-box"
                size={25}
                color="gray"
              />
            }
            onPress={() => {
              props.setPopupVisible(false)
              props.setDateTypeActionCreator("Week")
              props.setInitialDate(
                new Date(dayjs().startOf("week") as any).getTime()
              )
              props.setFinalDate(
                new Date(dayjs().endOf("week").add(1, "day") as any).getTime()
              )
            }}
          />
          <BlockItem
            title={t("Header.Popups.Month")}
            icon={<Foundation name="calendar" size={25} color="gray" />}
            onPress={() => {
              props.setPopupVisible(false)
              props.setDateTypeActionCreator("Month")
              props.setInitialDate(
                new Date(dayjs().startOf("month") as any).getTime()
              )
              props.setFinalDate(
                new Date(dayjs().endOf("month") as any).getTime()
              )
            }}
            subtitle={`${t(
              `Header.Months.${dayjs().format("MMMM")}`
            )} ${dayjs().format("YYYY")}`}
          />
          <BlockItem
            title={t("Header.Popups.SelectRange")}
            icon={
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={25}
                color="gray"
              />
            }
            onPress={() => {
              props.setPopupVisible(false)
              props.setCustomDateSelectPopupVisible(true)
            }}
          />
        </View>
      </TitledPopup>

      {showDatePicker && (
        <DateTimePicker
          value={props.initialDate as any}
          mode={"date"}
          is24Hour
          display="default"
          onChange={(event: any, selectedDate: any) => {
            props.setInitialDate(new Date(dayjs(selectedDate) as any).getTime())
            props.setFinalDate(
              new Date(dayjs(selectedDate).subtract(20, "day") as any).getTime()
            )

            setShowDatePicker(Platform.OS === "ios")
          }}
          onTouchCancel={() => setShowDatePicker(false)}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: 320,
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

export default React.memo(TimeRangeSelectPopup, isEqualMemoComparison)
