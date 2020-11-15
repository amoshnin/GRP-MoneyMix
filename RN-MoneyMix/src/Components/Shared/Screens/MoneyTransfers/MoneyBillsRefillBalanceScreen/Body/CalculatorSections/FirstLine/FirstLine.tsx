// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import {
  renderProfile,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const FirstLine: React.FC<PropsType> = (props) => {
  const [selectedProfile, setSelectedProfile] = useState("General")
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      setSelectedProfile((await AsyncStorage.getItem("selectedProfile")) as any)
    }

    getData()
  }, [])

  return (
    <View style={styles.container}>
      <BlockItem
        icon={<MaterialIcons name="account-circle" size={28} color="#674ABE" />}
        content={
          <View style={styles.text_wrap}>
            <Text style={styles.text}>{t("Header.Popups.Profile")}</Text>
            <CustomText color={"#674ABE"} size={17}>
              {renderProfile(selectedProfile as any, t).toUpperCase()}
            </CustomText>
          </View>
        }
        containerStyle={styles.block}
        isGray
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: -25,
  },

  text_wrap: {
    alignItems: "center",
    marginLeft: 20,
  },

  text: {
    color: "#674ABE",
  },

  block: {
    flex: 1,
    height: 60,
  },
})

export default React.memo(FirstLine, isEqualMemoComparison)
