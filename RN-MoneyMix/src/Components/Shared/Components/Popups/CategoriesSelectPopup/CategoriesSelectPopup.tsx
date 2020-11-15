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

  setSelectedCategory: (selectedCategory: any) => void
  setIsIncome: (isIncomeStatus: boolean) => void

  selectedCurrency: string | null

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void

  getFullCategoriesListThunkCreator: () => void
}

const CategoriesSelectPopup: React.FC<PropsType> = (props) => {
  const Tab = createMaterialTopTabNavigator()
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  const getData = () => {
    props.getFullCategoriesListThunkCreator()
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      getData()
    })
  }, [props.navigation])

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
                setSelectedCategory: props.setSelectedCategory,
                setIsIncome: props.setIsIncome,
                setPopupVisible: props.setPopupVisible,
                selectedCurrency: props.selectedCurrency,
                navigation: props.navigation,
                totalIncomeCategoriesList: props.totalIncomeCategoriesList,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setSelectedCategory: props.setSelectedCategory,
                    setIsIncome: props.setIsIncome,
                    setPopupVisible: props.setPopupVisible,
                    selectedCurrency: props.selectedCurrency,
                    navigation: props.navigation,
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
                setSelectedCategory: props.setSelectedCategory,
                setIsIncome: props.setIsIncome,
                setPopupVisible: props.setPopupVisible,
                navigation: props.navigation,
                selectedCurrency: props.selectedCurrency,
                totalExpensesCategoriesList: props.totalExpensesCategoriesList,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setSelectedCategory: props.setSelectedCategory,
                    setIsIncome: props.setIsIncome,
                    setPopupVisible: props.setPopupVisible,
                    navigation: props.navigation,
                    selectedCurrency: props.selectedCurrency,
                    totalExpensesCategoriesList:
                      props.totalExpensesCategoriesList,
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

export default CategoriesSelectPopup
