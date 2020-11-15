// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"

import MediaBlock from "~/Components/Shared/Components/Popups/MediaBlock/MediaBlock"
import DateLine from "~/Components/Shared/Screens/MoneyTransfers/Shared/Sections/DateLine/DateLine"
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

  newMoneyAmount: string
  selectedDate: Date
  selectedCurrency: string | null

  firstBillData: any
  sendingBillData: any

  selectedImages: Array<any>
  setSelectedImages: (selectedImages: Array<any>) => void

  comment: string
  setComment: (comment: string) => void
}

const SecondLine: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.wrapper}>
        <DateLine selectedDate={props.selectedDate} />
        <View style={styles.container}>
          <BlockItem
            content={
              <View style={styles.inputs_wrap}>
                <View style={styles.money_wrap}>
                  <CustomText size={22} color={"#FF3940"}>
                    {t("Categories.Main.Transaction")}
                  </CustomText>
                  <CustomText
                    style={styles.subtitle}
                    color={"#674ABE"}
                    size={22}
                  >
                    {props.newMoneyAmount.length > 0 && props.newMoneyAmount}{" "}
                    {t(
                      `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
                    )}
                  </CustomText>
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
            containerStyle={styles.block}
            removeRipple
            isGray
          />
          <MediaBlock
            navigation={props.navigation}
            isOnline={props.isOnline}
            isAuthentificated={props.isAuthentificated}
            storageData={props.storageData}
            navigationDest={"MoneyBillsTransferScreen"}
            //
            selectedImages={props.selectedImages}
            setSelectedImages={props.setSelectedImages}
            //
            comment={props.comment}
            moneyAmount={props.newMoneyAmount}
            //
            selectedCategory={props.firstBillData}
            selectedBill={props.sendingBillData}
            isIncome
          />
        </View>
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
  wrapper: {
    // flex: 1,
  },

  container: {
    flexDirection: "row",
  },

  date_wrap: {
    width: "100%",
    paddingHorizontal: 15,
    height: "100%",
  },

  date_text: {
    marginBottom: 5,
    color: "gray",
  },

  inputs_wrap: {
    flex: 1,
    marginTop: 5,
  },

  block: {
    flex: 4,
  },

  money_wrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 39.5,
    marginHorizontal: 13,
  },

  subtitle: {
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

  star: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 20,
    height: 20,
  },

  camera_badge: {
    position: "absolute",
    top: 7,
    right: 10,
    borderRadius: 100,
    height: 19,
    width: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  camera_badge_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13.5,
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
