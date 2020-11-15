// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderBillName,
  renderBillIcon,
  renderBillMoney,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  firstBillData: any
  sendingBillData: any
  selectedCurrency: string | null

  setBillPopupShown: (billPopupShownStatus: boolean) => void
}

const UpperSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={[styles.container]}>
      <View style={styles.button_content}>
        <Text style={styles.title}>
          {t("MoneyCategoriesTransferScreen.TopSection.FromBill")}
        </Text>
        <Button
          title={renderBillName(props.firstBillData.name, t)}
          containerStyle={styles.button}
          content={renderPrice(
            renderBillMoney(
              props.firstBillData.type,
              props.firstBillData.accountBalance,
              props.firstBillData.iOwe,
              props.firstBillData.totalDebtSum
            ),
            props.selectedCurrency,
            t
          )}
          icon={renderBillIcon(
            props.firstBillData.type,
            props.firstBillData.icon
          )}
        />
      </View>
      <View style={styles.button_content}>
        <Text style={styles.title}>
          {t("MoneyCategoriesTransferScreen.TopSection.ToBill")}
        </Text>

        <Button
          title={renderBillName(props.sendingBillData.name, t)}
          onPress={() => props.setBillPopupShown(true)}
          containerStyle={styles.button}
          content={renderPrice(
            renderBillMoney(
              props.sendingBillData.type,
              props.sendingBillData.accountBalance,
              props.sendingBillData.iOwe,
              props.sendingBillData.totalDebtSum
            ),
            props.selectedCurrency,
            t
          )}
          icon={renderBillIcon(
            props.sendingBillData.type,
            props.sendingBillData.icon
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "88%",
    flex: 1,
  },

  button_content: {
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    marginBottom: 7,
    color: "black",
  },

  button: {
    width: 148,
  },
})

export default React.memo(UpperSection, isEqualMemoComparison)
