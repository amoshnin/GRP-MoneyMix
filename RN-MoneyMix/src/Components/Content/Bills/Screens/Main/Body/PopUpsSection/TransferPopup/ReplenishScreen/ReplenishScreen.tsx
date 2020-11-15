// PLUGINS IMPORTS //
import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "~/Components/Shared/Components/CategoryItem/CategoryItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const ReplenishScreen: React.FC<PropsType> = (props) => {
  const {
    navigation,
    setDisableExitApp,
    billData,
    selectedCurrency,
    setPopupVisible,
  } = props.route.params

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {props.route.params.totalIncomeCategoriesList &&
          props.route.params.totalIncomeCategoriesList.map((category: any) => {
            return (
              <CategoryItem
                category={category}
                isEditMode={false}
                isIncome={true}
                billData={billData}
                selectedCurrency={selectedCurrency}
                navigation={navigation}
                setPopupVisible={setPopupVisible}
                disableDetailsPopup
                onPress={() => {
                  setDisableExitApp(true)
                  navigation.navigate("MoneyCategoriesTransferScreen", {
                    isIncome: false,
                    categoryData: category,
                    billData: billData,
                  })
                  setPopupVisible && setPopupVisible(false)
                }}
              />
            )
          })}
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

export default React.memo(ReplenishScreen, isEqualMemoComparison)
