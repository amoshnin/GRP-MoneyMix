// PLUGINS IMPORTS //
import React from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  searchQuery: string
  setSearchQuery: (newSearchQuery: string) => void
}

const SearchSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <TextInput
      accessibilityStates
      label={t("Operations.Search")}
      mode="outlined"
      value={props.searchQuery}
      onChangeText={(text: string) => props.setSearchQuery(text)}
      style={styles.input}
      theme={{ colors: { primary: "#674ABE" } }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    width: "90%",
    height: 40,
    marginBottom: -2,
  },
})

export default React.memo(SearchSection, isEqualMemoComparison)
