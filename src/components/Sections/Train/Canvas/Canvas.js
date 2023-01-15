import React, { useEffect } from 'react';
import Sketch from 'react-p5';

const Canvas = ({
    dataAugmentationConfig,
    dataset,
    setAugmentingIsReady,
    setAugmentedDataset,
    setProgressMessage
}) => {
    useEffect(() => {
        setProgressMessage('Preparing feature vectors...');
    }, []);

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(265, 265).parent(canvasParentRef);
        p5.pixelDensity(1);
        //this will make placement and rotation easier because the anchor point is moved to the center of the image
        p5.imageMode(p5.CENTER);
        p5.noLoop();
        //By default, rotations are specified in radians
    };

    const draw = (p5) => {
        const augmentedDataset = [];
        dataset.forEach((image) => {
            p5.clear();
            p5.background(0);
            const img = p5.createImage(image.data.width, image.data.height);
            img.loadPixels();
            const arr = image.data.data;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    let index = (x + y * img.width) * 4;
                    const rand = p5.random(0, 1);
                    if (rand < dataAugmentationConfig.noise) {
                        img.pixels[index + 0] = 0;
                        img.pixels[index + 1] = 0;
                        img.pixels[index + 2] = 0;
                        img.pixels[index + 3] = 255;
                    } else {
                        img.pixels[index + 0] = arr[index];
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
            p5.scale(1 * flipX + scaleX, 1 * flipY + scaleY);
            p5.image(img, 0, 0);
            augmentedDataset.push({
                data: img.imageData,
                key: image.key
            });
        });
        setAugmentedDataset(augmentedDataset);
        setAugmentingIsReady(true);
        p5.noLoop();
    };
    return (
        <Sketch
            setup={setup}
            draw={draw}
            style={{
                display: 'none'
            }}
        />
    );
};

export default Canvas;
