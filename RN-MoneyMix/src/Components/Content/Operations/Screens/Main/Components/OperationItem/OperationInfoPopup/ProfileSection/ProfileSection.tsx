// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderProfile,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  operation: any
}

const ProfileSection: React.FC<PropsType> = (props) => {
  const [selectedProfile, setSelectedProfile] = useState("General")
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      setSelectedProfile((await AsyncStorage.getItem("selectedProfile")) as any)
    }

    getData()
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <MaterialIcons name="account-circle" size={28} color="#674ABE" />
        <View style={styles.text_wrap}>
          <Text style={styles.text}>{t("Header.Popups.Profile")}</Text>
          <CustomText color={"#674ABE"} size={17}>
            {renderProfile(selectedProfile as any, t).toUpperCase()}
          </CustomText>
        </View>
      </View>
      {props.operation.subCategory && (
        <View style={styles.container}>
          <FontAwesome
            name={props.operation.subCategory.icon}
            color={props.operation.subCategory.color}
            size={24}
          />
          <Text style={styles.sub_category_text}>
            {props.operation.subCategory &&
              `${props.operation.subCategory.title}`}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    borderColor: "#E9E9E9",
    borderWidth: 1,
  },

  container: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  text_wrap: {
    alignItems: "center",
    marginLeft: 20,
  },

  text: {
    color: "#674ABE",
  },

  sub_category_text: {
    fontSize: 20,
    marginLeft: 10,
  },

  block: {
    flex: 1,
    height: 60,
  },
})

export default React.memo(ProfileSection, isEqualMemoComparison)
