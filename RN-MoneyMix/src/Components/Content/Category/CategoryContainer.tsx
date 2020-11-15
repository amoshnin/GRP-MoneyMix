// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Category from "./Category"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"

// >>Reducers<< //
import { getProfilesListThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import {
  RestoreDataFromCloudThunkCreator,
  createNewProfileThunkCreator,
  deleteProfileThunkCreator,
} from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

// >>Selectors<< //
import { getProfilesList } from "~/Redux/Selectors/CategoriesSelectors"
import {
  getOnlineStatus,
  getAuthentificationStatus,
} from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  ProfilesList: Array<any>

  isOnline: boolean
  isAuthentificated: boolean
}

type MapDispatchToPropsType = {
  getProfilesListThunkCreator: () => void
  createNewProfileThunkCreator: (newProfileName: string) => void
  deleteProfileThunkCreator: (oldProfileName: string) => void
  RestoreDataFromCloudThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    ProfilesList: getProfilesList(state),

    isOnline: getOnlineStatus(state),
    isAuthentificated: getAuthentificationStatus(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      createNewProfileThunkCreator,
      deleteProfileThunkCreator,
      getProfilesListThunkCreator,
      RestoreDataFromCloudThunkCreator,
    }
  )
)(Category)
