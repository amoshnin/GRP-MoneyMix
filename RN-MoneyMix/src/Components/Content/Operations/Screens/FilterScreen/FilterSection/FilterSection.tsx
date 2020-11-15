// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import FilterItem from "./FilterItem/FilterItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  itemsArray: Array<any>

  isBill?: boolean
  selectedFilters: Array<any>
  setSelectedFilters: (selectedFilters: Array<any>) => void
}

const FilterSection: React.FC<PropsType> = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.list_wrap}>
        {props.itemsArray?.map(
          (item: {
            title?: string
            name?: string
            function: () => void
            color: string
          }) => {
            return (
              <FilterItem
                title={item.title || (item.name as string)}
                color={item.color}
                function={item.function}
                selectedFilters={props.selectedFilters}
                setSelectedFilters={props.setSelectedFilters}
                isBill={props.isBill}
              />
            )
          }
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "black",
  },

  list_wrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 16,
    flexWrap: "wrap",
  },
})

export default React.memo(FilterSection, isEqualMemoComparison)
