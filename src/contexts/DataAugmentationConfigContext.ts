import { createContext, Dispatch, SetStateAction } from 'react';
import { DataAugmentationConfig } from '../types';
import { dataAugmentationConfigValue } from '../assets/initialValues/initialValues';

export interface DataAugmentationConfigContextValue {
    dataAugmentationConfig: DataAugmentationConfig;
    setDataAugmentationConfig: Dispatch<SetStateAction<DataAugmentationConfig>>;
}

export const DataAugmentationConfigContext = createContext<DataAugmentationConfigContextValue>({
    dataAugmentationConfig: dataAugmentationConfigValue,
    setDataAugmentationConfig: () => {}
});
