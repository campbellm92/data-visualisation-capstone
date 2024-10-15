import useInput from "../useInput";
import {
  checkValidEmailFormat,
  checkValidPasswordFormat,
} from "../../utils/validators";

export function useEmailValidator() {
  return useInput(checkValidEmailFormat);
}

export function usePasswordValidator() {
  return useInput(checkValidPasswordFormat);
}
