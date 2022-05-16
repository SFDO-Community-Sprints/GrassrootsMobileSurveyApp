import { useReducer } from 'react';

import { createContainer } from 'react-tracked';
import { SQLiteSurvey } from '../types/sqlite';

type SurveyEditorAction = {
  type: SurveyEditorActionType;
  field?: {
    name: string;
    value: string | boolean | number;
  };
  detail?: SQLiteSurvey;
};

const SurveyEditorActionType = {
  UPDATE: 'UPDATE',
  LOAD: 'LOAD',
  CLEAR: 'CLEAR',
} as const;
type SurveyEditorActionType = typeof SurveyEditorActionType[keyof typeof SurveyEditorActionType];

const surveyReducer = (state: SurveyEditorState, action: SurveyEditorAction) => {
  switch (action.type) {
    case 'UPDATE':
      return { survey: { ...state.survey, [action.field.name]: action.field.value } };
    case 'LOAD':
      return { survey: { ...action.detail } };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Invalid action type for SurveyReducer');
  }
};

const initialState: { survey: SQLiteSurvey } = {
  survey: {},
};

type SurveyEditorState = typeof initialState;

const useValue = () => useReducer(surveyReducer, initialState);

export const { Provider: SurveyEditorContextProvider, useSelector, useUpdate: useDispatch } = createContainer(useValue);
