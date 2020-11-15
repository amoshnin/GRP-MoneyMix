// PLUGINS IMPORTS //
import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderBillName,
  renderBillIcon,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const TransferScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const { setDisableExitApp, billData } = props.route.params

  const normalBillsList =
    props.route.params.normalBillsList &&
    props.route.params.normalBillsList.filter(
      (bill: any) => bill.name !== billData.name
    )
  const debtsBillsList =
    props.route.params.debtsBillsList &&
    props.route.params.debtsBillsList.filter(
      (bill: any) => bill.name !== billData.name
    )
  const savingsBillsList =
    props.route.params.savingsBillsList &&
    props.route.params.savingsBillsList.filter(
      (bill: any) => bill.name !== billData.name
    )

  const selectedCurrency = props.route.params.selectedCurrency

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {normalBillsList &&
          normalBillsList.length > 0 &&
          normalBillsList?.map(
            (normalBill: {
              accountBalance: string
              creditLimit: string
              description: string
              name: string
              takeIntoTotalBalance: boolean
              icon: string
              type: string
            }) => {
              return (
                normalBill && (
                  <Button
                    title={renderBillName(normalBill.name, t)}
                    icon={renderBillIcon(normalBill.type, normalBill.icon)}
                    content={renderPrice(
                      normalBill.accountBalance,
                      selectedCurrency,
                      t
                    )}
                    containerStyle={styles.button}
                    onPress={() => {
                      setDisableExitApp(true)
                      props.route.params.navigation.navigate(
                        "MoneyBillsTransferScreen",
                        {
                          sendingBillData: normalBill,
                          billData: billData,
                        }
                      )
                      props.route.params.setPopupVisible(false)
                    }}
                  />
                )
              )
            }
          )}
        {debtsBillsList &&
          debtsBillsList.length > 0 &&
          debtsBillsList?.map(
            (debt: {
              description: string
              iOwe: string
              name: string
              takeIntoTotalBalance: boolean
              totalDebtSum: string
              icon: string
              type: string
            }) => {
              const LeftMoney = Number(debt.totalDebtSum) - Number(debt.iOwe)
              return (
                debt && (
                  <Button
                    title={renderBillName(debt.name, t)}
                    icon={renderBillIcon(debt.type, debt.icon)}
                    content={renderPrice(LeftMoney, selectedCurrency, t)}
                    containerStyle={styles.button}
                    onPress={() => {
                      setDisableExitApp(true)

                      props.route.params.navigation.navigate(
                        "MoneyBillsTransferScreen",
                        {
                          sendingBillData: debt,
                          billData: billData,
                        }
                      )
                      props.route.params.setPopupVisible(false)
                    }}
                  />
                )
              )
            }
          )}

        {savingsBillsList &&
          savingsBillsList.length > 0 &&
          savingsBillsList?.map(
            (saving: {
              accountBalance: string
              budget: string
              description: string
              goal: string
              name: string
              takeIntoTotalBalance: boolean
              icon: string
              type: string
            }) => {
              return (
                saving && (
                  <Button
                    title={renderBillName(saving.name, t)}
                    icon={renderBillIcon(saving.type, saving.icon)}
                    content={renderPrice(
                      saving.accountBalance,
                      selectedCurrency,
                      t
                    )}
                    containerStyle={styles.button}
                    onPress={() => {
                      setDisableExitApp(true)

                      props.route.params.navigation.navigate(
                        "MoneyBillsTransferScreen",
                        {
                          sendingBillData: saving,
                          billData: billData,
                        }
                      )
                      props.route.params.setPopupVisible(false)
                    }}
                  />
                )
              )
            }
          )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#E9E9E9",
    flex: 1,
  },

  container: {
    flexDirection: "column",
    width: "55%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  button: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
})

export default React.memo(TransferScreen, isEqualMemoComparison)
