// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  icon: string
  color: string
}

const Header: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {renderCategoryTitle(props.title, t, true)}
      </Text>
      <RoundButton backgroundColor={props.color}>
        <FontAwesome name={props.icon} color={"white"} size={24} />
      </RoundButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  title: {
    fontSize: 24,
    color: "black",
  },
})

export default React.memo(Header, isEqualMemoComparison)
