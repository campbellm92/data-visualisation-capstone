import useInput from "../useInput";
import {
  checkValidEmailFormat,
  checkValidPasswordFormat,
  checkValidNameFormat,
} from "../../utils/validators";

export function useEmailValidator() {
  return useInput(checkValidEmailFormat);
}

export function usePasswordValidator() {
  return useInput(checkValidPasswordFormat);
}

export function useNameValidator() {
  return useInput(checkValidNameFormat);
}
