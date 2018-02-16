import { call, put, select, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import watchNationsUpdate, { checkConnection, fetchNations, joinNation, leaveNation, getNations } from '../../../src/sagas/nations'
import {
  START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../../../src/actions/nations'
import { getPangeaLibrary } from '../../../src/services/container'
import { convertFromDatabase, resolveNation } from '../../../src/utils/nations';

jest.mock('BITNATION-Pangea-libs')
jest.mock('react-native-config')

const pangeaLibrary = {
  eth: {
    nation: {
      create: jest.fn(),
      all: jest.fn(),
      index: jest.fn(),
      joinNation: jest.fn(),
      leaveNation: jest.fn()
    }
  }
}

test('sagas - nation watcher', (done) => {
  const iterator = watchNationsUpdate()
  expect(iterator.next().value).toEqual(takeEvery(START_NATIONS_FETCH, fetchNations))
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_JOIN_NATION, joinNation))
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_LEAVE_NATION, leaveNation))
  done()
})

test('sagas - fetchNations', (done) => {
  const mockAction = {
    type: START_NATIONS_FETCH
  }
  const mockNations = [
    {
      name: 'Mock Nation',
      id: '12345',
      governanceService: 'Mock Service'
    }
  ]
  const iterator = cloneableGenerator(fetchNations)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(call(pangeaLibrary.eth.nation.all))
  expect(iterator.next(mockNations).value).toEqual(put({ type:DONE_FETCH_NATIONS, payload: mockNations.map(convertFromDatabase) }))
  expect(iterator.next().value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.index))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.all))

  // mock success case
  const successIterator = iterator.clone()

  expect(successIterator.next(mockNations).value).toEqual(put({ type: DONE_FETCH_NATIONS, payload: mockNations.map(convertFromDatabase) }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})

test('sagas - joinNation', (done) => {
  const mockAction = {
    type: REQUEST_JOIN_NATION
  }
  const iterator = cloneableGenerator(joinNation)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations))

  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(iterator.next(mockNations).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.joinNation, resolveNation(mockNations.nations, mockNations.openedNationId)))

  // mock success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }))
  expect(successIterator.next().value).toEqual(put({ type: START_NATIONS_FETCH }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})

test('sagas - leaveNation', (done) => {
  const mockAction = {
    type: REQUEST_LEAVE_NATION
  }
  const iterator = cloneableGenerator(leaveNation)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations))

  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(iterator.next(mockNations).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.leaveNation, resolveNation(mockNations.nations, mockNations.openedNationId)))

  // mock success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }))
  expect(successIterator.next().value).toEqual(put({ type: START_NATIONS_FETCH }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})
