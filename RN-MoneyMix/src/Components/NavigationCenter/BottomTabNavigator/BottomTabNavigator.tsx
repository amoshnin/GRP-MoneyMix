// PLUGINS IMPORTS //
import React from "react"

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BillsContainer from "~/Components/Content/Bills/BillsContainer"
import CategoryContainer from "~/Components/Content/Category/CategoryContainer"
import Operations from "~/Components/Content/Operations/Operations"
import BudgetContainer from "~/Components/Content/Budget/BudgetContainer"
import Stats from "~/Components/Content/Stats/Stats"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { SimpleLineIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
  budgetEnabledStatus: boolean
}

const BottomTabNavigator: React.FC<PropsType> = (props) => {
  const Tab = createMaterialBottomTabNavigator()
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={props.route.params.initialRouteName}
      activeColor="white"
      barStyle={{
        backgroundColor: "#674ABE",
      }}
    >
      <Tab.Screen
        name="Bills"
        component={BillsContainer}
        options={{
          tabBarLabel: t("DrawerNavigator.ButtonsList.Bills"),
          tabBarIcon: ({ focused }: any) => (
            <SimpleLineIcons
              name="wallet"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryContainer}
        options={{
          tabBarLabel: t("DrawerNavigator.ButtonsList.Category"),
          tabBarIcon: ({ focused }: any) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Operations"
        component={Operations}
        options={{
          tabBarLabel: t("DrawerNavigator.ButtonsList.Operations"),
          tabBarIcon: ({ focused }: any) => (
            <MaterialCommunityIcons
              name="file-document-box-outline"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
        initialParams={{
          category: null as any,
          bill: null as any,
        }}
      />
      {props.budgetEnabledStatus && (
        <Tab.Screen
          name="Budget"
          component={BudgetContainer}
          options={{
            tabBarLabel: t("DrawerNavigator.ButtonsList.Budget"),
            tabBarIcon: ({ focused }: any) => (
              <MaterialCommunityIcons
                name="rhombus-split"
                size={24}
                color={focused ? "white" : "silver"}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: t("DrawerNavigator.ButtonsList.Stats"),

          tabBarIcon: ({ focused }: any) => (
            <Ionicons
              name="md-stats"
              size={24}
              color={focused ? "white" : "silver"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default React.memo(BottomTabNavigator, isEqualMemoComparison)
