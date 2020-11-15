// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TimeRangeSelectPopup from "./Popups/TimeRangeSelectPopup/TimeRangeSelectPopup"
import CustomDateSelectPopup from "./Popups/CustomDateSelectPopup/CustomDateSelectPopup"
import {
  onSwipeLeft,
  onSwipeRight,
} from "~/Components/Shared/Helpers/Functions/DateChangeFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"
import { BorderlessButton } from "react-native-gesture-handler"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  InitialDate: Date | string | number
  FinalDate: Date | string | number
  DateType: string

  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  setDateTypeActionCreator: (dateType: string) => void
}

const CalendarHeaderOption: React.FC<PropsType> = (props) => {
  const [datePickerPopupVisible, setDatePickerPopupVisible] = useState(
    false as boolean
  )
  const [
    custoDateSelectPopupVisible,
    setCustomDateSelectPopupVisible,
  ] = useState(false as boolean)
  const { t } = useTranslation()

  const [initialDate, setInitialDate] = useState(
    new Date(dayjs(props.InitialDate) as any).getTime() as Date | number
  )
  const [finalDate, setFinalDate] = useState(
    new Date(dayjs(props.FinalDate) as any).getTime() as Date | number
  )

  const removeArrows = () => {
    return props.DateType === "Infinite" || props.DateType === "Custom"
  }

  useEffect(() => {
    const getData = async () => {
      const DateType = await AsyncStorage.getItem("selectedDateType")
      props.setDateTypeActionCreator(
        DateType === "Custom" ? "Month" : DateType || "Month"
      )

      if (props.DateType === "Infinite") {
        props.setDateActionCreator("Infinite" as any, "Infinite" as any)
      } else if (props.DateType === "Year") {
        props.setDateActionCreator(
          new Date(dayjs().startOf("year") as any).getTime(),
          new Date(dayjs().endOf("year") as any).getTime()
        )
      } else if (props.DateType === "Week") {
        props.setDateActionCreator(
          new Date(dayjs().startOf("week") as any).getTime(),
          new Date(dayjs().endOf("week").add(1, "day") as any).getTime()
        )
      } else if (props.DateType === "Day") {
        props.setDateActionCreator(
          new Date(dayjs().startOf("day") as any).getTime(),
          new Date(dayjs().endOf("day") as any).getTime()
        )
      } else {
        props.setDateActionCreator(
          new Date(dayjs().startOf("month") as any).getTime(),
          new Date(dayjs().endOf("month") as any).getTime()
        )
      }
    }

    getData()
  }, [])

  useEffect(() => {
    const setDateType = async () => {
      await AsyncStorage.setItem("selectedDateType", props.DateType)
    }

    setDateType()
  }, [props.DateType])

  const renderData = () => {
    if (props.DateType === "Infinite") {
      return (
        <Text style={styles.header_month}>
          {t("Header.AllTime").toUpperCase()}{" "}
        </Text>
      )
    } else if (props.DateType === "Year") {
      return (
        <Text style={styles.header_month}>
          {t("Header.Popups.Year")} {dayjs(props.InitialDate).format("YYYY")}
        </Text>
      )
    } else if (props.DateType === "Week") {
      return (
        <Text style={styles.header_month}>
          {dayjs(props.InitialDate).add(1, "day").format("DD")}{" "}
          {t("Header.Popups.Week")} {dayjs(props.FinalDate).format("DD")}
        </Text>
      )
    } else if (props.DateType === "Day") {
      return (
        <View style={styles.day_wrap}>
          <Text style={styles.header_month}>{t("Header.Popups.Day")} </Text>
          <Text style={styles.header_day}>
            {dayjs(props.FinalDate).format("DD")}
          </Text>
        </View>
      )
    } else if (props.DateType === "Month") {
      return (
        <Text style={styles.header_month}>
          {t(`Header.Months.${dayjs(props.InitialDate).format("MMMM")}`)}{" "}
          {dayjs(props.InitialDate).format("YYYY")}
        </Text>
      )
    } else {
      return (
        <View style={styles.dates_wrap}>
          <Text style={styles.header_day}>
            {dayjs(props.InitialDate).format("DD")}
          </Text>
          <Text style={styles.date_text}>
            {dayjs(props.InitialDate).format("MM")}{" "}
            {props.FinalDate !== "Infinite" &&
              dayjs(props.InitialDate).format("YYYY")}
          </Text>
          <Text style={styles.date_text}> - </Text>
          <Text style={styles.header_day}>
            {dayjs(props.FinalDate).subtract(1, "day").format("DD")}
          </Text>
          <Text style={styles.date_text}>
            {dayjs(props.FinalDate).format("MM")}{" "}
            {dayjs(props.FinalDate).subtract(1, "day").format("YYYY")}
          </Text>
        </View>
      )
    }
  }

  return (
    <>
      <View style={styles.container}>
        {!removeArrows() && (
          <BorderlessButton
            onPress={() =>
              onSwipeRight(
                props.setDateActionCreator,
                props.DateType,
                props.InitialDate,
                props.FinalDate
              )
            }
            hitSlop={{ right: 100, left: 100, top: 100, bottom: 100 }}
            style={styles.arrow}
          >
            <Ionicons name="md-arrow-dropleft" size={24} color="white" />
          </BorderlessButton>
        )}
        <TouchableOpacity onPress={() => setDatePickerPopupVisible(true)}>
          {renderData()}
        </TouchableOpacity>
        {!removeArrows() && (
          <BorderlessButton
            onPress={() =>
              onSwipeLeft(
                props.setDateActionCreator,
                props.DateType,
                props.InitialDate,
                props.FinalDate
              )
            }
            hitSlop={{ right: 100, left: 100, top: 100, bottom: 100 }}
            style={styles.arrow}
          >
            <Ionicons name="md-arrow-dropright" size={24} color="white" />
          </BorderlessButton>
        )}
      </View>

      <TimeRangeSelectPopup
        popupVisible={datePickerPopupVisible}
        setPopupVisible={setDatePickerPopupVisible}
        setDateActionCreator={props.setDateActionCreator}
        setCustomDateSelectPopupVisible={setCustomDateSelectPopupVisible}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        finalDate={finalDate}
        setFinalDate={setFinalDate}
        setDateTypeActionCreator={props.setDateTypeActionCreator}
      />

      <CustomDateSelectPopup
        setDateActionCreator={props.setDateActionCreator}
        popupVisible={custoDateSelectPopupVisible}
        setPopupVisible={setCustomDateSelectPopupVisible}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        finalDate={finalDate}
        setFinalDate={setFinalDate}
        setDateTypeActionCreator={props.setDateTypeActionCreator}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 190,
  },

  arrow: {
    width: 15,
    alignItems: "center",
  },

  header_month: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  day_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dates_wrap: {
    flexDirection: "row",
    width: "35%",
    marginLeft: 10,
    alignItems: "center",
  },

  date_text: {
    color: "white",
  },

  header_day: {
    backgroundColor: "white",
    paddingHorizontal: 4,
    borderRadius: 4,
    marginRight: 5,
    fontSize: 14,
    color: "#674ABE",
    fontWeight: "bold",
  },
})

export default React.memo(CalendarHeaderOption, isEqualMemoComparison)
