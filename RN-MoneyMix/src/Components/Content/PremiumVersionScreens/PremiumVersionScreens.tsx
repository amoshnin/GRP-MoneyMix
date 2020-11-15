// PLUGINS IMPORTS //
import React from "react"
import { StyleSheet } from "react-native"
import { compose } from "redux"
import { connect } from "react-redux"
import { createStackNavigator } from "@react-navigation/stack"
import { BorderlessButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import AdvertismentScreenContainer from "./AdvertismentScreen/AdvertismentScreenContainer"

import LoginScreenContainer from "./Auth/LoginScreen/LoginScreenContainer"
import RegistrationScreenContainer from "./Auth/RegistrationScreen/RegistrationScreenContainer"
import ResetPasswordScreenContainer from "./Auth/ResetPasswordScreen/ResetPasswordScreenContainer"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
import { AntDesign } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
}

type MapDispatchToPropsType = {}

/////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
}

const AdvertismentScreenStack: React.FC<PropsType> = (props) => {
  const Stack = createStackNavigator()
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName="AdvertismentScreen">
      <Stack.Screen
        name="AdvertismentScreen"
        component={AdvertismentScreenContainer}
        options={({ navigation, route }: any) => ({
          headerTitle: t("PremiumVersionScreen.PremiumVersion"),
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerLeft: () => (
            <BorderlessButton
              style={styles.icon}
              hitSlop={{ horizontal: 200, vertical: 200 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </BorderlessButton>
          ),
        })}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreenContainer}
        options={({ navigation, route }: any) => ({
          headerTitle: t("PremiumVersionScreen.Auth.Login"),
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerLeft: () => (
            <BorderlessButton
              style={styles.icon}
              hitSlop={{ horizontal: 200, vertical: 200 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </BorderlessButton>
          ),
        })}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegistrationScreenContainer}
        options={({ navigation, route }: any) => ({
          headerTitle: t("PremiumVersionScreen.Auth.Registration"),
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
        initialParams={{
          PremiumFinishDate: null as string | null,
          productId: null as string | null,
        }}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreenContainer}
        options={({ navigation, route }: any) => ({
          headerTitle: t("PremiumVersionScreen.Auth.ResetPasswordTitle"),
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 11.5,
    padding: 1.5,
  },
})

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {}
  )
)(AdvertismentScreenStack)
