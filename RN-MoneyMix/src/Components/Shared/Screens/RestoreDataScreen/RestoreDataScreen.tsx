// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import ButtonItem from "./ButtonItem/ButtonItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  RestoreDataFromCloudThunkCreator: (email?: string) => any
  RestoreDataFromDeviceThunkCreator: (email?: string) => any
}

const RestoreDataScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {t("PremiumVersionScreen.RequsetResetPopup.PPOflineAppUseAlert")}
      </Text>
      <View style={styles.btns_wrap}>
        <ButtonItem
          text={t("PremiumVersionScreen.RequsetResetPopup.FromCloud")}
          icon={<Ionicons name="md-cloud-outline" size={30} color="white" />}
          onPress={() => {
            props.RestoreDataFromCloudThunkCreator().then(async () => {
              props.RestoreDataFromDeviceThunkCreator().then(async () => {
                props.navigation.navigate("DrawerNavigatorLayout")
                await AsyncStorage.setItem("restoreMethod", "Cloud")
              })
            })

            setTimeout(() => {
              props.navigation.navigate("DrawerNavigatorLayout")
            }, 5000)
          }}
        />
        <ButtonItem
          text={t("PremiumVersionScreen.RequsetResetPopup.FromDevice")}
          icon={<FontAwesome name="mobile-phone" size={30} color="white" />}
          onPress={() => {
            props.RestoreDataFromDeviceThunkCreator().then(async () => {
              props.navigation.navigate("DrawerNavigatorLayout")
              await AsyncStorage.setItem("restoreMethod", "Cloud")
            })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
  },

  paragraph: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
  },

  btns_wrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  button: {
    padding: 10,
    backgroundColor: "#674ABE",
    borderRadius: 6,
    width: 140,
    alignItems: "center",
  },

  btn_text: {
    color: "white",
    flexWrap: "wrap",
    textAlign: "center",
    marginTop: 5,
  },
})

export default React.memo(RestoreDataScreen, isEqualMemoComparison)
