// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import PhotosMultipleGallery from "./PhotosMultipleGallery"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getStorageDataThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { deleteImagesFromStorageThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralSetReducer"
// >>Selectors<< //
import { getFullImagesURLsList } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  fullImagesURLsList: Array<any>
}

type MapDispatchToPropsType = {
  deleteImagesFromStorageThunkCreator: (imagesIDs: Array<string>) => void
  getStorageDataThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    fullImagesURLsList: getFullImagesURLsList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      getStorageDataThunkCreator,
      deleteImagesFromStorageThunkCreator,
    }
  )
)(PhotosMultipleGallery)
