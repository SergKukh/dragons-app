import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { bindActionCreators } from '@reduxjs/toolkit';
import actionCreators from "../store/reducers/actionCreators";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAction = () => bindActionCreators(actionCreators, useAppDispatch());