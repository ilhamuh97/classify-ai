import { ReactNode } from 'react';
import { Info, Minus, Plus } from 'lucide-react';
import { graphModelOptions, optimizerOptions } from '@/assets/initialValues/initialValues.ts';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ParamConfig } from '@/types.ts';

interface ModelConfigProps {
    paramConfig: ParamConfig;
    modelFormHandler: (changedValues: Partial<ParamConfig>, allValues: ParamConfig) => void;
}

const FIELD_INFO: Record<keyof ParamConfig, string> = {
    model: 'This model generates feature vectors for each image in the dataset and uses these vectors to train its own parameters.',
    optimizer:
        'An optimizer is a technique used in machine learning to minimize the loss/error during model training by updating its parameters.',
    learningRate:
        "The learning rate is like a speed control for training a machine learning model. When the model is being trained, it makes updates to its parameters so it can better fit the data. The learning rate determines how big these updates should be. If the learning rate is set too high, the model might make big leaps and miss the best solution. If it's set too low, the training process will be slow. The goal is to find the right learning rate so the model can quickly and accurately find the best solution.",
    epochs: 'The number of training iterations performed by this model can be adjusted by specifying the number of epochs.',
    batchSize:
        'The batch size refers to the number of images processed in a single group. With each batch, the model updates its parameters through learning.'
};

const FieldLabel = ({ children, info }: { children: ReactNode; info: string }) => (
    <div className="flex items-center gap-1.5">
        <Label>{children}</Label>
        <Tooltip>
            <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground" aria-label="More info">
                    <Info className="size-3.5" />
                </button>
            </TooltipTrigger>
            <TooltipContent>{info}</TooltipContent>
        </Tooltip>
    </div>
);

interface NumberFieldProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    step?: number;
}

const NumberField = ({ value, onChange, min, step = 1 }: NumberFieldProps) => {
    const round = (n: number) => parseFloat(n.toFixed(6));
    const clamp = (n: number) => (min !== undefined ? Math.max(min, n) : n);
    const atMin = min !== undefined && value <= min;

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 shrink-0"
                disabled={atMin}
                onClick={() => onChange(clamp(round(value - step)))}
                aria-label="Decrease">
                <Minus />
            </Button>
            <Input
                type="number"
                inputMode="decimal"
                step={step}
                min={min}
                value={value}
                onChange={(e) => {
                    const next = e.target.valueAsNumber;
                    if (!Number.isNaN(next)) onChange(clamp(next));
                }}
                className="text-center [appearance:textfield]"
            />
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 shrink-0"
                onClick={() => onChange(clamp(round(value + step)))}
                aria-label="Increase">
                <Plus />
            </Button>
        </div>
    );
};

const ModelConfig = ({ paramConfig, modelFormHandler }: ModelConfigProps) => {
    const updateField = <K extends keyof ParamConfig>(key: K, value: ParamConfig[K]) => {
        const updated = { ...paramConfig, [key]: value };
        modelFormHandler({ [key]: value }, updated);
    };

    return (
        <div className="grid gap-4">
            <div className="grid gap-1.5">
                <FieldLabel info={FIELD_INFO.model}>Model</FieldLabel>
                <Select
                    value={paramConfig.model}
                    onValueChange={(value) => updateField('model', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Please select the model" />
                    </SelectTrigger>
                    <SelectContent>
                        {graphModelOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5">
                <FieldLabel info={FIELD_INFO.optimizer}>Optimizer</FieldLabel>
                <Select
                    value={paramConfig.optimizer}
                    onValueChange={(value) => updateField('optimizer', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Please select the optimizer" />
                    </SelectTrigger>
                    <SelectContent>
                        {optimizerOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5">
                <FieldLabel info={FIELD_INFO.learningRate}>Learning rate</FieldLabel>
                <NumberField
                    value={paramConfig.learningRate}
                    step={0.001}
                    min={0.001}
                    onChange={(value) => updateField('learningRate', value)}
                />
            </div>
            <div className="grid gap-1.5">
                <FieldLabel info={FIELD_INFO.epochs}>Epochs</FieldLabel>
                <NumberField
                    value={paramConfig.epochs}
                    min={1}
                    onChange={(value) => updateField('epochs', value)}
                />
            </div>
            <div className="grid gap-1.5">
                <FieldLabel info={FIELD_INFO.batchSize}>Batch size</FieldLabel>
                <NumberField
                    value={paramConfig.batchSize}
                    min={1}
                    onChange={(value) => updateField('batchSize', value)}
                />
            </div>
        </div>
    );
};

export default ModelConfig;
