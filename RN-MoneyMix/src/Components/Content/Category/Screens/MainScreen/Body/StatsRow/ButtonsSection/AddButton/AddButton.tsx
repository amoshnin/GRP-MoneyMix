// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isAuthentificated: boolean

  isEditMode: boolean
  isIncome: boolean

  incomeCategoriesLength: number
  expensesCategoriesLength: number
}

const AddButton: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const showStar = () => {
    if (props.isAuthentificated) {
      return false
    } else {
      if (props.isIncome) {
        if (props.incomeCategoriesLength >= 1) {
          return true
        } else {
          return false
        }
      } else {
        if (props.expensesCategoriesLength >= 8) {
          return true
        } else {
          return false
        }
      }
    }
  }

  return (
    <View>
      {props.isEditMode ? (
        <>
          <TouchableOpacity
            onPress={() => {
              if (showStar()) {
                props.navigation.navigate("PremiumVersionScreen")
              } else {
                props.navigation.navigate("CreateNewScreen", {
                  category: null,
                  isIncome: props.isIncome,
                  isCategoryCreate: true,
                })
              }
            }}
            style={[styles.button_wrap, styles.add_button]}
          >
            {showStar() && (
              <View style={styles.star_wrap}>
                <Image
                  source={require("~/Images/star.png")}
                  style={styles.star}
                />
              </View>
            )}
            <Text style={[styles.button_title, styles.add_button_text]}>
              {t("Categories.Main.AddMore")}
            </Text>
            <AntDesign name="plus" size={17} color="gray" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() =>
            props.isAuthentificated
              ? props.navigation.navigate("TemplatesScreen", {
                  isIncome: props.isIncome,
                })
              : props.navigation.navigate("PremiumVersionScreen")
          }
          style={[styles.add_button, styles.template_button]}
        >
          {!props.isAuthentificated && (
            <View style={styles.star_wrap}>
              <Image
                source={require("~/Images/star.png")}
                style={styles.star}
              />
            </View>
          )}
          <Text style={styles.template_button_text}>
            {t("Categories.Main.OpenTemplates")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button_wrap: {
    width: 156,
    alignItems: "center",
    elevation: 10,
    marginRight: 7,
    zIndex: -20,
  },

  button_title: {
    color: "white",
    fontSize: 13,
  },

  add_button: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },

  add_button_text: {
    marginVertical: 8,
    color: "gray",
    marginRight: 4,
    paddingBottom: 1.5,
  },

  template_button: {
    backgroundColor: "#674ABE",
    width: "100%",
    elevation: 10,
    marginRight: -10,
    paddingRight: 10,
  },

  template_button_text: {
    color: "white",
    marginLeft: 10,
    fontSize: 13,
    paddingBottom: 1.5,
    marginVertical: 8,
  },

  star_wrap: {
    backgroundColor: "#674ABE",
    borderRadius: 100,
    position: "absolute",
    padding: 3.7,
    left: -8.5,
    top: -8.5,
    zIndex: 1,
  },

  star: {
    height: 14.5,
    width: 14.5,
  },
})

export default React.memo(AddButton, isEqualMemoComparison)
