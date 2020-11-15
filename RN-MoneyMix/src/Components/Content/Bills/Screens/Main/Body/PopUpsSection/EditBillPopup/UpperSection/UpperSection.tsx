// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { Switch } from "react-native-paper"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  renderPrice,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null
  billData: any
  accountBalance: string
  defaultBill: any

  setDefaultBillThunkCreator: (defaultBill: any) => void
}

const UpperSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const isDefault =
    props.defaultBill && props.defaultBill.name === props.billData.name
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {sliceString(renderBillName(props.billData.name, t), 16)}
        </Text>
        <Text style={[styles.text, { marginRight: 5 }]}>
          {renderPrice(props.accountBalance || 0, props.selectedCurrency, t)}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.switch_text}>
          {t("BillsScreen.EditBillPopup.defaultBill")}
        </Text>
        <Switch
          accessibilityStates
          value={isDefault}
          color="#674ABE"
          onValueChange={() =>
            props.setDefaultBillThunkCreator(isDefault ? {} : props.billData)
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    elevation: 3,
    backgroundColor: "white",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    height: 45,
    paddingBottom: 10,
    paddingTop: 10,
  },

  text: {
    fontSize: 20,
    color: "black",
  },

  switch_text: {
    fontSize: 16,
    color: "black",
  },
})

export default React.memo(UpperSection, isEqualMemoComparison)
