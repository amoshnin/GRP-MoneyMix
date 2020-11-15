// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import * as Progress from "react-native-progress"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { renderPrice } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  price: string
  color: string
  percentage: number
  selectedCurrency: string | null

  operationsCount: number
}

const screenWidth = Dimensions.get("screen").width
const UpperSections: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {props.operationsCount}{" "}
          {t("BillsScreen.EditBillPopup.Operations").toLowerCase()}
        </Text>
        <Text style={styles.text}>
          {renderPrice(props.price, props.selectedCurrency, t)}
        </Text>
      </View>
      <Progress.Bar
        progress={props.percentage && props.percentage}
        width={317}
        color={props.color}
        style={styles.progress_bar}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: "black",
  },

  progress_bar: {
    width: screenWidth / 1.25,
  },
})

export default UpperSections
