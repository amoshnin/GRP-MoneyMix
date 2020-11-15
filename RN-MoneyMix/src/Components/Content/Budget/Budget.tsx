// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import { createStackNavigator } from "@react-navigation/stack"

// COMPONENTS IMPORTS //
import MainContainer from "./Screens/Main/MainContainer"
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import LineItem from "~/Components/Shared/Components/LineItem/LineItem"

import CalendarHeaderOptionContainer from "~/Components/Shared/Components/GeneralHeader/CalendarHeaderOption/CalendarHeaderOptionContainer"
import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"
import { concat } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { Octicons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  BudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }

  setFastBudgetThunkCreator: (timeRange: string) => void
  deleteAllBudgetsThunkCreator: () => void

  getBudgetsThunkCreator: () => void
  getBillsListsThunkCreator: () => void
  getBillsMoneyAmountThunkCreator: () => void
  getCategoriesListsThunkCreator: () => void
  getIncomeAndExpensesAmountThunkCreator: () => void
}

const Category: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()
  const Stack = createStackNavigator()

  useEffect(() => {
    props.getBudgetsThunkCreator()
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      props.getBudgetsThunkCreator()
    })
  }, [props.navigation])

  const budgetsExist =
    concat(
      props.BudgetedArrays.Income,
      props.BudgetedArrays.Expenses,
      props.BudgetedArrays.Savings
    ).length > 0
  return (
    <>
      <Stack.Navigator initialRouteName="BudgetMain">
        <Stack.Screen
          name="BudgetMain"
          component={MainContainer}
          options={({ navigation, route }: any) => ({
            header: () => (
              <GeneralHeader
                middleContent={<CalendarHeaderOptionContainer />}
                leftIcons={
                  <BorderlessButton
                    rippleColor="#808080"
                    style={styles.icon}
                    hitSlop={{ horizontal: 20, vertical: 20 }}
                    onPress={() => props.navigation.openDrawer()}
                  >
                    <Feather name="menu" size={24} color="white" />
                  </BorderlessButton>
                }
                rightIcons={
                  <BorderlessButton
                    rippleColor="#808080"
                    style={styles.icon}
                    hitSlop={{ horizontal: 20, vertical: 20 }}
                    onPress={() => setPopupVisible(true)}
                  >
                    <FontAwesome name="magic" size={24} color="white" />
                  </BorderlessButton>
                }
              />
            ),
          })}
          initialParams={{
            isIncome: true as boolean,
            isEditMode: false as boolean,
          }}
        />
      </Stack.Navigator>

      <TitledPopup
        title={t("Budget.Popup.FastBudget")}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        height={"27%"}
        wrapperStyle={styles.popup_wrapper}
      >
        <LineItem
          title={t("Budget.Popup.CurrentExpenses")}
          icon={<FontAwesome name="calendar-check-o" size={24} color="black" />}
          onPress={() => {
            props.setFastBudgetThunkCreator("current")
            setPopupVisible(false)
          }}
        />

        <LineItem
          title={t("Budget.Popup.LastMonthExpenses")}
          icon={<Octicons name="calendar" size={24} color="black" />}
          onPress={() => {
            props.setFastBudgetThunkCreator("last_month")
            setPopupVisible(false)
          }}
        />

        {budgetsExist && (
          <LineItem
            title={`${t("Operations.Popup.Delete")} ${t(
              "DrawerNavigator.ButtonsList.Budget"
            ).toLowerCase()}`}
            icon={
              <Ionicons
                name="md-close-circle-outline"
                size={24}
                color="black"
              />
            }
            onPress={() => {
              props.deleteAllBudgetsThunkCreator()
              setPopupVisible(false)
            }}
          />
        )}
      </TitledPopup>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 3,
    paddingVertical: 3,
  },

  popup_wrapper: {
    width: 310,
    marginHorizontal: -19,
    backgroundColor: "#F1F1F1",
  },
})

export default React.memo(Category, isEqualMemoComparison)
