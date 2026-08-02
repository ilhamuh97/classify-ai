import { useContext } from 'react';
import ModelConfig from './ModelConfig/ModelConfig';
import DataAugConfig from './DataAugConfig/DataAugConfig';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { ParamConfigContext } from '@/contexts/ParamConfigContext.ts';
import { DataAugmentationConfigContext } from '@/contexts/DataAugmentationConfigContext.ts';
import { DataAugmentationConfig, DatasetItem, ParamConfig } from '@/types.ts';

interface SettingFieldProps {
    dataset: DatasetItem[];
}

const SettingField = ({ dataset }: SettingFieldProps) => {
    const { paramConfig, setParamConfig } = useContext(ParamConfigContext);
    const { dataAugmentationConfig, setDataAugmentationConfig } = useContext(
        DataAugmentationConfigContext
    );
    const modelFormHandler = (_changedValues: Partial<ParamConfig>, allValues: ParamConfig) => {
        setParamConfig(allValues);
    };

    const dataAugmentationFormHandler = (
        _changedValues: Partial<DataAugmentationConfig>,
        allValues: DataAugmentationConfig
    ) => {
        setDataAugmentationConfig(allValues);
    };

    return (
        <Accordion type="single" collapsible defaultValue="training" className="grid gap-3">
            <AccordionItem value="training" className="rounded-sm border border-border px-4">
                <AccordionTrigger className="hover:no-underline">
                    Training configuration
                </AccordionTrigger>
                <AccordionContent>
                    <ModelConfig paramConfig={paramConfig} modelFormHandler={modelFormHandler} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="augmentation" className="rounded-sm border border-border px-4">
                <AccordionTrigger className="hover:no-underline">
                    Data Augmentation configuration
                </AccordionTrigger>
                <AccordionContent>
                    <DataAugConfig
                        dataAugmentationConfig={dataAugmentationConfig}
                        dataset={dataset}
                        dataAugmentationFormHandler={dataAugmentationFormHandler}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default SettingField;
