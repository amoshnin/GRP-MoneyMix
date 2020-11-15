// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"

import {
  renderBillName,
  renderBillMoney,
  renderPrice,
  renderBillIcon,
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCategory: any
  selectedBill: any
  isIncome: boolean
  selectedCurrency: string | null

  setCategoryPopupShown: (categoryPopupShownStatus: boolean) => void
  setBillPopupShown: (billPopupShownStatus: boolean) => void
}

const UpperSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View
      style={[
        styles.container,
        props.isIncome && { flexDirection: "row-reverse" },
      ]}
    >
      <View style={styles.button_content}>
        <Text style={styles.title}>
          {props.isIncome
            ? t("MoneyCategoriesTransferScreen.TopSection.ToBill")
            : t("MoneyCategoriesTransferScreen.TopSection.FromBill")}
        </Text>
        <Button
          title={renderBillName(props.selectedBill?.name, t)}
          onPress={() => props.setBillPopupShown(true)}
          containerStyle={styles.button}
          content={renderPrice(
            renderBillMoney(
              props.selectedBill.type,
              props.selectedBill.accountBalance,
              props.selectedBill.iOwe,
              props.selectedBill.totalDebtSum
            ),
            props.selectedCurrency,
            t
          )}
          icon={renderBillIcon(
            props.selectedBill.type,
            props.selectedBill.icon,
            props.selectedBill.color
          )}
        />
      </View>
      <View style={styles.button_content}>
        <Text style={styles.title}>
          {props.isIncome
            ? t("MoneyCategoriesTransferScreen.TopSection.FromCategory")
            : t("MoneyCategoriesTransferScreen.TopSection.ToCategory")}
        </Text>
        <Button
          title={renderCategoryTitle(props.selectedCategory.title, t)}
          onPress={() => props.setCategoryPopupShown(true)}
          icon={
            <FontAwesome
              name={props.selectedCategory.icon}
              size={24}
              color={props.selectedCategory.color}
            />
          }
          content={renderPrice(
            props.selectedCategory.price,
            props.selectedCurrency,
            t
          )}
          containerStyle={[
            styles.button,
            { backgroundColor: props.selectedCategory.color },
          ]}
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
    width: "85%",
    flex: 1,
  },

  button_content: {
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    marginBottom: 7,
    color: "black",
  },

  button: {
    width: 148,
  },
})

export default React.memo(UpperSection, isEqualMemoComparison)
