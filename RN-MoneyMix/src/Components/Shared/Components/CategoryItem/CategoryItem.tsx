// PLUGINS IMPORTS //
import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as Animatable from "react-native-animatable"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Body from "./Body/Body"

import CategoryDetailsPopup from "~/Components/Shared/Components/Popups/CategoryDetailsPopup/CategoryDetailsPopup"
import {
  renderCategoryTitle,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation?: any
  selectedCurrency: string | null

  category: {
    title: string
    color: string
    icon: string
    price: string
    subCategories: Array<any>
    budget: string
    archived: boolean
  }

  disableDetailsPopup?: boolean
  billData?: any

  isEditMode?: boolean
  isIncome?: boolean
  setPopupVisible?: any
  onPress?: any

  totalIncome?: string | number
  totalExpenses?: string | number

  operationsList?: Array<any>
  budgetEnabledStatus?: boolean
}

const CategoryItem: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)
  const [detailsPopupVisible, setDetailsPopupVisible] = useState(
    false as boolean
  )
  const { t } = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      if (Number(props.category.price) > 0) {
        if (props.isIncome) {
          setPercentage(
            Number(props.category.price) / Number(props.totalIncome)
          )
        } else {
          setPercentage(
            Number(props.category.price) / Number(props.totalExpenses)
          )
        }
      } else {
        setPercentage(0)
      }
    }, 250)
  }, [])

  const color =
    props.category.archived && props.isEditMode ? "grey" : props.category.color
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {renderCategoryTitle(props.category.title, t)}
        </Text>
        {props.budgetEnabledStatus && (
          <Text
            style={[
              styles.budget,
              {
                color: Number(props.category.budget) > 0 ? color : "gray",
              },
              Number(props.category.budget) > 0 &&
                Number(props.category.price) >
                  Number(props.category.budget) && {
                  backgroundColor: props.isIncome ? "#01CA5C" : "#FF555B",
                  color: "white",
                  marginTop: 2,
                },
            ]}
          >
            {renderPrice(props.category.budget, props.selectedCurrency, t)}
          </Text>
        )}
        <Animatable.View animation="bounceIn">
          {props.isEditMode ? (
            <Animatable.View
              animation="tada"
              easing="ease-out"
              iterationCount={"infinite"}
              style={[
                styles.container,
                ,
                {
                  backgroundColor: color,
                },
              ]}
            >
              <Body
                navigation={props.navigation}
                category={props.category}
                billData={props.billData}
                isEditMode={props.isEditMode}
                isIncome={props.isIncome}
                onPress={props.onPress}
                setPopupVisible={props.setPopupVisible}
                disableDetailsPopup={props.disableDetailsPopup}
                setDetailsPopupVisible={setDetailsPopupVisible}
              />
            </Animatable.View>
          ) : (
            <View
              style={[
                styles.container,
                ,
                {
                  backgroundColor: color,
                },
              ]}
            >
              <Body
                navigation={props.navigation}
                category={props.category}
                billData={props.billData}
                isEditMode={props.isEditMode}
                isIncome={props.isIncome}
                onPress={props.onPress}
                setPopupVisible={props.setPopupVisible}
                disableDetailsPopup={props.disableDetailsPopup}
                setDetailsPopupVisible={setDetailsPopupVisible}
              />
            </View>
          )}
        </Animatable.View>
        <Text style={[styles.price, { color: color }]}>
          {renderPrice(props.category.price, props.selectedCurrency, t)}
        </Text>
      </View>
      <CategoryDetailsPopup
        navigation={props.navigation}
        isIncome={props.isIncome as boolean}
        popupVisible={detailsPopupVisible}
        setPopupVisible={setDetailsPopupVisible}
        selectedCurrency={props.selectedCurrency}
        category={props.category}
        billData={props.billData}
        percentage={percentage}
        operationsList={props.operationsList as Array<any>}
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginBottom: 16,
  },

  container: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 7,
    borderRadius: 8,
  },

  title: {
    color: "#232323",
    fontSize: 13,
    width: 72,
    textAlign: "center",
  },

  price: {
    fontWeight: "bold",
  },

  budget: {
    borderRadius: 5,
    paddingHorizontal: 3,

    fontSize: 13.5,
  },
})

export default React.memo(CategoryItem, isEqualMemoComparison)
