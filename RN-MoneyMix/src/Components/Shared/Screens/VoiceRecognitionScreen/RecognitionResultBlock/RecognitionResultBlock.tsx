// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"

import CategoriesSelectPopup from "~/Components/Shared/Components/Popups/CategoriesSelectPopup/CategoriesSelectPopup"
import BillSelectPopup from "~/Components/Shared/Components/Popups/BillsSelectPopup/BillsSelectPopup"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import {
  renderCategoryTitle,
  renderBillName,
  renderBillIcon,
  renderBillMoney,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string

  recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }
  recognitionError: boolean

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  setRecognitionDataActionCreator: (recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }) => void
  getFullCategoriesListThunkCreator: () => void
}

const RecognitionResultBlock: React.FC<PropsType> = (props) => {
  const [billsPopupShown, setBillsPopupShown] = useState(false as boolean)
  const [categoriesPopupShown, setCategoriesPopupShown] = useState(false)
  const [inputPopupVisible, setInputPopupVisible] = useState(false as boolean)
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  const [moneyAmount, setMoneyAmount] = useState(
    props.recognitionInfo.moneyAmount as string
  )
  const [selectedBill, setSelectedBill] = useState(props.recognitionInfo.bill)
  const [selectedCategory, setSelectedCategory] = useState(
    props.recognitionInfo.category
  )
  const [isIncome, setIsIncome] = useState(
    props.recognitionInfo.isIncome as boolean
  )

  const setData = () => {
    props.setRecognitionDataActionCreator({
      isIncome: isIncome,
      bill: selectedBill,
      category: selectedCategory,
      moneyAmount: moneyAmount,
    })
  }

  useEffect(() => {
    setMoneyAmount(props.recognitionInfo.moneyAmount as string)
    setSelectedBill(props.recognitionInfo.bill)
    setSelectedCategory(props.recognitionInfo.category)
    setIsIncome(props.recognitionInfo.isIncome)
  }, [props.recognitionInfo])

  useEffect(() => setData(), [moneyAmount])
  useEffect(() => setData(), [selectedBill])
  useEffect(() => setData(), [selectedCategory])
  useEffect(() => setData(), [isIncome])

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      setMoneyAmount("0")
      setSelectedBill({})
      setSelectedCategory({})
      setIsIncome(false)
    })
  }, [props.navigation])

  const buttonsInfoList = [
    {
      title: renderBillName(props.recognitionInfo.bill.name, t),
      onPress: () => setBillsPopupShown(true),
      containerStyle: [
        styles.button,
        {
          backgroundColor:
            props.recognitionInfo.bill.name === undefined ? "gray" : "#674ABE",
        },
      ],
      content: renderPrice(
        renderBillMoney(
          props.recognitionInfo.bill.type,
          props.recognitionInfo.bill.accountBalance,
          props.recognitionInfo.bill.iOwe,
          props.recognitionInfo.bill.totalDebtSum
        ),
        props.selectedCurrency,
        t
      ),
      icon: renderBillIcon(
        props.recognitionInfo.bill.type,
        props.recognitionInfo.bill.icon
      ),
    },
    {
      title: renderCategoryTitle(props.recognitionInfo.category.title, t),
      onPress: () => setCategoriesPopupShown(true),
      icon: (
        <FontAwesome
          name={props.recognitionInfo.category.icon || "s"}
          size={24}
          color={props.recognitionInfo.category.color}
        />
      ),
      content: `${props.recognitionInfo.category.price || 0} ${t(
        `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
      )}`,
      containerStyle: [
        styles.button,
        { backgroundColor: props.recognitionInfo.category.color || "gray" },
      ],
    },
  ]

  return (
    <>
      <View style={styles.container}>
        {Object.values(props.recognitionInfo.bill).length > 0 ||
        Object.values(props.recognitionInfo.category).length > 0 ? (
          <>
            <View style={styles.buttons_wrap}>
              {props.recognitionInfo.isIncome
                ? selectedCategory &&
                  buttonsInfoList.reverse().map((button: any) => {
                    return (
                      <Button
                        title={button.title}
                        onPress={button.onPress}
                        containerStyle={button.containerStyle}
                        content={button.content}
                        icon={button.icon}
                      />
                    )
                  })
                : selectedCategory &&
                  buttonsInfoList.map((button: any) => {
                    return (
                      <Button
                        title={button.title}
                        onPress={button.onPress}
                        containerStyle={button.containerStyle}
                        content={button.content}
                        icon={button.icon}
                      />
                    )
                  })}
            </View>

            <View style={styles.refresh_wrap}>
              <TouchableOpacity>
                <FontAwesome
                  name="refresh"
                  size={32}
                  color={props.recognitionInfo.isIncome ? "#01CA5C" : "#FF555B"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.price_wrap,
                  Number(props.recognitionInfo.moneyAmount) > 0
                    ? { backgroundColor: "#674ABE" }
                    : { backgroundColor: "gray" },
                ]}
                onPress={() => setInputPopupVisible(true)}
              >
                <Text style={styles.price}>
                  {renderPrice(
                    props.recognitionInfo.moneyAmount,
                    props.selectedCurrency,
                    t
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          props.recognitionError && (
            <>
              <Button
                title={"Инструкция"}
                containerStyle={styles.guide_button}
                onPress={() => setAlertPopupVisible(true)}
              />
              <View style={styles.error_wrap}>
                <Text style={styles.error_text}>
                  {t("VoiceRecognitionScreen.PPRecognitionFail")}
                </Text>
              </View>
            </>
          )
        )}
      </View>

      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t("VoiceRecognitionScreen.RecognitionFailure")}
        content={
          <Text>{t("VoiceRecognitionScreen.PopupRecognitionFailBody")}</Text>
        }
        removeCancelBtn
      />

      <CategoriesSelectPopup
        navigation={props.navigation}
        popupVisible={categoriesPopupShown}
        setPopupVisible={setCategoriesPopupShown}
        selectedCurrency={props.selectedCurrency}
        setIsIncome={setIsIncome}
        setSelectedCategory={setSelectedCategory}
        totalIncomeCategoriesList={props.totalIncomeCategoriesList}
        totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        getFullCategoriesListThunkCreator={
          props.getFullCategoriesListThunkCreator
        }
      />

      <BillSelectPopup
        popupShown={billsPopupShown}
        setPopupShown={setBillsPopupShown}
        selectedBill={selectedBill}
        setSelectedBill={setSelectedBill}
        selectedCurrency={props.selectedCurrency}
        normalBillsList={props.normalBillsList}
        debtsBillsList={props.debtsBillsList}
        savingsBillsList={props.savingsBillsList}
      />

      <InputPopup
        title={t("VoiceRecognitionScreen.MoneyAmount")}
        value={moneyAmount}
        onChangeFunction={setMoneyAmount}
        popupVisible={inputPopupVisible}
        setPopupVisible={setInputPopupVisible}
        isNumberPad
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },

  buttons_wrap: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-evenly",
    width: "100%",
  },

  button: {
    width: 148,
  },

  refresh_wrap: {
    alignItems: "center",
  },

  price_wrap: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 1,
    marginTop: 12,
  },

  price: {
    fontSize: 22,
    color: "white",
  },

  guide_button: {
    marginBottom: 10,
    height: 35,
  },

  error_wrap: {
    borderColor: "crimson",
    borderWidth: 1,
    marginHorizontal: "13%",
  },

  error_text: {
    color: "black",
    paddingVertical: 7,
    textAlign: "center",
    fontSize: 14.5,
  },
})

export default React.memo(RecognitionResultBlock, isEqualMemoComparison)
