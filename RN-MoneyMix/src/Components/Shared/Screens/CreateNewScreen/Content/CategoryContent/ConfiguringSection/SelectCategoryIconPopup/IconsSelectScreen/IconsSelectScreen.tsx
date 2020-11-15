// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"
import { icons } from "../../../../Helpers/IconsArraysData"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const IconsSelectScreen: React.FC<PropsType> = (props) => {
  const [selectedIcon, setSelectedIcon] = useState("shopping-bag" as string)
  const [CategoriesData, setCategoriesData] = useState(icons as Array<any>)

  useEffect(() => {
    const CleanedArray: any = CategoriesData.filter((el) =>
      props.route.params.usedIconsArray
        ? !props.route.params.usedIconsArray.includes(el)
        : el
    )

    setCategoriesData(CleanedArray)
  }, [])

  const getData = async (icon?: string) => {
    props.route.params.setSelectedIcon(icon)
    setSelectedIcon(icon as string)
  }
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>
          {t("Categories.Popups.CategoryIcon")}
        </Text>
        {selectedIcon && (
          <TouchableOpacity
            style={[
              styles.header_icon,
              {
                backgroundColor: props.route.params.selectedColor
                  ? props.route.params.selectedColor
                  : "#674ABE",
              },
            ]}
          >
            <FontAwesome name={selectedIcon} size={20} color={"white"} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.icons_list}>
        {CategoriesData.map((icon: string) => {
          return (
            <TouchableOpacity
              style={[
                styles.icon,
                selectedIcon === icon && {
                  backgroundColor: props.route.params.selectedColor
                    ? props.route.params.selectedColor
                    : "#674ABE",
                },
              ]}
              onPress={() => {
                getData(icon)
              }}
            >
              <FontAwesome
                name={icon}
                size={24}
                color={selectedIcon === icon ? "white" : "#674ABE"}
              />
            </TouchableOpacity>
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
    height: 500,
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

  header_icon: {
    borderRadius: 7,
    height: 36,
    width: 36,
    backgroundColor: "#674ABE",
    alignItems: "center",
    justifyContent: "center",
  },

  icons_list: {
    flexDirection: "row",
    justifyContent: "center",
  },

  icon: {
    borderColor: "#674ABE",
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

export default IconsSelectScreen
