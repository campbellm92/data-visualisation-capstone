import useInput from "../useInput";
import {
  checkValidEmailFormat,
  checkValidPasswordFormat,
} from "../../utils/validators";

export function useRegisterEmailValidator() {
  return useInput(checkValidEmailFormat);
}

export function usePasswordValidator() {
  return useInput(checkValidPasswordFormat);
}
