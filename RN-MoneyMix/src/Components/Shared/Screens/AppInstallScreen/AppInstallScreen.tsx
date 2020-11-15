// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import * as Animatable from "react-native-animatable"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const AppInstallScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Animatable.View animation="flipInX" delay={120} style={styles.logo_wrap}>
        <Image style={styles.logo} source={require("~/Images/logo.png")} />
      </Animatable.View>
      <Text style={styles.text}>{t("AppInstallScreen.PPStart")}</Text>
      <Button
        title={`${t("AppInstallScreen.Start")}!`}
        onPress={async () => {
          await AsyncStorage.setItem("appUsed", "s")
          await props.route.params.setInitialCall()
          await props.route.params.setAppUsed(true)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 17,
    backgroundColor: "white",
  },

  text: {
    textAlign: "center",
    fontSize: 16.2,
    marginBottom: 20,
    color: "black",
  },

  logo_wrap: {
    alignItems: "center",
  },

  logo: {
    height: 225,
    width: 255,
    resizeMode: "center",
  },
})

export default React.memo(AppInstallScreen, isEqualMemoComparison)
