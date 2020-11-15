// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"

import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  incomeAmount: number | null
  expensesAmount: number | null
}

const Main: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: "#01CA5C" }]}>
        {parseInt(
          String(
            (Number(props.incomeAmount) /
              (Number(props.expensesAmount) + Number(props.incomeAmount))) *
              100
          )
        ) || 0}{" "}
        %
      </Text>
      <Button
        title={t("BillsScreen.Balance")}
        icon={<FontAwesome name="refresh" size={24} color="#674ABE" />}
        content={sliceString(
          String(Number(props.incomeAmount) - Number(props.expensesAmount)),
          10
        )}
        containerStyle={styles.button}
      />
      <Text style={[styles.text, { color: "#FF3940" }]}>
        {parseInt(
          String(
            (Number(props.expensesAmount) /
              (Number(props.expensesAmount) + Number(props.incomeAmount))) *
              100
          )
        ) || 0}{" "}
        %
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    alignItems: "center",
  },

  text: {
    fontSize: 17,
  },

  button: {
    width: 148,
  },
})

export default React.memo(Main, isEqualMemoComparison)
