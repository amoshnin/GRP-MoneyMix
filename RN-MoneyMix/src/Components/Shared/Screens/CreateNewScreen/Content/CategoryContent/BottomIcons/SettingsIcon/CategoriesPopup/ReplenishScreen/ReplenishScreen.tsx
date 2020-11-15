// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "~/Components/Shared/Components/CategoryItem/CategoryItem"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const ReplenishScreen: React.FC<PropsType> = (props) => {
  const setConfirmPopupData: (newConfirmPopupData: {
    isCombining: boolean
    visible: boolean
    oldCategory: any
    newCategory: any
  }) => void = props.route.params.setConfirmPopupData

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
                props.route.params.setPopupVisible(false)
                setConfirmPopupData({
                  isCombining: props.route.params.isCombining,
                  newCategory: category,
                  oldCategory: props.route.params.oldCategory,
                  visible: true,
                })
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

export default ReplenishScreen
