// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import * as Progress from "react-native-progress"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string

  rightSubtitle: string
  leftSubtitle: string

  isIncome: boolean
  isBill?: boolean

  selectedCurrency: string | null
  totalValue: string | number
  totalBudget: number
}

const screenWidth = Dimensions.get("screen").width
const Header: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)

  const Value = Number(props.totalBudget) - Number(props.totalValue)

  setTimeout(() => {
    setPercentage(Number(props.totalValue) / Number(props.totalBudget))
  }, 130)

  const renderTextColor = () => {
    if (props.isBill) {
      return "#fda623"
    } else {
      if (props.isIncome) {
        return "#01CA5C"
      } else {
        return "#FF555B"
      }
    }
  }

  const { t } = useTranslation()
  return (
    <View
      style={[
        styles.container,
        props.isBill
          ? { backgroundColor: "#fdf7e9" }
          : props.isIncome
          ? { backgroundColor: "#e6f7f1" }
          : { backgroundColor: "#fbefef" },
      ]}
    >
      <View style={styles.text_wrap}>
        <CustomText size={20.4}>{props.title}</CustomText>
        <CustomText size={20.4} color={renderTextColor()}>
          {renderPrice(Value, props.selectedCurrency, t, true).replace(
            "-",
            "+"
          )}
        </CustomText>
      </View>

      <Progress.Bar
        style={styles.progress_bar}
        progress={(percentage && percentage) || 0}
        width={screenWidth / 1.1}
        color={Number(Value) > 0 ? renderTextColor() : "#dbdbdb"}
        borderRadius={0}
        borderColor={"#dbdbdb"}
        borderWidth={1}
        unfilledColor={"#dbdbdb"}
      />

      <View style={styles.bottom_text_wrap}>
        <Text style={{ color: renderTextColor() }}>
          {props.leftSubtitle}{" "}
          {renderPrice(props.totalValue, props.selectedCurrency, t)}
        </Text>
        <Text>
          {props.rightSubtitle}{" "}
          {renderPrice(props.totalBudget, props.selectedCurrency, t)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 18,
  },

  text_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  progress_bar: {
    alignSelf: "center",
    marginTop: 10,
  },

  bottom_text_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 5,
  },
})

export default React.memo(Header, isEqualMemoComparison)
