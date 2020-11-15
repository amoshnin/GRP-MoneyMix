// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTranslation } from "react-i18next"
import { NavigationContainer } from "@react-navigation/native"

// COMPONENTS IMPORTS //
import ReplenishScreen from "./ReplenishScreen/ReplenishScreen"
import WithdrawlScreen from "./WithdrawlScreen/WithDrawlScreen"
import TransferScreen from "./TransferScreen/TransferScreen"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  billData: any
  billType: any

  transferInitialNav: string
  selectedCurrency: string | null

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

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
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void

  getFullCategoriesListThunkCreator: () => void
}

const TransferPopup: React.FC<PropsType> = (props) => {
  const [disableExitApp, setDisableExitApp] = useState(false as boolean)
  const Tab = createMaterialTopTabNavigator()
  const { t } = useTranslation()

  useEffect(() => {
    props.getFullCategoriesListThunkCreator()
  }, [props.popupVisible])

  return (
    <Dialog
      width={320}
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onShow={() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
          if (props.popupVisible) {
            props.setPopupVisible(false)
            return true
          }
        })
      }}
      onDismiss={() => {
        if (!disableExitApp) {
          BackHandler.addEventListener(
            "hardwareBackPress",
            () => BackHandler.exitApp() as any
          )
        } else {
          setDisableExitApp(false)
        }
      }}
    >
      <DialogContent style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarPosition="top"
            initialRouteName={props.transferInitialNav}
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: "#674ABE",
              },
            }}
          >
            <Tab.Screen
              name="ReplenishScreen"
              component={ReplenishScreen}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused
                        ? {
                            color: "#674ABE",
                          }
                        : { color: "#674ABE" }
                    }
                  >
                    {t("BillsScreen.EditBillPopup.Replenish")}
                  </Text>
                ),
              }}
              initialParams={{
                setPopupVisible: props.setPopupVisible,
                selectedCurrency: props.selectedCurrency,
                billType: props.billType,
                navigation: props.navigation,
                billData: props.billData,
                totalIncomeCategoriesList: props.totalIncomeCategoriesList,
                setDisableExitApp,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    selectedCurrency: props.selectedCurrency,
                    billType: props.billType,
                    navigation: props.navigation,
                    billData: props.billData,
                    totalIncomeCategoriesList: props.totalIncomeCategoriesList,
                  })
                },
              })}
            />
            <Tab.Screen
              name="WithdrawlScreen"
              component={WithdrawlScreen}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused
                        ? {
                            color: "#674ABE",
                          }
                        : { color: "#674ABE" }
                    }
                  >
                    {t("BillsScreen.EditBillPopup.Withdrawl")}
                  </Text>
                ),
              }}
              initialParams={{
                setPopupVisible: props.setPopupVisible,
                billType: props.billType,
                navigation: props.navigation,
                billData: props.billData,
                selectedCurrency: props.selectedCurrency,
                totalExpensesCategoriesList: props.totalExpensesCategoriesList,
                setDisableExitApp,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    billType: props.billType,
                    navigation: props.navigation,
                    billData: props.billData,
                    selectedCurrency: props.selectedCurrency,
                    totalExpensesCategoriesList:
                      props.totalExpensesCategoriesList,
                  })
                },
              })}
            />
            <Tab.Screen
              name="TransferScreen"
              component={TransferScreen}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused
                        ? {
                            color: "#674ABE",
                          }
                        : { color: "#674ABE" }
                    }
                  >
                    {t("BillsScreen.EditBillPopup.Transfer")}
                  </Text>
                ),
              }}
              initialParams={{
                setPopupVisible: props.setPopupVisible,
                selectedCurrency: props.selectedCurrency,
                navigation: props.navigation,
                billData: props.billData,
                //
                normalBillsList: props.normalBillsList,
                debtsBillsList: props.debtsBillsList,
                savingsBillsList: props.savingsBillsList,
                setDisableExitApp,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    selectedCurrency: props.selectedCurrency,
                    navigation: props.navigation,
                    billData: props.billData,
                    //
                    normalBillsList: props.normalBillsList,
                    debtsBillsList: props.debtsBillsList,
                    savingsBillsList: props.savingsBillsList,
                  })
                },
              })}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    maxHeight: 600,
    paddingBottom: 20,
    backgroundColor: "#E9E9E9",
  },

  container: {
    flex: 1,
    marginHorizontal: -18,
    marginBottom: -25,
  },
})

export default React.memo(TransferPopup, isEqualMemoComparison)
