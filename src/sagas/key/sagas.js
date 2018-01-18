import { call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { changeMnemonicValid, mnemonicCreated } from '../../actions/key';
import { updateWalletList } from '../../actions/wallet';
import {
  createPrivateKey, privateKeyToMnemonic, mnemonicToPrivateKey, savePrivateKey,
  verifyMnemonic,
} from './serviceFunctions';


export function* createPrivateKeySaga() {
  const privateKey = yield call(createPrivateKey);
  const mnemonic = yield call(privateKeyToMnemonic, privateKey);
  yield put(mnemonicCreated(mnemonic));
}

export function* savePrivateKeySaga() {
  const state = yield select();
  const mnemonic = state.key.createdMnemonic;
  if (!mnemonic) return;
  const privateKey = yield call(mnemonicToPrivateKey, mnemonic);
  yield call(savePrivateKey, privateKey);

  yield put(updateWalletList());
}

export function* verifyMnemonicSaga(action) {
  const enteredMnemonic = action.mnemonic;
  const mnemonicCorrect = yield verifyMnemonic(enteredMnemonic);
  if (!mnemonicCorrect) {
    yield put(changeMnemonicValid(false));
    return;
  }

  const state = yield select();
  const createdMnemonic = state.key.createdMnemonic;
  const mnemonicAreTheSame = _.isEqual(enteredMnemonic, createdMnemonic);
  yield put(changeMnemonicValid(mnemonicAreTheSame));
}