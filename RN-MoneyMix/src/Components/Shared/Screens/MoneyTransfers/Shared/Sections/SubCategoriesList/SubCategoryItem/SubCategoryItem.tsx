// PLUGINS IMPORTS //
import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  subCategoryItem: any

  selectedSubCategory: any
  setSelectedSubCategory: (newSelectedSubCategory: any) => void
}

const SubCategoryItem: React.FC<PropsType> = (props) => {
  const isSelected = props.selectedSubCategory === props.subCategoryItem
  return (
    <TouchableOpacity
      onPress={() =>
        isSelected
          ? props.setSelectedSubCategory(null)
          : props.setSelectedSubCategory(props.subCategoryItem)
      }
      style={[
        styles.container,
        isSelected
          ? {
              backgroundColor: props.subCategoryItem.color,
              borderColor: props.subCategoryItem.color,
            }
          : { borderColor: props.subCategoryItem.color },
        ,
      ]}
    >
      <Text style={isSelected ? { color: "white" } : { color: "black" }}>
        {props.subCategoryItem.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
})

export default React.memo(SubCategoryItem, isEqualMemoComparison)
