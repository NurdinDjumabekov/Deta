import {
  getContainers,
  getContainersInMenu,
} from "../store/reducers/requestSlice";

export const getDataVM = ({ dispatch, activeHost, activeUserService }) => {
  if (!!activeHost) dispatch(getContainers(activeHost));
  else {
    if (activeUserService?.type == 2) {
      const send = { guid_host: "", guid_service: activeUserService?.guid };
      dispatch(getContainersInMenu(send));
    } else if (activeUserService?.type == 3) {
      const send = { guid_host: "", guid_user: activeUserService?.guid };
      dispatch(getContainersInMenu(send));
    }
  }
};
