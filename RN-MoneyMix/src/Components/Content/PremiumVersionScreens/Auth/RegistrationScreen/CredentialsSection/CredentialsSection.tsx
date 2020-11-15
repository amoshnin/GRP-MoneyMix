// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  userInfo: {
    avatarURL: string | null
    name: string | null
    email: string | null
  }
}

const CredentialsSection: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      {props.userInfo.avatarURL && (
        <Image
          style={styles.avatar}
          source={{ uri: props.userInfo.avatarURL }}
        />
      )}
      <Text style={styles.name}>{props.userInfo.name}</Text>
    </View>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },

  name: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
  },
})

export default React.memo(CredentialsSection, isEqualMemoComparison)
