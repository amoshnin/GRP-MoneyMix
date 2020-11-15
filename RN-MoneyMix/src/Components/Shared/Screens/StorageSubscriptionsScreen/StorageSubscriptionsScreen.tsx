// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import Body from "./Body/Body"
import BottomSubscriptions from "./BottomSubscriptions/BottomSubscriptions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  setStorageLimitThunkCreator: (newStorageLimit: string) => void
}

const StorageSubscriptionsScreen: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <Body storageData={props.storageData} />
      <BottomSubscriptions
        navigation={props.navigation}
        setStorageLimitThunkCreator={props.setStorageLimitThunkCreator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.memo(StorageSubscriptionsScreen, isEqualMemoComparison)
