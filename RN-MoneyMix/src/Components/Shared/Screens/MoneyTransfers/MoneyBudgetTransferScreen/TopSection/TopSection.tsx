// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import * as Progress from "react-native-progress"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderCategoryTitle,
  renderBillIcon,
  renderPrice,
  renderBillName,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  data: any
  selectedCurrency: string

  isSavingsBill: boolean
  isIncome: boolean
}

const screenWidth = Dimensions.get("screen").width
const TopSection: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)

  setTimeout(() => {
    setPercentage(Number(props.data.price) / Number(props.data.budget))
  }, 130)

  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header_wrap}>
        <Text style={styles.title}>
          {props.isSavingsBill
            ? renderBillName(props.data.name, t)
            : renderCategoryTitle(props.data.title, t, true)}
        </Text>

        <RoundButton backgroundColor={props.data.color || "#674ABE"}>
          {props.isSavingsBill ? (
            renderBillIcon(props.data.type, props.data.icon, "white")
          ) : (
            <FontAwesome name={props.data.icon} size={24} color={"white"} />
          )}
        </RoundButton>
      </View>

      <Progress.Bar
        progress={(percentage && percentage) || 0}
        color={props.data.color}
        unfilledColor={"#dbdbdb"}
        width={screenWidth / 1.13}
      />

      <View style={styles.bottom_line_wrap}>
        <View style={styles.bottom_data}>
          <Text style={styles.text}>
            {props.isIncome ? t("Budget.Earned") : t("Budget.Spent")}
          </Text>
          <Text style={[styles.price, styles.text]}>
            {" "}
            {props.isSavingsBill
              ? renderPrice(
                  props.data.accountBalance,
                  props.selectedCurrency,
                  t,
                  true
                )
              : renderPrice(props.data.price, props.selectedCurrency, t, true)}
          </Text>
        </View>
        <View style={styles.bottom_data}>
          <Text style={styles.text}>
            {t("DrawerNavigator.ButtonsList.Budget")}{" "}
          </Text>
          <Text style={[styles.price, styles.text]}>
            {renderPrice(props.data.budget, props.selectedCurrency, t, true)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginHorizontal: 20,
  },

  header_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  title: {
    fontSize: 23,
    color: "black",
  },

  bottom_line_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  bottom_data: {
    flexDirection: "row",
  },

  text: {
    fontSize: 15,
    color: "black",
  },

  price: {
    fontWeight: "bold",
  },

  icon: {
    borderRadius: 100,
  },
})

export default React.memo(TopSection, isEqualMemoComparison)
