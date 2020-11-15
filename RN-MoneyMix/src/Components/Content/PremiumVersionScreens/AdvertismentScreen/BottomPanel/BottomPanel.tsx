// PLUGINS IMPORTS //
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SubscriptionsList from "./SubscriptionsList/SubscriptionsList"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isAuthentificated: boolean

  selectedCurrency: string
  isSubscribed: boolean
  setNewSubscriptionDataThunkCreator: (
    PremiumFinishDate: string | null,
    productId: string
  ) => void
}

const BottomPanel: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View
      style={[
        styles.container,
        props.isAuthentificated && { paddingBottom: 10 },
      ]}
    >
      {props.isSubscribed ? (
        <View style={styles.button_wrap}>
          <Button
            title={t("PremiumVersionScreen.Auth.Register")}
            containerStyle={styles.button}
            onPress={() => props.navigation.navigate("RegisterScreen")}
            unSliceTitle
          />
        </View>
      ) : (
        <SubscriptionsList
          navigation={props.navigation}
          isAuthentificated={props.isAuthentificated}
          setNewSubscriptionDataThunkCreator={
            props.setNewSubscriptionDataThunkCreator
          }
        />
      )}

      {!props.isAuthentificated && (
        <TouchableOpacity
          style={styles.bottom_wrap}
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={styles.bottom_text}>
            {t("PremiumVersionScreen.Auth.AlreadyHavePrem")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  button_wrap: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  button: {
    width: "80%",
  },

  bottom_wrap: {
    borderTopWidth: 1,
    borderTopColor: "silver",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 7,
  },

  bottom_text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
})

export default React.memo(BottomPanel, isEqualMemoComparison)
