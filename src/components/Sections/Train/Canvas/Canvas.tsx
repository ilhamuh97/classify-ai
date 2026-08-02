import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import P5Sketch from '../../../common/P5Sketch/P5Sketch';
import type P5 from 'p5';
import { augmentImage } from '@/helpers/augmentImage';
import { AugmentedDatasetItem, DataAugmentationConfig, DatasetItem, TrainState } from '@/types.ts';

interface CanvasProps {
    dataAugmentationConfig: DataAugmentationConfig;
    dataset: DatasetItem[];
    setAugmentedDataset: Dispatch<SetStateAction<AugmentedDatasetItem[]>>;
    setProgressMessage: Dispatch<SetStateAction<string>>;
    setState: Dispatch<SetStateAction<TrainState>>;
}

const Canvas = ({
    dataAugmentationConfig,
    dataset,
    setAugmentedDataset,
    setProgressMessage,
    setState
}: CanvasProps) => {
    const [i, setI] = useState(0);
    const [copyNumbIndex, setCopyNumbIndex] = useState(1);

    useEffect(() => {
        setProgressMessage('Preparing feature vectors...');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        const image = dataset[i];
        p5.clear();
        p5.background(0);
        const img = p5.createImage(image.data.width, image.data.height);
        augmentImage(p5, img, image.data.data, dataAugmentationConfig);
        p5.loadPixels();
        const imageData = (p5 as unknown as { imageData: ImageData }).imageData;
        setAugmentedDataset((current) => [
            ...current,
            {
                url: (p5 as unknown as { canvas: HTMLCanvasElement }).canvas.toDataURL(),
                data: imageData,
                key: image.key
            }
        ]);

        if (i === dataset.length - 1) {
            if (copyNumbIndex < dataAugmentationConfig.copyNumb) {
                setI(0);
                setCopyNumbIndex(copyNumbIndex + 1);
            } else {
                setState('SET_DATA');
                p5.noLoop();
            }
        } else {
            setI(i + 1);
        }
    };
    return (
        <P5Sketch
            setup={setup}
            draw={draw}
            style={{
                display: 'none'
            }}
        />
    );
};

export default Canvas;
