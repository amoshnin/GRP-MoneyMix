// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { BaseButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
}

const SubHeader: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <BaseButton
      style={styles.wrapper}
      onPress={() => {
        props.navigation.navigate("PremiumVersionScreen")
      }}
    >
      <View style={styles.container}>
        <Image source={require("~/Images/star.png")} style={styles.star_img} />

        <View style={styles.text_wrap}>
          <Text style={styles.title}>
            {t("DrawerNavigator.SubHeader.PremiumVersion")}
          </Text>
          <Text style={styles.subtitle}>
            {t("DrawerNavigator.SubHeader.PPUseAllFunctionality")}
          </Text>
        </View>
      </View>
    </BaseButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 88,
    backgroundColor: "#2ECC71",
    justifyContent: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },

  star_img: {
    height: 26.35,
    width: 26.35,
  },

  text_wrap: {
    marginLeft: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    fontSize: 13.5,
    color: "white",
    width: "59%",
  },
})

export default React.memo(SubHeader, isEqualMemoComparison)
