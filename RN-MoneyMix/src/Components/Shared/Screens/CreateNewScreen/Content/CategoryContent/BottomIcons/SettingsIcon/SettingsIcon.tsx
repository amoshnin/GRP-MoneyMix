// PLUGINS IMPORTS //
import React, { useState } from "react"
import { TouchableOpacity, Text, StyleSheet, BackHandler } from "react-native"
import Dialog, { DialogContent } from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import CategoriesPopup from "./CategoriesPopup/CategoriesPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import {
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { RectButton } from "react-native-gesture-handler"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string
  isIncome: boolean

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
  }

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  combineCategoriesThunkCreator: (
    oldCategory: any,
    newCategory: any,
    isCombining: boolean
  ) => void
  getFullCategoriesListThunkCreator: () => void
}

const SettingsIcon: React.FC<PropsType> = (props) => {
  const [confirmPopupData, setConfirmPopupData] = useState({
    isCombining: false as boolean,
    visible: false as boolean,
    oldCategory: {} as any,
    newCategory: {} as any,
  })
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [selectPopupVisible, setSelectPopupVisible] = useState(false)
  const [isCombining, setIsCombining] = useState(false as boolean)
  const { t } = useTranslation()
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (popupVisible) {
      setPopupVisible(false)
      return true
    }
  })

  return (
    <>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setPopupVisible(true)}
      >
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>

      <Dialog
        dialogStyle={styles.wrapper}
        visible={popupVisible}
        onTouchOutside={() => setPopupVisible(false)}
        onDismiss={() =>
          BackHandler.addEventListener(
            "hardwareBackPress",
            () => BackHandler.exitApp() as any
          )
        }
      >
        <DialogContent style={styles.container}>
          <RectButton
            style={styles.button}
            onPress={() => {
              setIsCombining(true)
              setPopupVisible(false)
              setSelectPopupVisible(true)
            }}
          >
            <Text style={styles.button_text}>
              {t("Categories.Popups.CombineCategories")}
            </Text>
          </RectButton>
          <RectButton
            style={styles.button}
            onPress={() => {
              setIsCombining(false)
              setPopupVisible(false)
              setSelectPopupVisible(true)
            }}
          >
            <Text style={styles.button_text}>
              {t("Categories.Popups.MoveToCategory")}
            </Text>
          </RectButton>
        </DialogContent>
      </Dialog>

      <CategoriesPopup
        navigation={props.navigation}
        isIncome={props.isIncome}
        isCombining={isCombining}
        selectedCurrency={props.selectedCurrency}
        popupVisible={selectPopupVisible}
        setPopupVisible={setSelectPopupVisible}
        oldCategory={props.category}
        totalIncomeCategoriesList={props.totalIncomeCategoriesList}
        totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        getFullCategoriesListThunkCreator={
          props.getFullCategoriesListThunkCreator
        }
        setConfirmPopupData={setConfirmPopupData}
      />

      <AlertPopup
        popupVisible={confirmPopupData.visible}
        setPopupVisible={(popupVisibility: boolean) =>
          setConfirmPopupData({ ...confirmPopupData, visible: popupVisibility })
        }
        title={
          confirmPopupData.isCombining
            ? t("CreateScreen.Popups.CombineCategoryPopup.Title")
            : t("CreateScreen.Popups.MoveCategoryPopup.Title")
        }
        function={() => {
          setConfirmPopupData({ ...confirmPopupData, visible: false })
          props.combineCategoriesThunkCreator(
            confirmPopupData.oldCategory,
            confirmPopupData.newCategory,
            confirmPopupData.isCombining
          )
          props.navigation.goBack()
        }}
        content={
          confirmPopupData.isCombining ? (
            <>
              <Text style={styles.paragraph}>
                <Text>{t("CreateScreen.Popups.CombineCategoryPopup.PP1")}</Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.oldCategory.title,
                    t,
                    true
                  )}{" "}
                </Text>
                <Text>{t("CreateScreen.Popups.CombineCategoryPopup.PP2")}</Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.newCategory.title,
                    t,
                    true
                  )}
                  .
                </Text>
              </Text>

              <Text style={styles.paragraph}>
                <Text>{t("CreateScreen.Popups.CombineCategoryPopup.PP3")}</Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.newCategory.title,
                    t,
                    true
                  )}
                  .
                </Text>
              </Text>

              <Text style={styles.paragraph}>
                <Text>
                  {t("CreateScreen.Popups.CombineCategoryPopup.Category")}
                </Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.oldCategory.title,
                    t,
                    true
                  )}{" "}
                </Text>
                <Text>
                  {t("CreateScreen.Popups.CombineCategoryPopup.PP4")}.
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.paragraph}>
                <Text>
                  {t("CreateScreen.Popups.CombineCategoryPopup.Category")}
                </Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.oldCategory.title,
                    t,
                    true
                  )}{" "}
                </Text>
                <Text>{t("CreateScreen.Popups.MoveCategoryPopup.PP1")}</Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.newCategory.title,
                    t,
                    true
                  )}{" "}
                </Text>
                <Text>{t("CreateScreen.Popups.MoveCategoryPopup.PP2")}.</Text>
              </Text>

              <Text style={styles.paragraph}>
                <Text>{t("CreateScreen.Popups.CombineCategoryPopup.PP3")}</Text>
                <Text style={styles.bold_text}>
                  {" "}
                  {renderCategoryTitle(
                    confirmPopupData.newCategory.title,
                    t,
                    true
                  )}
                  .
                </Text>
              </Text>
            </>
          )
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "gray",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    position: "absolute",
    bottom: 95,
    left: 13,
  },

  container: {
    marginHorizontal: -17,
    marginBottom: -23,
  },

  button: {
    paddingVertical: 15,
    paddingHorizontal: 12,
  },

  button_text: {
    fontSize: 15,
    color: "black",
  },

  bold_text: {
    fontWeight: "bold",
  },

  paragraph: {
    marginTop: 10,
  },
})

export default React.memo(SettingsIcon, isEqualMemoComparison)
