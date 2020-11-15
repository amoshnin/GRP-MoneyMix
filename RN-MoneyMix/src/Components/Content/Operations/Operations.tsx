// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"

import { createStackNavigator } from "@react-navigation/stack"

// COMPONENTS IMPORTS //
import MainContainer from "./Screens/Main/MainContainer"
import FilterScreenContainer from "./Screens/FilterScreen/FilterScreenContainer"

import CalendarHeaderOptionContainer from "~/Components/Shared/Components/GeneralHeader/CalendarHeaderOption/CalendarHeaderOptionContainer"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"

import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
}

const Operations: React.FC<PropsType> = (props) => {
  const Stack = createStackNavigator()
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName="OperationsMain">
      <Stack.Screen
        name="OperationsMain"
        component={MainContainer}
        options={({ navigation, route }: any) => ({
          header: () => (
            <GeneralHeader
              middleContent={
                route.params.selectedOperationsCount > 0 ? (
                  <Text style={styles.header_text}>
                    {route.params.selectedOperationsCount}
                  </Text>
                ) : (
                  <CalendarHeaderOptionContainer />
                )
              }
              leftIcons={
                route.params.selectedOperationsCount > 0 ? (
                  <BorderlessButton
                    rippleColor="#808080"
                    style={styles.header_icon}
                    hitSlop={{ horizontal: 20, vertical: 20 }}
                    onPress={() =>
                      navigation.setParams({
                        selectedOperationsCount: null,
                      })
                    }
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </BorderlessButton>
                ) : (
                  <BorderlessButton
                    rippleColor="#808080"
                    style={styles.header_icon}
                    hitSlop={{ horizontal: 20, vertical: 20 }}
                    onPress={() => navigation.openDrawer()}
                  >
                    <Feather name="menu" size={24} color="white" />
                  </BorderlessButton>
                )
              }
              rightIcons={
                route.params.selectedOperationsCount > 0 ? (
                  <BorderlessButton
                    rippleColor="#808080"
                    style={styles.header_icon}
                    hitSlop={{ horizontal: 20, vertical: 20 }}
                    onPress={() =>
                      navigation.setParams({
                        allowDeleteOperations: true,
                      })
                    }
                  >
                    <FontAwesome name="trash-o" size={24} color="#FF555B" />
                  </BorderlessButton>
                ) : (
                  <>
                    <BorderlessButton
                      rippleColor="#808080"
                      style={[styles.header_icon, styles.header_right_icon]}
                      hitSlop={{ horizontal: 20, vertical: 20 }}
                      onPress={() =>
                        navigation.setParams({
                          isSearching: !route.params.isSearching,
                        })
                      }
                    >
                      <MaterialIcons name="search" size={24} color="white" />
                    </BorderlessButton>
                    <BorderlessButton
                      rippleColor="#808080"
                      style={[styles.header_icon, styles.header_right_icon]}
                      hitSlop={{ horizontal: 20, vertical: 20 }}
                      onPress={() =>
                        navigation.navigate("FilterScreen", {
                          selectedFilters: route.params.selectedFilters,
                        })
                      }
                    >
                      <MaterialIcons
                        name="filter-list"
                        size={24}
                        color="white"
                      />
                    </BorderlessButton>
                  </>
                )
              }
              rightIconsWrapStyle={{
                width: 65,
              }}
            />
          ),
        })}
        initialParams={{
          selectedFilters: [] as Array<string>,
          category: props.route.params.category,
          bill: props.route.params.bill,
          previousNavigation: props.navigation,
          selectedOperationsCount: null as null | number,
          allowDeleteOperations: false as boolean,
          isSearching: false as boolean,
        }}
        listeners={({ navigation, route }: any) => ({
          focus: () => {
            navigation.setParams({
              category: props.route.params.category,
              bill: props.route.params.bill,
              selectedOperationsCount: route.params.selectedOperationsCount,
            })
          },
        })}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreenContainer}
        options={({ navigation, route }: any) => ({
          title: t("Operations.FilterScreen.Filter"),
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            letterSpacing: 0.5,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.header_left_icon}
              onPress={() =>
                navigation.navigate("OperationsMain", {
                  selectedFilters: [],
                })
              }
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
        initialParams={{
          selectedFilters: [] as Array<string>,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: "20%",
  },

  header_icon: {
    paddingHorizontal: 2.5,
    paddingVertical: 2.5,
  },

  header_left_icon: {
    marginLeft: 10,
  },

  header_right_icon: {
    marginHorizontal: 5,
  },
})

export default React.memo(Operations, isEqualMemoComparison)
