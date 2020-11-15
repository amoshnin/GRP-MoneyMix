// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderCategoryTitle,
  renderBillIcon,
  renderBillMoney,
  renderBillName,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  bill: any
  category: any
  selectedCurrency: string | null
  moneyAmount: number
  isIncome: boolean
  user: string
  operationType: string
  createdAt: string
}

const Header: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.button_content}>
        {props.category.icon !== "unknown" && (
          <Text style={styles.title}>
            {props.isIncome
              ? t("MoneyCategoriesTransferScreen.TopSection.ToBill")
              : t("MoneyCategoriesTransferScreen.TopSection.FromBill")}
          </Text>
        )}
        <Button
          title={renderBillName(props.bill?.name, t)}
          containerStyle={styles.button}
          content={renderPrice(
            renderBillMoney(
              props.bill.type,
              props.bill.accountBalance,
              props.bill.iOwe,
              props.bill.totalDebtSum
            ),
            props.selectedCurrency,
            t
          )}
          icon={renderBillIcon(props.bill.type, props.bill.icon)}
        />
      </View>

      {props.category.icon !== "unknown" && (
        <View style={styles.button_content}>
          <Text style={styles.title}>
            {props.isIncome
              ? props.operationType === "Transaction"
                ? t("MoneyCategoriesTransferScreen.TopSection.FromBill")
                : t("MoneyCategoriesTransferScreen.TopSection.FromCategory")
              : t("MoneyCategoriesTransferScreen.TopSection.ToCategory")}
          </Text>
          <Button
            title={
              props.operationType === "Transaction"
                ? renderBillName(props.category.title, t)
                : renderCategoryTitle(props.category.title, t)
            }
            containerStyle={[
              styles.button,
              { backgroundColor: props.category.color },
            ]}
            content={renderPrice(
              props.category.price,
              props.selectedCurrency,
              t
            )}
            icon={
              props.operationType === "Transaction" ? (
                renderBillIcon(props.bill.type, props.category.icon)
              ) : (
                <FontAwesome
                  name={props.category.icon}
                  size={24}
                  color={props.category.color}
                />
              )
            }
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 20,
  },

  button_content: {
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    marginBottom: 7,
  },

  button: {
    width: 148,
    marginHorizontal: 15,
  },
})

export default React.memo(Header, isEqualMemoComparison)
