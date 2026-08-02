import { Dispatch, SetStateAction } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Download, Upload } from 'lucide-react';
import ExportModelCard from './ExportModelCard/ExportModelCard';
import ImportModelCard from './ImportModelCard/ImportModelCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClassConfigItem } from '@/types.ts';

interface TabsForModelProps {
    model: tf.LayersModel | null;
    classConfig: ClassConfigItem[];
    setImportedClassConfig: Dispatch<SetStateAction<ClassConfigItem[] | null>>;
    setImportedModel: Dispatch<SetStateAction<tf.LayersModel | null>>;
}

const TabsForModel = ({
    model,
    classConfig,
    setImportedClassConfig,
    setImportedModel
}: TabsForModelProps) => {
    return (
        <Tabs defaultValue="export">
            <TabsList>
                <TabsTrigger value="export">
                    <Download /> Export model
                </TabsTrigger>
                <TabsTrigger value="import" disabled>
                    <Upload /> Import model
                </TabsTrigger>
            </TabsList>
            <TabsContent value="export">
                <ExportModelCard model={model} classConfig={classConfig} />
            </TabsContent>
            <TabsContent value="import">
                <ImportModelCard
                    setImportedClassConfig={setImportedClassConfig}
                    setImportedModel={setImportedModel}
                />
            </TabsContent>
        </Tabs>
    );
};

export default TabsForModel;
