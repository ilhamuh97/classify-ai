import { createContext, Dispatch, SetStateAction } from 'react';
import { ParamConfig } from '../types';
import { paramConfigValue } from '../assets/initialValues/initialValues';

export interface ParamConfigContextValue {
    paramConfig: ParamConfig;
    setParamConfig: Dispatch<SetStateAction<ParamConfig>>;
}

export const ParamConfigContext = createContext<ParamConfigContextValue>({
    paramConfig: paramConfigValue,
    setParamConfig: () => {}
});
