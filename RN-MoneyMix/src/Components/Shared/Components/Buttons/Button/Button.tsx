// PLUGINS IMPORTS //
import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  content?: string

  onPress?: any

  icon?: any
  textStyle?: any
  contentTextStyle?: any
  containerStyle?: any
  showLoading?: boolean
  unSliceTitle?: boolean
}

const Button: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={
        props.onPress
          ? () => {
              setLoading(true)
              props.onPress()
            }
          : undefined
      }
    >
      {props.icon && <View style={styles.icon}>{props.icon}</View>}
      <View style={styles.text_wrap}>
        {props.showLoading && loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={[styles.title, props.textStyle]}>
            {props.unSliceTitle
              ? renderBillName(props.title, t)
              : props.title && sliceString(renderBillName(props.title, t), 10)}
          </Text>
        )}
        {props.content ? (
          <Text style={[styles.subtitle, props.contentTextStyle]}>
            {props.content}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#674ABE",
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    overflow: "hidden",
    width: 143,
  },

  icon: {
    backgroundColor: "white",
    borderRadius: 6,
    height: 34,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    flex: 1,
  },

  text_wrap: {
    alignItems: "center",
    flex: 3,
  },

  title: {
    color: "white",
    fontSize: 13.5,
  },

  subtitle: {
    fontSize: 16,
    color: "white",
  },
})

export default React.memo(Button, isEqualMemoComparison)
