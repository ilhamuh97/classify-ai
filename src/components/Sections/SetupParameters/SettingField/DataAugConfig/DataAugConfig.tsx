import { useState } from 'react';
import type P5 from 'p5';
import { RefreshCw } from 'lucide-react';
import P5Sketch from '../../../../common/P5Sketch/P5Sketch';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { DataAugmentationConfig, DatasetItem } from '@/types.ts';

interface DataAugConfigProps {
    dataAugmentationConfig: DataAugmentationConfig;
    dataAugmentationFormHandler: (
        changedValues: Partial<DataAugmentationConfig>,
        allValues: DataAugmentationConfig
    ) => void;
    dataset: DatasetItem[];
}

const COPY_NUMBER_OPTIONS = Array.from({ length: 10 }, (_, i) => String(i + 1));

interface SliderFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const SliderField = ({ label, value, onChange }: SliderFieldProps) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
        <Label>{label}</Label>
        <span className="justify-self-end rounded-sm border border-input bg-secondary px-2 py-0.5 font-mono text-xs tabular-nums">
            {value.toFixed(2)}
        </span>
        <Slider
            className="col-span-2"
            min={0}
            max={1}
            step={0.01}
            value={[value]}
            onValueChange={([next]) => onChange(next)}
        />
    </div>
);

