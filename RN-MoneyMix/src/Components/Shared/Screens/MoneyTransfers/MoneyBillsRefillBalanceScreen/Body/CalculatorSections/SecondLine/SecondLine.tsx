// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  moneyAmount: number
  newMoneyAmount: any
  totalValue: any

  sign: string
  selectedCurrency: string | null
}

const SecondLine: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BlockItem
        content={
          <View style={styles.inputs_wrap}>
            <View style={styles.money_wrap}>
              <CustomText color={"#512DA8"} size={24}>
                {t("BillsScreen.Balance")}
              </CustomText>
              <CustomText color={"#512DA8"} size={24}>
                {props.totalValue === 0 ? "0" : props.totalValue || "0"}{" "}
                {props.newMoneyAmount.length > 0 && props.newMoneyAmount}{" "}
                {t(
                  `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
                )}
              </CustomText>
            </View>
          </View>
        }
        containerStyle={styles.block}
        removeRipple
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

  block: {
    flex: 1,
    height: 60,
  },
})

export default React.memo(SecondLine, isEqualMemoComparison)
