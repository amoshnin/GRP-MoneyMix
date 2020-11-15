// PLUGINS IMPORTS //
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"

// COMPONENTS IMPORTS //
import DrawerNavigatorContentContainer from "~/Components/NavigationCenter/DrawerNavigator/DrawerNavigatorContent/DrawerNavigatorContentContainer"
import BottomTabNavigatorContainer from "~/Components/NavigationCenter/BottomTabNavigator/BottomTabNavigatorContainer"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  route: any
}

const DrawerNavigatorLayout: React.FC<PropsType> = (props) => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => (
        <DrawerNavigatorContentContainer {...props} />
      )}
      drawerStyle={{ width: 330 }}
    >
      <>
        <Drawer.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigatorContainer}
          initialParams={{
            initialRouteName: props.route.params.initialRouteName,
          }}
          listeners={({ navigation, route }: any) => ({
            focus: () => {
              navigation.setParams({
                initialRouteName: props.route.params.initialRouteName,
              })
            },
          })}
        />
      </>
    </Drawer.Navigator>
  )
}

export default React.memo(DrawerNavigatorLayout, isEqualMemoComparison)
