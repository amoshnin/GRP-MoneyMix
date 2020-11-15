// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation?: any

  category: {
    title: string
    color: string
    icon: string
    price: string
    subCategories: Array<any>
    budget: string
    archived: boolean
  }
  billData?: any

  isEditMode?: boolean
  isIncome?: boolean
  setPopupVisible?: any
  setDetailsPopupVisible: (detailsPopupVisibility: boolean) => void
  onPress?: any
  disableDetailsPopup?: boolean
}

const Body: React.FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      hitSlop={{ bottom: 30, left: 30, right: 30, top: 30 }}
      onPress={
        props.onPress
          ? props.onPress
          : () => {
              if (props.isEditMode) {
                props.navigation.navigate("CreateNewScreen", {
                  category: props.category,
                  isIncome: props.isIncome,
                  isCategoryCreate: false,
                })
                props.setPopupVisible && props.setPopupVisible(false)
              } else {
                props.navigation.navigate("MoneyCategoriesTransferScreen", {
                  isIncome: props.isIncome,
                  categoryData: props.category,
                  billData: props.billData,
                })
                props.setPopupVisible && props.setPopupVisible(false)
              }
            }
      }
      onLongPress={() =>
        !props.disableDetailsPopup &&
        !props.isEditMode &&
        props.setDetailsPopupVisible(true)
      }
    >
      <FontAwesome name={props.category.icon} size={24} color={"white"} />
    </TouchableOpacity>
  )
}

export default React.memo(Body, isEqualMemoComparison)
