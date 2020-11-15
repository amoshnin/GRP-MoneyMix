// PLUGINS IMPORTS //
import React, { useEffect } from "react"
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

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  isCombining: boolean
  oldCategory: any

  selectedCurrency: string | null
  setConfirmPopupData: (newConfirmPopupData: {
    isCombining: boolean
    visible: boolean
    oldCategory: any
    newCategory: any
  }) => void

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void
  getFullCategoriesListThunkCreator: () => void
}

const TransferPopup: React.FC<PropsType> = (props) => {
  const Tab = createMaterialTopTabNavigator()
  const { t } = useTranslation()
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  useEffect(() => {
    props.getFullCategoriesListThunkCreator()
  }, [])

  const CleanTotalIncomeCategoriesList = props.totalIncomeCategoriesList.filter(
    (category: any) =>
      props.oldCategory && category.icon !== props.oldCategory.icon
  )

  const CleanTotalExpensesCategoriesList = props.totalExpensesCategoriesList.filter(
    (category: any) =>
      props.oldCategory && category.icon !== props.oldCategory.icon
  )

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
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarPosition="top"
            initialRouteName={"ReplenishScreen"}
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: "#674ABE",
              },
            }}
          >
            {props.isIncome ? (
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
                  oldCategory: props.oldCategory,
                  isCombining: props.isCombining,
                  totalIncomeCategoriesList: CleanTotalIncomeCategoriesList,
                  setConfirmPopupData: props.setConfirmPopupData,
                }}
                listeners={({ navigation, route }: any) => ({
                  focus: () => {
                    navigation.setParams({
                      setPopupVisible: props.setPopupVisible,
                      selectedCurrency: props.selectedCurrency,
                      oldCategory: props.oldCategory,
                      isCombining: props.isCombining,
                      totalIncomeCategoriesList: CleanTotalIncomeCategoriesList,
                      setConfirmPopupData: props.setConfirmPopupData,
                    })
                  },
                })}
              />
            ) : (
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
                  oldCategory: props.oldCategory,
                  isCombining: props.isCombining,
                  selectedCurrency: props.selectedCurrency,
                  totalExpensesCategoriesList: CleanTotalExpensesCategoriesList,
                  setConfirmPopupData: props.setConfirmPopupData,
                }}
                listeners={({ navigation, route }: any) => ({
                  focus: () => {
                    navigation.setParams({
                      setPopupVisible: props.setPopupVisible,
                      oldCategory: props.oldCategory,
                      isCombining: props.isCombining,
                      selectedCurrency: props.selectedCurrency,
                      totalExpensesCategoriesList: CleanTotalExpensesCategoriesList,
                      setConfirmPopupData: props.setConfirmPopupData,
                    })
                  },
                })}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 500,
  },

  container: {
    flex: 1,
    marginHorizontal: -17,
    marginBottom: -25,
  },
})

export default TransferPopup