const DataAugConfig = ({
    dataAugmentationConfig,
    dataAugmentationFormHandler,
    dataset
}: DataAugConfigProps) => {
    const [clickedSeed, setClickedSeed] = useState(parseInt(String(Math.random() * 100000)));

    const updateField = <K extends keyof DataAugmentationConfig>(
        key: K,
        value: DataAugmentationConfig[K]
    ) => {
        const updated = { ...dataAugmentationConfig, [key]: value };
        dataAugmentationFormHandler({ [key]: value }, updated);
    };

    const setup = (p5: P5, canvasParentRef: Element) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(265, 265).parent(canvasParentRef);
        p5.pixelDensity(1);
        //this will make placement and rotation easier because the anchor point is moved to the center of the image
        p5.imageMode(p5.CENTER);
        //By default, rotations are specified in radians
    };

    const draw = (p5: P5) => {
        p5.randomSeed(clickedSeed);
        p5.background(0);
        const randomImgIndex = parseInt(String(p5.random(0, dataset.length - 1)));
        // load image
        const img = p5.createImage(
            dataset[randomImgIndex].data.width,
            dataset[randomImgIndex].data.height
        );
        if (!dataAugmentationConfig.isActive) {
            img.loadPixels();
            const arr = dataset[randomImgIndex].data.data;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    const index = (x + y * img.width) * 4;

                    img.pixels[index] = arr[index];
                    img.pixels[index + 1] = arr[index + 1];
                    img.pixels[index + 2] = arr[index + 2];
                    img.pixels[index + 3] = arr[index + 3];
                }
            }
            p5.translate(img.width / 2, img.height / 2);
            img.updatePixels();
            p5.image(img, 0, 0);
        } else {
            img.loadPixels();
            const arr = dataset[randomImgIndex].data.data;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    const index = (x + y * img.width) * 4;
                    const rand = p5.random(0, 1);
                    if (rand < dataAugmentationConfig.noise) {
                        img.pixels[index] = 0;
                        img.pixels[index + 1] = 0;
                        img.pixels[index + 2] = 0;
                        img.pixels[index + 3] = 255;
                    } else {
                        img.pixels[index] = arr[index];
                        img.pixels[index + 1] = arr[index + 1];
                        img.pixels[index + 2] = arr[index + 2];
                        img.pixels[index + 3] = arr[index + 3];
                    }
                }
            }
            img.updatePixels();
            // Data augmentation

            // image translation
            let translationXRand = 0;
            let translationYRand = 0;
            if (dataAugmentationConfig.translationX) {
                translationXRand = p5.random(
                    -dataAugmentationConfig.translationX,
                    dataAugmentationConfig.translationX
                );
            }

            if (dataAugmentationConfig.translationY) {
                translationYRand = p5.random(
                    -dataAugmentationConfig.translationY,
                    dataAugmentationConfig.translationY
                );
            }
            const xTranslation = img.width * translationXRand;
            const yTranslation = img.height * translationYRand;
            p5.translate(img.width / 2 + xTranslation, img.height / 2 + yTranslation);

            // image rotation
            if (dataAugmentationConfig.rotation) {
                const rotationRand = p5.random(
                    -dataAugmentationConfig.rotation,
                    dataAugmentationConfig.rotation
                );
                p5.rotate(p5.PI * rotationRand);
            }

            //flip scale
            let flipX = 1;
            if (dataAugmentationConfig.flipX && 0.5 > p5.random(0, 1)) {
                flipX = -1;
            }
            let flipY = 1;
            if (dataAugmentationConfig.flipY && 0.5 > p5.random(0, 1)) {
                flipY = -1;
            }

            //scale
            let scaleXRand = 0;
            let scaleYRand = 0;
            if (dataAugmentationConfig.scale) {
                scaleXRand = p5.random(dataAugmentationConfig.scale, -dataAugmentationConfig.scale);
                scaleYRand = p5.random(dataAugmentationConfig.scale, -dataAugmentationConfig.scale);
            }

            const scaleX = scaleXRand * flipX;
            const scaleY = scaleYRand * flipY;
            p5.scale(flipX + scaleX, flipY + scaleY);
            p5.image(img, 0, 0);
        }
    };

    return (
        <div className="grid gap-5">
            <div className="flex items-center justify-between gap-3">
                <div className="grid gap-0.5">
                    <Label>Data augmentation</Label>
                    <p className="text-xs text-muted-foreground">
                        By augmenting data, you can create a diverse range of images in your
                        dataset, reducing the risk of overfitting the model. Add at least one image
                        to enable this.
                    </p>
                </div>
                <Switch
                    checked={dataAugmentationConfig.isActive}
                    disabled={dataset.length === 0}
                    onCheckedChange={(checked) => updateField('isActive', checked)}
                />
            </div>

            {dataAugmentationConfig.isActive ? (
                <div className="grid gap-5">
                    <div className="grid gap-1.5">
                        <Label>Copy number</Label>
                        <Select
                            value={String(dataAugmentationConfig.copyNumb)}
                            onValueChange={(value) => updateField('copyNumb', Number(value))}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {COPY_NUMBER_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <SliderField
                        label="Noise"
                        value={dataAugmentationConfig.noise}
                        onChange={(value) => updateField('noise', value)}
                    />
                    <SliderField
                        label="Horizontal translation"
                        value={dataAugmentationConfig.translationX}
                        onChange={(value) => updateField('translationX', value)}
                    />
                    <SliderField
                        label="Vertical translation"
                        value={dataAugmentationConfig.translationY}
                        onChange={(value) => updateField('translationY', value)}
                    />
                    <SliderField
                        label="Rotation"
                        value={dataAugmentationConfig.rotation}
                        onChange={(value) => updateField('rotation', value)}
                    />
                    <div className="flex items-center justify-between gap-3">
                        <Label>Horizontal flip</Label>
                        <Switch
                            checked={dataAugmentationConfig.flipX}
                            onCheckedChange={(checked) => updateField('flipX', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <Label>Vertical flip</Label>
                        <Switch
                            checked={dataAugmentationConfig.flipY}
                            onCheckedChange={(checked) => updateField('flipY', checked)}
                        />
                    </div>
                    <SliderField
                        label="Scale"
                        value={dataAugmentationConfig.scale}
                        onChange={(value) => updateField('scale', value)}
                    />
                </div>
            ) : null}

            {dataAugmentationConfig.isActive ? (
                <>
                    <Separator />
                    <div className="grid justify-items-center gap-4 text-center">
                        <div className="grid gap-1">
                            <h4 className="font-display text-xl">Display Image</h4>
                            <p className="max-w-[45ch] text-sm text-muted-foreground">
                                The display below shows an augmented image. To view another randomly
                                generated image from your dataset, click &quot;Generate Image&quot;.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-full border-8 border-secondary bg-brand-scope shadow-inner">
                            <P5Sketch setup={setup} draw={draw} />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setClickedSeed(parseInt(String(Math.random() * 100000)))
                            }>
                            <RefreshCw /> Generate Image
                        </Button>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default DataAugConfig;
