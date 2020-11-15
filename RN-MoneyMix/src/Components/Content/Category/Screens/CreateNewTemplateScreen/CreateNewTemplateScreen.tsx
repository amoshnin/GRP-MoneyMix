// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { ScrollView, Text, View, StyleSheet, BackHandler } from "react-native"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TopSection from "~/Components/Shared/Screens/MoneyTransfers/Shared/Sections/TopSection/TopSection"
import Body from "./Body/Body"

import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
  isAuthentificated: boolean
  selectedCurrency: string
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  getFullCategoriesListThunkCreator: () => void
  addNewTemplateThunkCreator: (newTemplate: {
    templateTitle: string
    isIncome: boolean
    category: any
    bill: any
    newMoneyAmount: number | string
    comment: string
    selectedImages: Array<any>
    selectedSubCategory: any
    ID: string
  }) => void
}

const TemplatesScreen: React.FC<PropsType> = (props) => {
  const isIncomeVal = props.route.params.isIncome

  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const [inputPopupVisible, setInputPopupVisible] = useState(false as boolean)
  const [comment, setComment] = useState("" as string)
  const [templateTitle, setTemplateTitle] = useState(comment as string)
  const [selectedBill, setSelectedBill] = useState(
    props.normalBillsList && props.normalBillsList[0]
  )
  const [selectedCategory, setSelectedCategory] = useState(
    isIncomeVal
      ? props.totalIncomeCategoriesList && props.totalIncomeCategoriesList[0]
      : props.totalExpensesCategoriesList &&
          props.totalExpensesCategoriesList[0]
  )
  const [isIncome, setIsIncome] = useState(isIncomeVal as boolean)
  const [totalValue, setTotalValue] = useState("" as string)
  const [selectedImages, setSelectedImages] = useState([] as Array<any>)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null as any)
  const { t } = useTranslation()

  useEffect(() => {
    props.getFullCategoriesListThunkCreator()
  }, [])

  useEffect(() => {
    setIsIncome(isIncomeVal)
  }, [props.route.params])

  useEffect(() => {
    setTemplateTitle(comment)
  }, [comment])

  const setData = async () => {
    const data = await props.route.params.transData
    if (data.selectedCategory) {
      setSelectedBill(data.selectedBill)
      setSelectedCategory(data.selectedCategory)
      setSelectedImages(data.selectedImages)
      setComment(data.comment)
      setTotalValue(data.moneyAmount)
      setIsIncome(data.isIncome)
    } else {
      setSelectedBill(props.normalBillsList && props.normalBillsList[0])
      if (isIncomeVal) {
        props.totalIncomeCategoriesList[0] &&
          setSelectedCategory(props.totalIncomeCategoriesList[0])
      } else {
        props.totalExpensesCategoriesList[0] &&
          setSelectedCategory(props.totalExpensesCategoriesList[0])
      }
    }
  }

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
      return true
    }

    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
    })
  }, [props.navigation])

  useEffect(() => {
    setData()
  }, [props.route.params.transData])

  useEffect(() => {
    setData()
  }, [props.totalIncomeCategoriesList || props.totalExpensesCategoriesList])

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      setData()
    })
  }, [props.navigation])

  const sendMoney = () => {
    if (Number(totalValue) > 0) {
      setInputPopupVisible(true)
    } else {
      setAlertPopupVisible(true)
    }
  }

  const createNewTemplate = (templateTitle: string) => {
    setInputPopupVisible(false)

    if (Number(totalValue) > 0) {
      props.addNewTemplateThunkCreator({
        templateTitle: templateTitle as string,
        bill: selectedBill,
        category: selectedCategory,
        comment: comment,
        isIncome: isIncome,
        newMoneyAmount: totalValue,
        selectedImages: selectedImages,
        selectedSubCategory,
        ID: generateRandomID(),
      })
      setSelectedSubCategory(null)
      props.navigation.goBack()
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {selectedCategory && selectedBill ? (
          <>
            <View style={styles.content_wrap}>
              <TopSection
                navigation={props.navigation}
                selectedCurrency={props.selectedCurrency}
                isIncome={isIncome}
                normalBillsList={props.normalBillsList}
                debtsBillsList={props.debtsBillsList}
                savingsBillsList={props.savingsBillsList}
                selectedBill={selectedBill}
                setSelectedBill={setSelectedBill}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setIsIncome={setIsIncome}
                totalIncomeCategoriesList={props.totalIncomeCategoriesList}
                totalExpensesCategoriesList={props.totalExpensesCategoriesList}
              />
            </View>
            <Body
              navigation={props.navigation}
              isOnline={props.isOnline}
              isAuthentificated={props.isAuthentificated}
              selectedCurrency={props.selectedCurrency}
              storageData={props.storageData}
              isIncome={isIncome}
              selectedBill={selectedBill}
              selectedCategory={selectedCategory}
              totalValue={totalValue}
              setTotalValue={setTotalValue}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              comment={comment}
              setComment={setComment}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              sendMoney={sendMoney}
            />
          </>
        ) : (
          <View style={styles.empty_wrap}>
            <EmptyListSVG height={225} width={225} />
            <Text style={styles.empty_text}>
              {t("Categories.Templates.PPEmptyCreateTemplateScreenText")}
            </Text>
            <Button title="Go back" onPress={() => props.navigation.goBack()} />
          </View>
        )}
      </ScrollView>
      <InputPopup
        title={t("Categories.Templates.TemplateTitle")}
        value={templateTitle}
        onChangeFunction={setTemplateTitle}
        popupVisible={inputPopupVisible}
        setPopupVisible={setInputPopupVisible}
        saveFunction={(text: string) => createNewTemplate(text)}
      />

      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t(
          "MoneyCategoriesTransferScreen.Popups.OperationSubmissionError"
        )}
        content={
          <Text style={styles.text}>
            {`${t("MoneyCategoriesTransferScreen.Popups.PPAlertEmptySum")}!`}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content_wrap: {
    flex: 1,
  },

  empty_wrap: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: 100,
    marginHorizontal: 25,
  },

  empty_text: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    color: "black",
    fontSize: 16,
  },
})

export default React.memo(TemplatesScreen, isEqualMemoComparison)
