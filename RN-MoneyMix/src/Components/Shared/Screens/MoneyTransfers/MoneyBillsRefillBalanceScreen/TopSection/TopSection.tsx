// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderBillName,
  renderBillIcon,
  renderBillMoney,
  renderPrice,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  billData: any
  selectedCurrency: string
}

const TopSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header_wrap}>
        <Text size={25}>
          {sliceString(renderBillName(props.billData.name, t), 15)}
        </Text>

        <RoundButton backgroundColor={"#674ABE"}>
          {renderBillIcon(props.billData.type, props.billData.icon, "white")}
        </RoundButton>
      </View>

      <View style={styles.bottom_data}>
        <Text size={24}>
          {renderPrice(
            renderBillMoney(
              props.billData.type,
              props.billData.accountBalance,
              props.billData.iOwe,
              props.billData.totalDebtSum
            ),
            props.selectedCurrency,
            t
          )}
        </Text>
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

  bottom_line_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bottom_data: {
    flexDirection: "row",
    marginTop: -30,
  },

  icon: {
    borderRadius: 100,
  },
})

export default React.memo(TopSection, isEqualMemoComparison)
