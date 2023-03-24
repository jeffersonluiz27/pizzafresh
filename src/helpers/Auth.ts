import { LocalStorageHelper } from "./LocalStorageHelper";
import { LocalStorageKeys } from "types/localStorageKeys";
import { RoutePath } from "types/routes";


export const Auth = {
  isAuth: (): boolean => {
    const token = LocalStorageHelper.get(LocalStorageKeys.TOKEN)
    const user = LocalStorageHelper.get(LocalStorageKeys.USER)

    return token !== null && user !== null
  },

  logout: (): void => {
    LocalStorageHelper.clear()
    window.location.replace(RoutePath.LOGIN)
  }
}