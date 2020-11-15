// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import OperationInfoPopup from "./OperationInfoPopup/OperationInfoPopup"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  renderPrice,
  renderCategoryTitle,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  isOnline: boolean
  operation: any
  selectedCurrency: string | null

  selectedOperations: Array<any>
  setSelectedOperations: (newSelectedOperations: any) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => void
  DuplicateOperationThunkCreator: (operation: any) => void
  DeleteOperationsThunkCreator: (operations: Array<any>) => void
}

const OperationItem: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  const itemText = () => {
    if (props.operation.operation === "Transaction") {
      return { color: "#F4B400" }
    } else if (props.operation.operation === "Balance") {
      return { color: "#86BAF8" }
    } else {
      if (props.operation.isIncome) {
        return {
          color: "#01CA5C",
        }
      } else {
        return {
          color: "#FF3940",
        }
      }
    }
  }

  const isSelected =
    props.selectedOperations.filter((obj: any) => obj.id === props.operation.id)
      .length > 0
  const isOtherSelected = props.route.params.selectedOperationsCount > 0

  //

  useEffect(() => {
    props.navigation.setParams({
      selectedOperationsCount: props.selectedOperations.length,
    })
  }, [props.selectedOperations])

  useEffect(() => {
    props.route.params.selectedOperationsCount === null &&
      props.setSelectedOperations([])
  }, [props.route.params.selectedOperationsCount])

  //

  const selectOperation = () => {
    props.setSelectedOperations([...props.selectedOperations, props.operation])
  }

  const removeSelectedOperation = () => {
    const filteredArray = props.selectedOperations.filter(
      (obj: any) => obj.id !== props.operation.id
    )
    props.setSelectedOperations(filteredArray)
  }

  const isPhotos =
    props.operation.PhotosURLsList && props.operation.PhotosURLsList.length > 0

  return (
    <>
      <TouchableOpacity
        style={[styles.container, isSelected && { backgroundColor: "#7F7ADE" }]}
        onPress={() =>
          isSelected
            ? removeSelectedOperation()
            : isOtherSelected
            ? selectOperation()
            : setPopupVisible(!popupVisible)
        }
        onLongPress={selectOperation}
      >
        {isPhotos && (
          <View style={styles.photos_icon}>
            <Entypo name="camera" size={18} color="#674ABE" />
          </View>
        )}
        <View style={[styles.line_wrap]}>
          <Text style={[styles.text, itemText()]}>
            {sliceString(renderBillName(props.operation.bill.name, t), 10)}
          </Text>
          <View style={styles.category_wrap}>
            <Text style={[itemText(), styles.text]}>
              {props.operation.operation === "Transaction"
                ? sliceString(
                    renderBillName(props.operation.category.title, t),
                    10
                  )
                : sliceString(
                    renderCategoryTitle(
                      props.operation.category.title,
                      t,
                      true
                    ),
                    9
                  )}
            </Text>
            {props.operation.subCategory && (
              <Text style={[itemText(), styles.subcategry_text]}>
                {` (${props.operation.subCategory.title})`}
              </Text>
            )}
          </View>
          <Text style={[itemText(), styles.text]}>
            {props.operation.isIncome ? "+" : "-"}{" "}
            {renderPrice(
              Math.abs(props.operation.moneyAmount),
              props.selectedCurrency,
              t
            )}
          </Text>
        </View>

        {props.operation.comment || props.operation.user || isPhotos ? (
          <>
            <View style={styles.divider} />
            <View style={[styles.line_wrap]}>
              <Text style={styles.comment}>{props.operation.comment}</Text>
              <Text style={styles.user}>{props.operation.user}</Text>
            </View>
          </>
        ) : null}
      </TouchableOpacity>
      <OperationInfoPopup
        navigation={props.navigation}
        isOnline={props.isOnline}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        selectedCurrency={props.selectedCurrency}
        operation={props.operation}
        itemText={itemText}
        ChangeOperationDateThunkCreator={props.ChangeOperationDateThunkCreator}
        addOperationCommentThunkCreator={props.addOperationCommentThunkCreator}
        DuplicateOperationThunkCreator={props.DuplicateOperationThunkCreator}
        DeleteOperationsThunkCreator={props.DeleteOperationsThunkCreator}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 18,
  },

  line_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 6,
  },

  photos_icon: {
    position: "absolute",
    top: -10,
    left: -10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 100,
  },

  comment: {
    opacity: 0.5,
    fontStyle: "italic",
    width: "50%",
    textAlign: "left",
  },

  user: {
    fontWeight: "bold",
    width: "50%",
    textAlign: "right",
    color: "black",
  },

  divider: {
    borderTopColor: "gray",
    borderTopWidth: 0.8,
    opacity: 0.2,
    elevation: 25,
  },

  text: {
    fontSize: 16,
  },

  subcategry_text: {
    fontSize: 14,
  },

  category_wrap: {
    flexDirection: "column",
    alignItems: "center",
  },
})

export default React.memo(OperationItem, isEqualMemoComparison)
