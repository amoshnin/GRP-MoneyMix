// PLUGINS IMPORTS //
import React from "react"
import { Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTranslation } from "react-i18next"
import { NavigationContainer } from "@react-navigation/native"

// COMPONENTS IMPORTS //
import ReplenishScreen from "./ReplenishScreen/ReplenishScreen"
import WithdrawlScreen from "./WithdrawlScreen/WithDrawlScreen"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedCurrency: string | null

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>
  setIsIncome: (isIncome: boolean) => void

  selectedCategory: any
  setSelectedCategory: (newSelectedCategory: any) => void
  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void
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

  const CleanTotalIncomeCategoriesList = props.totalIncomeCategoriesList.filter(
    (category: any) => category.icon !== props.selectedCategory.icon
  )

  const CleanTotalExpensesCategoriesList = props.totalExpensesCategoriesList.filter(
    (category: any) => category.icon !== props.selectedCategory.icon
  )

  return (
    <Dialog
      width={320}
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        } as any)
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
                navigation: props.navigation,
                selectedCategory: props.selectedCategory,
                totalIncomeCategoriesList: CleanTotalIncomeCategoriesList,
                setSelectedCategory: props.setSelectedCategory,
                setIsIncome: props.setIsIncome,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    selectedCurrency: props.selectedCurrency,
                    navigation: props.navigation,
                    selectedCategory: props.selectedCategory,
                    totalIncomeCategoriesList: CleanTotalIncomeCategoriesList,
                    setSelectedCategory: props.setSelectedCategory,
                    setIsIncome: props.setIsIncome,
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
                navigation: props.navigation,
                selectedCategory: props.selectedCategory,
                selectedCurrency: props.selectedCurrency,
                totalExpensesCategoriesList: CleanTotalExpensesCategoriesList,
                setSelectedCategory: props.setSelectedCategory,
                setIsIncome: props.setIsIncome,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    navigation: props.navigation,
                    selectedCategory: props.selectedCategory,
                    selectedCurrency: props.selectedCurrency,
                    totalExpensesCategoriesList: CleanTotalExpensesCategoriesList,
                    setSelectedCategory: props.setSelectedCategory,
                    setIsIncome: props.setIsIncome,
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
    height: 500,
  },

  container: {
    flex: 1,
    marginHorizontal: -17,
    marginBottom: -25,
  },
})

export default React.memo(TransferPopup, isEqualMemoComparison)
