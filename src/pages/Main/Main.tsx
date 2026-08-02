import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Link } from 'react-router-dom';
import CreateClass from '../../components/Sections/CreateClass/CreateClass';
import SetupParameters from '../../components/Sections/SetupParameters/SetupParameters';
import Train from '../../components/Sections/Train/Train';
import Predict from '../../components/Sections/Predict/Predict';
import StageNav from './StageNav/StageNav';
import Logo from '../../assets/logo/classify.svg';
import { usePrompt } from '../../components/common/RouterPrompt/RouterPrompt';
import { ParamConfigContext } from '@/contexts/ParamConfigContext.ts';
import { DataAugmentationConfigContext } from '@/contexts/DataAugmentationConfigContext.ts';
import { ClassConfigContext } from '@/contexts/ClassConfigContext.ts';
import {
    classConfigValue,
    paramConfigValue,
    dataAugmentationConfigValue
} from '@/assets/initialValues/initialValues.ts';
import { DatasetItem, TrainingReport } from '@/types.ts';

const Main = () => {
    const [key, setKey] = useState(0);
    const [dataset, setDataset] = useState<DatasetItem[]>([]);
    const [graphModel, setGraphModel] = useState<tf.GraphModel | null>(null);
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [report, setReport] = useState<TrainingReport | null>(null);
    const [paramConfig, setParamConfig] = useState(paramConfigValue);
    const [dataAugmentationConfig, setDataAugmentationConfig] = useState(
        dataAugmentationConfigValue
    );
    const [classConfig, setClassConfig] = useState(classConfigValue);

    useEffect(() => {
        if (model) {
            model.summary();
        }
    }, [model, graphModel]);

    const ContentElem = (key: number) => {
        switch (key) {
            case 0:
                return <CreateClass dataset={dataset} setDataset={setDataset} />;
            case 1:
                return <SetupParameters dataset={dataset} />;
            case 2:
                return (
                    <Train
                        dataset={dataset}
                        setModel={setModel}
                        graphModel={graphModel}
                        setGraphModel={setGraphModel}
                        setReport={setReport}
                        report={report}
                    />
                );
            case 3:
                return (
                    <Predict model={model} graphModel={graphModel} setGraphModel={setGraphModel} />
                );
            default:
                return <CreateClass dataset={dataset} setDataset={setDataset} />;
        }
    };

    usePrompt('All your work will be lost, are you sure you want to leave this page?');

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex min-h-20 items-center justify-center border-b border-border px-6 py-3 sm:px-10">
                <Link to="/" className="shrink-0">
                    <img src={Logo} alt="ClassifyAI" className="h-9" />
                </Link>
            </header>
            <div className="px-4 py-4 sm:px-8">
                <div className="mx-auto max-w-3xl">
                    <StageNav currKey={key} setKey={setKey} />
                </div>
            </div>
            <ParamConfigContext.Provider value={{ paramConfig, setParamConfig }}>
                <DataAugmentationConfigContext.Provider
                    value={{ dataAugmentationConfig, setDataAugmentationConfig }}>
                    <ClassConfigContext.Provider value={{ classConfig, setClassConfig }}>
                        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-8">
                            {ContentElem(key)}
                        </main>
                    </ClassConfigContext.Provider>
                </DataAugmentationConfigContext.Provider>
            </ParamConfigContext.Provider>
            <footer className="flex min-h-20 items-center justify-center border-t border-border px-6 text-center text-sm text-muted-foreground sm:px-10">
                © Copyright {new Date().getFullYear()} Ilhamuh97
            </footer>
        </div>
    );
};

export default Main;
