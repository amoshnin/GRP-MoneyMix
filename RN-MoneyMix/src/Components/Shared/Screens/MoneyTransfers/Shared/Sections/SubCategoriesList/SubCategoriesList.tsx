// PLUGINS IMPORTS //
import React from "react"
import { ScrollView, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import SubCategoryItem from "./SubCategoryItem/SubCategoryItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  subCategoriesList: Array<any>

  selectedSubCategory: any
  setSelectedSubCategory: (newSelectedSubCategory: any) => void
}

const SubCategoriesList: React.FC<PropsType> = (props) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {props.subCategoriesList &&
        props.subCategoriesList.map((subCategory: any) => {
          return (
            <SubCategoryItem
              subCategoryItem={subCategory}
              selectedSubCategory={props.selectedSubCategory}
              setSelectedSubCategory={props.setSelectedSubCategory}
            />
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    alignSelf: "flex-end",
  },
})

export default React.memo(SubCategoriesList, isEqualMemoComparison)
