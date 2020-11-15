// PLUGINS IMPORTS //
import React, { useState } from "react"
import { ScrollView, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CredentialsSection from "./CredentialsSection/CredentialsSection"
import BodySection from "./BodySection/BodySection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  RegisterUserThunkCreatior: (
    email: string,
    password: string,
    PremiumFinishDate: string | null,
    productId: string,
    userInfo: {
      avatarURL: string | null
      name: string | null
      email: string | null
    }
  ) => void
}

const RegisterScreen: React.FC<PropsType> = (props) => {
  const [userInfo, setUserInfo] = useState({
    avatarURL: null as string | null,
    name: null as string | null,
    email: null as string | null,
  })

  return (
    <ScrollView style={styles.wrapper}>
      <CredentialsSection userInfo={userInfo} />

      <BodySection
        navigation={props.navigation}
        route={props.route}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        RegisterUserThunkCreatior={props.RegisterUserThunkCreatior}
      />
    </ScrollView>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
})

export default React.memo(RegisterScreen, isEqualMemoComparison)
