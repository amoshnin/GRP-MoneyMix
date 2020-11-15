// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { RectButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  icon: any
  title: string
  value: string
}

const LineItem: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <RectButton style={styles.container}>
      {props.icon}
      <View style={styles.content_wrap}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.value}</Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  content_wrap: {
    marginLeft: 15,
  },

  title: {
    fontSize: 15.5,
  },

  subtitle: {
    color: "gray",
  },
})

export default LineItem
