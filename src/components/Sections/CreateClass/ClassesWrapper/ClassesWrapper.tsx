import { Dispatch, SetStateAction, useRef } from 'react';
import { Plus } from 'lucide-react';
import Class from './Class/Class';
import { ClassConfigItem, DatasetItem } from '@/types.ts';

interface ClassesWrapperProps {
    classConfig: ClassConfigItem[];
    setClassConfig: Dispatch<SetStateAction<ClassConfigItem[]>>;
    dataset: DatasetItem[];
    setDataset: Dispatch<SetStateAction<DatasetItem[]>>;
}

const ClassesWrapper = ({
    classConfig,
    setClassConfig,
    dataset,
    setDataset
}: ClassesWrapperProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const datasetsClasses = () => {
        return classConfig.map((config, i) => {
            return (
                <Class
                    key={i}
                    config={config}
                    classConfig={classConfig}
                    setClassConfig={setClassConfig}
                    dataset={dataset}
                    setDataset={setDataset}
                    canvasRef={canvasRef}
                />
            );
        });
    };

    const generateKey = (key = 0): number => {
        let emptyKey = false;
        while (!emptyKey) {
            const foundedClass = classConfig.find((config) => config.key === key);
            if (!foundedClass) {
                emptyKey = true;
            } else {
                key++;
            }
        }

        return key;
    };

    const generateClassName = (key = 0): string => {
        let emptyKey = false;
        while (!emptyKey) {
            const foundedClass = classConfig.find((config) => config.label === `Class ${key + 1}`);
            if (!foundedClass) {
                emptyKey = true;
            } else {
                key++;
            }
        }

        return `Class ${key + 1}`;
    };

    const onClickHandler = () => {
        const key = generateKey();
        const className = generateClassName();
        setClassConfig((current) => [
            ...current,
            {
                key: key,
                label: className,
                cameraState: false
            }
        ]);
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {datasetsClasses()}
            <button
                type="button"
                onClick={() => onClickHandler()}
                className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:border-brand-metal hover:text-foreground">
                <Plus className="size-5" />
                Add class
            </button>
            <canvas ref={canvasRef} height={265} width={265} className="hidden" />
        </div>
    );
};

export default ClassesWrapper;
