// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import AccountInfo from "./AccountInfo/AccountInfo"
import MiddleSettings from "./MiddleSettings/MiddleSettings"
import BottomSettings from "./BottomSettings/BottomSettings"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isOnline: boolean
  isAuthentificated: boolean
  localUserName: string | null
  PremiumFinishDate: string | null
  selectedCurrency: string
  budgetEnabledStatus: boolean

  downloadSVGThunkCreator: (t: any) => void
  setLocalUserName: (newLocalUserName: string) => void
  setCurrencyThunkCreator: (newCurrency: string) => void
  getBudgetStatusThunkCreator: () => void

  LogoutUserThunkCreator: () => void
  deleteAllDataThunkCreator: (i18: any) => void
  setOfflinePopup: (offlinePopupVisibility: boolean) => void
}

const DrawerItemsList: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      {props.isAuthentificated && (
        <AccountInfo
          navigation={props.navigation}
          isOnline={props.isOnline}
          localUserName={props.localUserName}
          PremiumFinishDate={props.PremiumFinishDate}
          LogoutUserThunkCreator={props.LogoutUserThunkCreator}
          setLocalUserName={props.setLocalUserName}
          setOfflinePopup={props.setOfflinePopup}
        />
      )}
      <MiddleSettings
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        isAuthentificated={props.isAuthentificated}
        setCurrencyThunkCreator={props.setCurrencyThunkCreator}
        getBudgetStatusThunkCreator={props.getBudgetStatusThunkCreator}
        budgetEnabledStatus={props.budgetEnabledStatus}
      />
      <BottomSettings
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        downloadSVGThunkCreator={props.downloadSVGThunkCreator}
        deleteAllDataThunkCreator={props.deleteAllDataThunkCreator}
        setOfflinePopup={props.setOfflinePopup}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
})

export default React.memo(DrawerItemsList, isEqualMemoComparison)
