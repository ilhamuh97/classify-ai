import { createContext, Dispatch, SetStateAction } from 'react';
import { ClassConfigItem } from '../types';
import { classConfigValue } from '../assets/initialValues/initialValues';

export interface ClassConfigContextValue {
    classConfig: ClassConfigItem[];
    setClassConfig: Dispatch<SetStateAction<ClassConfigItem[]>>;
}

export const ClassConfigContext = createContext<ClassConfigContextValue>({
    classConfig: classConfigValue,
    setClassConfig: () => {}
});
