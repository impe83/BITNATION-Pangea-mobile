// @flow

export type ChangeUseNumericPasscode = { +type: 'CHANGE_USE_NUMERIC_PASSCODE', useNumericPasscode: boolean };
export type ChangePasscodeLength = { +type: 'CHANGE_PASSCODE_LENGTH', passcodeLength: number };

export type Action =
  | ChangeUseNumericPasscode
  | ChangePasscodeLength

export const CHANGE_USE_NUMERIC_PASSCODE = 'CHANGE_USE_NUMERIC_PASSCODE';
export const CHANGE_PASSCODE_LENGTH = 'CHANGE_PASSCODE_LENGTH';

/**
 * @desc Action creator for an action that is called when desired using of numeric passcode should be changed.
 * @param {boolean} useNumericPasscode Boolean value, whether to use numeric passcode or not.
 * @returns {ChangeUseNumericPasscode} An action.
 */
export function changeUseNumericPasscode(useNumericPasscode: boolean): ChangeUseNumericPasscode {
  return {
    type: CHANGE_USE_NUMERIC_PASSCODE,
    useNumericPasscode,
  };
}

/**
 * @desc Action creator for an action that is called when desired passcode should be changed.
 * @param {boolean} passcodeLength New desired length value.
 * @returns {ChangeUseNumericPasscode} An action.
 */
export function changePasscodeLength(passcodeLength: number): ChangePasscodeLength {
  return {
    type: CHANGE_PASSCODE_LENGTH,
    passcodeLength,
  };
}