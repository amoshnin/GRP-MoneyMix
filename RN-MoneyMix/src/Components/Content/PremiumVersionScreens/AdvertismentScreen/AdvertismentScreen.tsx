// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, BackHandler, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import Body from "./Body/Body"
import BottomPanel from "./BottomPanel/BottomPanel"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  selectedCurrency: string
  isSubscribed: boolean
  isAuthentificated: boolean

  setNewSubscriptionDataThunkCreator: (
    PremiumFinishDate: string | null,
    productId: string
  ) => void
}

const AdvertismentScreen: React.FC<PropsType> = (props) => {
  useEffect(() => {
    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton as any)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton as any
      )
    })
  }, [props.navigation])

  return (
    <View style={styles.container}>
      <Body />
      <BottomPanel
        navigation={props.navigation}
        isAuthentificated={props.isAuthentificated}
        selectedCurrency={props.selectedCurrency}
        isSubscribed={props.isSubscribed}
        setNewSubscriptionDataThunkCreator={
          props.setNewSubscriptionDataThunkCreator
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.memo(AdvertismentScreen, isEqualMemoComparison)
