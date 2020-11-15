// PLUGINS IMPORTS //
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
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

  subtitle1?: string
  subValue1?: string
  subtitle2?: string
  subValue2?: string

  icon?: any
  textStyle?: any
  debt?: boolean

  onPress?: any
}

const LongButton: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => props.onPress()}>
      <View style={styles.container}>
        {props.icon && <View style={styles.icon}>{props.icon}</View>}
        <View style={[styles.text_wrap, { marginRight: 45 }]}>
          <Text style={[styles.title, props.textStyle]}>
            {sliceString(renderBillName(props.title, t), 10)}
          </Text>
          {props.content && (
            <Text style={styles.subtitle}>{props.content}</Text>
          )}
        </View>
      </View>
      <View style={styles.info_container}>
        <View style={styles.text_wrap}>
          <View style={styles.info_block_line_wrap}>
            <Text
              style={[
                styles.info_text,
                { color: props.debt ? "#FF3940" : "#674ABE", width: 90 },
              ]}
            >
              {props.subtitle1}
            </Text>
            <Text
              style={[
                styles.info_text,
                { color: props.debt ? "#FF3940" : "#674ABE" },
              ]}
            >
              {props.subValue1}
            </Text>
          </View>
          <View style={styles.info_block_line_wrap}>
            <Text
              style={[
                styles.info_text,
                { color: props.debt ? "#01CA5C" : "#674ABE", width: 90 },
              ]}
            >
              {props.subtitle2}
            </Text>
            <Text
              style={[
                styles.info_text,
                { color: props.debt ? "#01CA5C" : "#674ABE" },
              ]}
            >
              {props.subValue2}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: 48,
    borderRadius: 6,
    marginRight: 160,
    marginBottom: 12,
    marginTop: 5,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#674ABE",
    width: "100%",
    borderRadius: 6,
    justifyContent: "space-between",
  },

  icon: {
    backgroundColor: "white",
    borderRadius: 6,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 6.5,
  },

  text_wrap: {
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 1,
  },

  title: {
    color: "white",
    fontSize: 13.5,
  },

  subtitle: {
    fontSize: 16,
    color: "white",
  },

  info_container: {
    backgroundColor: "#E9E9E9",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
    left: -5,
    zIndex: -20,
  },

  info_block_line_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 152,
  },

  info_text: {
    fontSize: 12.7,
  },
})

export default React.memo(LongButton, isEqualMemoComparison)
