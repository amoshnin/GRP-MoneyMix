// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "~/Components/Shared/Components/CategoryItem/CategoryItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const ReplenishScreen: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      {props.route.params.totalIncomeCategoriesList &&
        props.route.params.totalIncomeCategoriesList.map((category: any) => {
          return (
            <CategoryItem
              category={category}
              isEditMode={false}
              isIncome={true}
              billData={null}
              selectedCurrency={props.route.params.selectedCurrency}
              navigation={props.route.params.navigation}
              setPopupVisible={props.route.params.setPopupVisible}
              onPress={() => {
                props.route.params.setIsIncome(true)
                props.route.params.setSelectedCategory(category)
                props.route.params.setPopupVisible(false)
              }}
              disableDetailsPopup
            />
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 25,
    marginTop: 10,
  },
})

export default React.memo(ReplenishScreen, isEqualMemoComparison)
