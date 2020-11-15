// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import MediaBlock from "~/Components/Shared/Components/Popups/MediaBlock/MediaBlock"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  isAuthentificated: boolean
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  moneyAmount: number
  newMoneyAmount: string
  totalValue: string

  comment: string
  setComment: (comment: string) => void
  sign: string

  isIncome: boolean
  selectedCategory: any
  selectedBill: any

  selectedCurrency: string | null

  selectedImages: Array<any>
  setSelectedImages: (selectedImages: any) => void
}

const SecondLine: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.container}>
        <BlockItem
          content={
            <View style={styles.inputs_wrap}>
              <View style={styles.money_wrap}>
                <Text
                  style={styles.title}
                  color={props.isIncome ? "#01CA5C" : "#FF3940"}
                >
                  {props.isIncome
                    ? t("Categories.Main.Income")
                    : t("Categories.Main.Expenses")}
                </Text>
                <Text
                  style={styles.subtitle}
                  color={props.isIncome ? "#01CA5C" : "#FF3940"}
                >
                  {props.totalValue}{" "}
                  {props.newMoneyAmount.length > 0 && props.newMoneyAmount}{" "}
                  {t(
                    `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
                  )}
                </Text>
              </View>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPopupVisible(true)}
              >
                <Text style={styles.input_text}>
                  {props.comment ||
                    t("MoneyCategoriesTransferScreen.TopSection.YourComment")}
                </Text>
              </TouchableOpacity>
            </View>
          }
          containerStyle={{
            flex: 4,
          }}
          removeRipple
          isGray
        />
        <MediaBlock
          navigation={props.navigation}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          storageData={props.storageData}
          selectedImages={props.selectedImages}
          setSelectedImages={props.setSelectedImages}
          comment={props.comment}
          isIncome={props.isIncome}
          moneyAmount={props.totalValue}
          navigationDest={"CreateNewTemplateScreen"}
          selectedBill={props.selectedBill}
          selectedCategory={props.selectedCategory}
        />
      </View>

      <InputPopup
        title={t("MoneyCategoriesTransferScreen.TopSection.YourComment")}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        value={props.comment}
        onChangeFunction={props.setComment}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  inputs_wrap: {
    flex: 1,
    marginTop: 5,
  },

  money_wrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 39.5,
    marginHorizontal: 13,
  },

  title: {
    fontSize: 22,
  },

  subtitle: {
    fontSize: 22,
    marginLeft: 20,
  },

  input: {
    marginHorizontal: 13,
    height: 34,
    justifyContent: "center",
  },

  input_text: {
    color: "gray",
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: "gray",
    opacity: 0.3,
    elevation: 500,
    marginTop: 5,
  },
})

export default React.memo(SecondLine, isEqualMemoComparison)
