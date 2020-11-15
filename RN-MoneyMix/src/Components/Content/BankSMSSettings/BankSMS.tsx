// PLUGINS IMPORTS //
import React from "react"
import { StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import MainContainer from "./Screens/Main/MainContainer"
import IndividualBankSMSScreenContainer from "./Screens/IndividualBankSMSScreen/IndividualBankSMSScreenContainer"

import ChooseBillScreenContainer from "./Screens/CreateNewSMSTemplateScreens/ChooseBillScreen/ChooseBillScreenContainer"
import InputSMSInfoScreenContainer from "./Screens/CreateNewSMSTemplateScreens/InputSMSInfoScreen/InputSMSInfoScreenContainer"
import KeywordsScreenContainer from "./Screens/KeywordsScreen/KeywordsScreenContainer"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const BankSMS: React.FC<PropsType> = (props) => {
  const Stack = createStackNavigator()
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName="BankSMSMain">
      <Stack.Screen
        name="BankSMSMain"
        component={MainContainer}
        options={({ navigation, route }: any) => ({
          title: t("DrawerNavigator.ButtonsList.BankSMS"),
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerLeft: () => (
            <BorderlessButton
              rippleColor="#808080"
              style={styles.icon}
              hitSlop={{ horizontal: 20, vertical: 20 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </BorderlessButton>
          ),
          headerRight: () => (
            <BorderlessButton
              rippleColor="#808080"
              style={styles.right_icon}
              hitSlop={{ horizontal: 20, vertical: 20 }}
              onPress={() => navigation.navigate("KeywordsScreen")}
            >
              <FontAwesome5 name="key" size={19} color="white" />
            </BorderlessButton>
          ),
        })}
      />
      <Stack.Screen
        name="IndividualBankSMSScreen"
        component={IndividualBankSMSScreenContainer}
        options={({ navigation, route }: any) => ({
          title: t("BankSMSSettings.NewSMSTemplate"),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#512DA8",
          },
        })}
        initialParams={{
          bill: null as any,
          templateInfo: null as any,
        }}
      />

      <Stack.Screen
        name="ChooseBillScreenContainer"
        component={ChooseBillScreenContainer}
        options={({ navigation, route }: any) => ({
          title: t("BankSMSSettings.SelectBill"),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#512DA8",
          },
        })}
      />

      <Stack.Screen
        name="InputSMSInfoScreen"
        component={InputSMSInfoScreenContainer}
        options={({ navigation, route }: any) => ({
          title: t("BankSMSSettings.NewSMSTemplate"),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#512DA8",
          },
        })}
        initialParams={{
          bill: null as any,
        }}
      />

      <Stack.Screen
        name="KeywordsScreen"
        component={KeywordsScreenContainer}
        options={({ navigation, route }: any) => ({
          title: t("BankSMSSettings.KeywordsList"),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#512DA8",
          },
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 13,
  },

  right_icon: {
    marginRight: 23,
  },
})

export default BankSMS
