// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"
import { colors } from "../../../../Helpers/IconsArraysData"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const ColorsSelectScreen: React.FC<PropsType> = (props) => {
  const [selectedColor, setSelectedColor] = useState("#663AB5" as string)

  const getData = async (color?: string) => {
    props.route.params.setSelectedColor(color)
    setSelectedColor(color as string)
  }

  const ColorsData = colors as Array<any>
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>
          {t("Categories.Popups.CategoryColor")}
        </Text>
        {selectedColor && (
          <TouchableOpacity style={styles.header_color}>
            <View
              style={[
                styles.color_box,
                { backgroundColor: selectedColor ? selectedColor : "#663AB5" },
              ]}
            >
              <FontAwesome
                name={props.route.params.selectedIcon}
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.colors_list}>
        {ColorsData.map((color: string) => {
          return (
            <TouchableOpacity
              style={[styles.color_box, { backgroundColor: color }]}
              onPress={() => {
                getData(color)
              }}
            ></TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    marginHorizontal: -17,
    backgroundColor: "#EFEFEF",
  },

  header: {
    paddingBottom: 20,
    paddingTop: 15,
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  header_text: {
    marginLeft: 5,
    fontSize: 20,
  },

  header_color: {
    borderRadius: 7,
    height: 36,
    width: 36,
    backgroundColor: "#674ABE",
    alignItems: "center",
    justifyContent: "center",
  },

  colors_list: {
    flexDirection: "row",
    justifyContent: "center",

    marginBottom: 10,
  },

  color_box: {
    borderWidth: 2,
    borderRadius: 7,
    height: 42,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },

  field_wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  buttons_wrap: {
    borderTopColor: "gray",
    borderTopWidth: 0.4,
    backgroundColor: "white",
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 5,
  },
})

export default ColorsSelectScreen
