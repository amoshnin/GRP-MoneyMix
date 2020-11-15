// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  color?: string
  function?: () => void

  isBill?: boolean
  containerStyle?: any
  selectedFilters: Array<any>
  setSelectedFilters?: any
}

const FilterItem: React.FC<PropsType> = (props) => {
  const isSelected = props.selectedFilters.includes(props.title)
  const [randomColor, setRandomColor] = useState("" as string)
  const { t } = useTranslation()

  useEffect(() => {
    var lum = -0.25
    var hex = String(
      "#" + Math.random().toString(16).slice(2, 8).toUpperCase()
    ).replace(/[^0-9a-f]/gi, "")
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    var rgb = "#",
      c,
      i
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
      rgb += ("00" + c).substr(c.length)
    }

    setRandomColor(rgb)
  }, [])

  const toggleSelectedFilter = () => {
    if (isSelected) {
      const CleanedArray = props.selectedFilters.filter(
        (filterTitle: string) => {
          return filterTitle !== props.title
        }
      )

      props.setSelectedFilters(CleanedArray)
    } else {
      props.setSelectedFilters([...props.selectedFilters, props.title])
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        props.setSelectedFilters ? toggleSelectedFilter() : undefined
      }
      style={[
        styles.container,
        props.containerStyle,
        isSelected
          ? { backgroundColor: props.color || randomColor }
          : { borderColor: props.color || randomColor, borderWidth: 1.5 },
      ]}
    >
      <Text
        style={
          isSelected
            ? { color: "white" }
            : { color: props.color || randomColor }
        }
      >
        {(props.title === "Income" ||
        props.title === "Expenses" ||
        props.title === "Transaction" ||
        props.title === "Balance"
          ? t(`Categories.Main.${props.title}`)
          : props.isBill
          ? renderBillName(props.title, t)
          : renderCategoryTitle(props.title, t, true)
        ).toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 28,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
})

export default React.memo(FilterItem, isEqualMemoComparison)
