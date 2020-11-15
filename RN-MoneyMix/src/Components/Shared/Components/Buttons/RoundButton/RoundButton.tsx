// PLUGINS IMPORTS //
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import * as Animatable from "react-native-animatable"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title?: string

  topText?: string
  bottomText?: string
  selectedCurrency?: string | null

  onPress?: any
  wrapperStyle?: any
  containerStyle?: any
  backgroundColor?: any
  children: any
}

const RoundButton: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <Animatable.View animation="bounceIn">
      <View style={[styles.wrapper, props.wrapperStyle]}>
        {props.topText && <Text style={styles.top_text}>{props.topText}</Text>}
        <TouchableOpacity
          style={[
            styles.container,
            props.containerStyle,
            { backgroundColor: props.backgroundColor },
          ]}
          onPress={() => (props.onPress ? props.onPress() : undefined)}
        >
          <View style={styles.icon}>{props.children}</View>
        </TouchableOpacity>
        {props.bottomText ? (
          <Text style={{ color: props.backgroundColor }}>
            {props.bottomText}{" "}
            {t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`)}
          </Text>
        ) : null}
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
  },

  container: {
    borderRadius: 8,
    height: 45,
    width: 45,
    justifyContent: "center",
    marginBottom: 7,
  },

  title: {
    width: 80,
    textAlign: "center",
    color: "black",
  },

  top_text: {
    opacity: 0.6,
    marginBottom: 4,
    color: "black",
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(RoundButton, isEqualMemoComparison)
