// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import BodyNumPad from "./BodyNumPad/BodyNumPad"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
}

const PasswordScreen: React.FC<PropsType> = (props) => {
  const [secretCode, setSecretCode] = useState("" as string)

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        route={props.route}
        isOnline={props.isOnline}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        isForAuthentification={props.route.params.isForAuthentification}
        setSecretCodeVerified={props.route.params.setSecretCodeVerified}
      />
      <BodyNumPad secretCode={secretCode} setSecretCode={setSecretCode} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#512DA8",
    flex: 1,
  },
})

export default React.memo(PasswordScreen, isEqualMemoComparison)
