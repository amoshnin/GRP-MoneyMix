// PLUGINS IMPORTS //
import React from "react"
import { View, Image, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("~/Images/logo.png")} />
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

  logo_wrap: {
    alignItems: "center",
  },

  logo: {
    height: 225,
    width: 255,
    resizeMode: "center",
  },
})

export default React.memo(LoadingScreen, isEqualMemoComparison)
