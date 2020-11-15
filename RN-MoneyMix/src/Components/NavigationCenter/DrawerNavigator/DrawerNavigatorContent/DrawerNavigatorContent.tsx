// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import SubHeader from "./SubHeader/SubHeader"
import DrawerItemsList from "./DrawerItemsList/DrawerItemsList"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string
  budgetEnabledStatus: boolean

  avatar: string | null
  isOnline: boolean
  isAuthentificated: boolean

  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }
  PremiumFinishDate: string | null

  setCurrencyThunkCreator: (newCurrency: string) => void
  setNewAvatarThunkCreator: (newAvatarBlob: Blob) => void
  getBudgetStatusThunkCreator: () => void
  downloadSVGThunkCreator: (t: any) => void

  LogoutUserThunkCreator: () => void
  deleteAllDataThunkCreator: (i18: any) => void

  getInitialGeneralDataThunkCreator: () => void
  setAvatarActionCreator: (avatarURI: string) => void
}

const DrawerContent: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [localUserName, setLocalUserName] = useState(null as string | null)
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      const localUserNameVal = await AsyncStorage.getItem("localUserName")
      setLocalUserName(localUserNameVal)
      props.getInitialGeneralDataThunkCreator()
    }

    getData()
  }, [])

  return (
    <>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <Header
          navigation={props.navigation}
          isOnline={props.isOnline}
          storageData={props.storageData}
          avatar={props.avatar}
          localUserName={localUserName}
          isAuthentificated={props.isAuthentificated}
          setNewAvatarThunkCreator={props.setNewAvatarThunkCreator}
          setAvatarActionCreator={props.setAvatarActionCreator}
          setOfflinePopup={setOfflinePopup}
        />
        {!props.isAuthentificated && (
          <SubHeader navigation={props.navigation} />
        )}
        <DrawerItemsList
          navigation={props.navigation}
          localUserName={localUserName}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          PremiumFinishDate={props.PremiumFinishDate}
          selectedCurrency={props.selectedCurrency}
          setLocalUserName={setLocalUserName}
          LogoutUserThunkCreator={props.LogoutUserThunkCreator}
          deleteAllDataThunkCreator={props.deleteAllDataThunkCreator}
          getBudgetStatusThunkCreator={props.getBudgetStatusThunkCreator}
          setCurrencyThunkCreator={props.setCurrencyThunkCreator}
          budgetEnabledStatus={props.budgetEnabledStatus}
          downloadSVGThunkCreator={props.downloadSVGThunkCreator}
          setOfflinePopup={setOfflinePopup}
        />
      </DrawerContentScrollView>

      <AlertPopup
        popupVisible={offlinePopup}
        setPopupVisible={setOfflinePopup}
        title={t("GeneralPhrases.Popups.TitleNetProblem")}
        content={
          <Text style={styles.text}>
            {t("GeneralPhrases.Popups.PPNetworkProblem")}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
})

export default React.memo(DrawerContent, isEqualMemoComparison)
