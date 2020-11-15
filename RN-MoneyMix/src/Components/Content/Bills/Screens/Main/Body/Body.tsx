// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SectionItem from "./Components/SectionItem/SectionItem"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import LongButton from "~/Components/Shared/Components/Buttons/LongButton/LongButton"

import EditBillPopup from "./PopUpsSection/EditBillPopup/EditBillPopup"
import TransferPopup from "./PopUpsSection/TransferPopup/TransferPopup"

import {
  renderBillName,
  renderBillIcon,
  renderBillMoney,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  debtsBillsList: Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
    icon: string
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  defaultBill: any

  getFullCategoriesListThunkCreator: () => void
  getDefaultBillThunkCreator: () => void
  setDefaultBillThunkCreator: (defaultBill: any) => void
}

const Body: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const [editPopupOpened, setEditPopupOpened] = useState(false as boolean)
  const [popupData, setPopupData] = useState(null as any)
  const [billType, setBillType] = useState(null as string | null)
  //

  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [transferInitialNav, setTransferInitalNav] = useState("" as string)

  return (
    <>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <SectionItem title={t("BillsScreen.Lists.Bills")}>
            <View style={styles.btns_wrap}>
              {props.normalBillsList &&
                props.normalBillsList.length > 0 &&
                props.normalBillsList
                  ?.sort((a, b) => {
                    var textA = a.name.toUpperCase()
                    var textB = b.name.toUpperCase()
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                  })
                  .map(
                    (normalBill: {
                      accountBalance: string
                      creditLimit: string
                      description: string
                      name: string
                      takeIntoTotalBalance: boolean
                      type: string
                      icon: string
                    }) => {
                      return (
                        normalBill && (
                          <Button
                            key={normalBill.name}
                            title={renderBillName(normalBill.name, t)}
                            icon={renderBillIcon(
                              normalBill.type,
                              normalBill.icon
                            )}
                            content={renderPrice(
                              renderBillMoney(
                                normalBill.type,
                                normalBill.accountBalance
                              ),
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            containerStyle={styles.button}
                            onPress={() => {
                              setEditPopupOpened(true)
                              setPopupData(normalBill)
                              setBillType("NormalBill")
                            }}
                          />
                        )
                      )
                    }
                  )}
            </View>
          </SectionItem>
          <View style={styles.divider} />

          {props.debtsBillsList && props.debtsBillsList.length > 0 && (
            <>
              <SectionItem title={t("BillsScreen.Lists.Debts")}>
                {props.debtsBillsList
                  ?.sort((a, b) => {
                    var textA = a.name.toUpperCase()
                    var textB = b.name.toUpperCase()
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                  })
                  .map(
                    (debt: {
                      description: string
                      iOwe: string
                      name: string
                      takeIntoTotalBalance: boolean
                      totalDebtSum: string
                      type: string
                      icon: string
                    }) => {
                      return (
                        debt && (
                          <LongButton
                            key={debt.name}
                            title={debt.name}
                            icon={renderBillIcon(debt.type, debt.icon)}
                            content={renderPrice(
                              renderBillMoney(
                                debt.type,
                                "0",
                                debt.iOwe,
                                debt.totalDebtSum
                              ),
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            subtitle1={t("BillsScreen.Lists.TotalDebt")}
                            subtitle2={t("BillsScreen.Lists.Returned")}
                            subValue1={renderPrice(
                              debt.totalDebtSum,
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            subValue2={renderPrice(
                              debt.iOwe,
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            debt
                            onPress={() => {
                              setEditPopupOpened(true)
                              setPopupData(debt)
                              setBillType("DebtBill")
                            }}
                          />
                        )
                      )
                    }
                  )}
              </SectionItem>

              <View style={styles.divider} />
            </>
          )}

          {props.savingsBillsList && props.savingsBillsList.length > 0 && (
            <>
              <SectionItem title={t("BillsScreen.Lists.Savings")}>
                {props.savingsBillsList
                  ?.sort((a, b) => {
                    var textA = a.name.toUpperCase()
                    var textB = b.name.toUpperCase()
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                  })
                  .map(
                    (saving: {
                      accountBalance: string
                      budget: string
                      description: string
                      goal: string
                      name: string
                      takeIntoTotalBalance: boolean
                      type: string
                      icon: string
                    }) => {
                      return (
                        saving && (
                          <LongButton
                            key={saving.name}
                            title={saving.name}
                            icon={renderBillIcon(saving.type, saving.icon)}
                            content={renderPrice(
                              renderBillMoney(
                                saving.type,
                                saving.accountBalance
                              ),
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            subtitle1={t("CreateScreen.Body.AccountBalance")}
                            subtitle2={t("CreateScreen.Body.Goal")}
                            subValue1={renderPrice(
                              renderBillMoney(
                                saving.type,
                                saving.accountBalance
                              ),
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            subValue2={renderPrice(
                              saving.goal,
                              props.selectedCurrency,
                              t,
                              false,
                              7
                            )}
                            onPress={() => {
                              setEditPopupOpened(true)
                              setPopupData(saving)
                              setBillType("SavingsBill")
                            }}
                          />
                        )
                      )
                    }
                  )}
              </SectionItem>
              <View style={styles.divider} />
            </>
          )}
        </ScrollView>
      </View>
      <EditBillPopup
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        billData={popupData}
        billType={billType}
        defaultBill={props.defaultBill}
        popupVisible={editPopupOpened}
        setPopupVisible={setEditPopupOpened}
        setTransferInitalNav={setTransferInitalNav}
        //
        transferScreensPopupVisible={popupVisible}
        setTransferScreensPopupVisible={setPopupVisible}
        getDefaultBillThunkCreator={props.getDefaultBillThunkCreator}
        setDefaultBillThunkCreator={props.setDefaultBillThunkCreator}
      />

      <TransferPopup
        navigation={props.navigation}
        billData={popupData}
        transferInitialNav={transferInitialNav}
        selectedCurrency={props.selectedCurrency}
        //
        billType={billType}
        //
        totalIncomeCategoriesList={props.totalIncomeCategoriesList}
        totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        //
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        getFullCategoriesListThunkCreator={
          props.getFullCategoriesListThunkCreator
        }
        //
        normalBillsList={props.normalBillsList}
        debtsBillsList={props.debtsBillsList}
        savingsBillsList={props.savingsBillsList}
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderTopRightRadius: 40,
    elevation: 20,
    overflow: "hidden",
    marginTop: 5,
    marginRight: 20,
    flex: 170,
    height: "100%",
  },

  container: {
    height: "100%",
    flex: 1,
  },

  btns_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignSelf: "center",
    marginBottom: 10,
    flexWrap: "wrap",
    width: "100%",
  },

  button: {
    marginTop: 15,
    elevation: 4,
  },

  divider: {
    borderTopColor: "black",
    borderTopWidth: 1,
    opacity: 0.1,
    marginVertical: 17,
  },
})

export default React.memo(Body, isEqualMemoComparison)
