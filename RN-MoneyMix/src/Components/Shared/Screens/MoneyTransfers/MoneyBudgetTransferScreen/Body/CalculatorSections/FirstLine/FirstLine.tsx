// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  newBudgetAmount: string
  selectedCurrency: string | null
}

const FirstLine: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BlockItem
        content={
          <View style={styles.inputs_wrap}>
            <View style={styles.money_wrap}>
              <Text color={"#674ABE"} size={22}>
                {t("Budget.MonthBudget")}
              </Text>
              <Text style={styles.subtitle}>
                {props.newBudgetAmount.length > 0 ? props.newBudgetAmount : "0"}{" "}
                {t(
                  `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
                )}
              </Text>
            </View>
          </View>
        }
        containerStyle={styles.block}
        removeRipple
        isGray
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  inputs_wrap: {
    flex: 1,
    marginTop: 5,
  },

  money_wrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 39.5,
    marginHorizontal: 13,
  },

  subtitle: {
    fontSize: 22,
    marginLeft: 20,
    color: "#674ABE",
  },

  block: {
    flex: 1,
  },
})

export default React.memo(FirstLine, isEqualMemoComparison)
