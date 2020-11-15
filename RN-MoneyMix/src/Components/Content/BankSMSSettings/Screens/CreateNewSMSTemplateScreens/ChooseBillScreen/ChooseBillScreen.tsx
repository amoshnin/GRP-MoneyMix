// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { concat } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome5 } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  debtsBillsList: Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
    icon: string
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  getBillsListsThunkCreator: () => void
}

const ChooseBillScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.getBillsListsThunkCreator()
  })

  const bills = concat(props.normalBillsList, props.debtsBillsList, props.savingsBillsList)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bills.map((bill: any) => {
        return (
          <Button
            title={bill.name}
            content={`${bill.accountBalance || bill.iOwe || 0} ${t(
              `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
            )}`}
            containerStyle={styles.button}
            icon={<FontAwesome5 name="piggy-bank" size={24} color="#674ABE" />}
            onPress={() =>
              props.navigation.navigate("InputSMSInfoScreen", {
                bill: bill,
              })
            }
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  button: {
    width: "45%",
    marginTop: 20,
  },
})

export default ChooseBillScreen
