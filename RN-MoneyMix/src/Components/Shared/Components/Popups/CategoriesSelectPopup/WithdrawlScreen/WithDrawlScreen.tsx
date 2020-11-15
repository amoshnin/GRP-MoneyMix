// PLUGINS IMPORTS //
import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "~/Components/Shared/Components/CategoryItem/CategoryItem"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const WithdrawlScreen: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {props.route.params.totalExpensesCategoriesList &&
          props.route.params.totalExpensesCategoriesList.map(
            (category: any) => {
              return (
                <CategoryItem
                  category={category}
                  isEditMode={false}
                  isIncome={false}
                  selectedCurrency={props.route.params.selectedCurrency}
                  onPress={() => {
                    props.route.params.setSelectedCategory(category)
                    props.route.params.setIsIncome(false)
                    props.route.params.setPopupVisible(false)
                  }}
                  disableDetailsPopup
                />
              )
            }
          )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#E9E9E9",
    flex: 1,
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 25,
    marginTop: 10,
  },
})

export default WithdrawlScreen
