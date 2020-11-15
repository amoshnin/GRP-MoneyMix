// PLUGINS IMPORTS //
import React from "react"
import { Text, Image, StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import { createStackNavigator } from "@react-navigation/stack"

// COMPONENTS IMPORTS //
import MainContainer from "./Screens/Main/MainContainer"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  isAuthentificated: boolean

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
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
}

const Bills: React.FC<PropsType> = (props) => {
  const Stack = createStackNavigator()
  const { t } = useTranslation()

  const TotalBillsLength =
    (props.normalBillsList && props.normalBillsList.length) +
    (props.debtsBillsList && props.debtsBillsList.length) +
    (props.savingsBillsList && props.savingsBillsList.length)

  return (
    <Stack.Navigator initialRouteName="BillsMain">
      <Stack.Screen
        name="BillsMain"
        component={MainContainer}
        options={({ navigation, route }: any) => ({
          header: () => (
            <GeneralHeader
              middleContent={
                <Text style={styles.header_title}>
                  {t("BillsScreen.Bills")}
                </Text>
              }
              leftIcons={
                <BorderlessButton
                  rippleColor="#808080"
                  style={styles.header_icon}
                  hitSlop={{ horizontal: 20, vertical: 20 }}
                  onPress={() => navigation.openDrawer()}
                >
                  <Feather name="menu" size={24} color="white" />
                </BorderlessButton>
              }
              rightIcons={
                <BorderlessButton
                  rippleColor="#808080"
                  style={styles.header_icon}
                  hitSlop={{ horizontal: 20, vertical: 20 }}
                  onPress={() =>
                    props.isAuthentificated
                      ? navigation.setParams({
                          createNewBillPopupVisible: true,
                        })
                      : navigation.navigate("PremiumVersionScreen")
                  }
                >
                  <AntDesign name="plus" size={24} color="white" />
                  {TotalBillsLength >= 1 && !props.isAuthentificated && (
                    <Image
                      source={require("~/Images/star.png")}
                      style={styles.vip_star_img}
                    />
                  )}
                </BorderlessButton>
              }
            />
          ),
        })}
        initialParams={{
          createNewBillPopupVisible: false as boolean,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header_title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    marginLeft: "23%",
  },

  header_icon: {
    paddingHorizontal: 2.5,
    paddingVertical: 2.5,
  },

  vip_star_img: {
    position: "absolute",
    height: 17.65,
    width: 17.65,
    right: -5,
    top: -5,
  },
})

export default React.memo(Bills, isEqualMemoComparison)
