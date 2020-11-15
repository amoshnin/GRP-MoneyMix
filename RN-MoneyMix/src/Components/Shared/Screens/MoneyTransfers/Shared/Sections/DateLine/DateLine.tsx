// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import {
  renderProfile,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedDate: Date
}

const DateLine: React.FC<PropsType> = (props) => {
  const [selectedProfile, setSelectedProfile] = useState("General" as any)
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      setSelectedProfile(await AsyncStorage.getItem("selectedProfile"))
    }

    getData()
  }, [])

  return (
    <BlockItem
      content={
        <View style={styles.container}>
          <Text style={styles.date_text}>
            {dayjs(props.selectedDate).format("DD ")}
            {t(`Header.Months.${dayjs(props.selectedDate).format("MMMM")}`)}
            {dayjs(props.selectedDate).format(" YYYY")}
          </Text>

          <View style={styles.divider} />

          <View style={styles.profile_wrap}>
            <MaterialIcons name="account-circle" size={28} color="#674ABE" />

            <View style={styles.profile_content}>
              <Text style={styles.profile_text}>
                {t("Header.Popups.Profile")}
              </Text>
              <CustomText color={"#674ABE"} size={17}>
                {String(renderProfile(selectedProfile as any, t)).toUpperCase()}
              </CustomText>
            </View>
          </View>
        </View>
      }
      containerStyle={styles.date_wrap}
      removeRipple
      isGray
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  date_wrap: {
    width: "100%",
    paddingHorizontal: 15,
    flex: 0,
  },
  date_text: {
    color: "gray",
  },
  profile_wrap: {
    alignItems: "center",
    flexDirection: "row",
  },
  profile_content: {
    textAlign: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  profile_text: {
    color: "#674ABE",
  },
  divider: {
    marginHorizontal: 32,
  },
})

export default React.memo(DateLine, isEqualMemoComparison)
