import type P5 from 'p5';
import { DataAugmentationConfig } from '@/types';

/**
 * Applies noise, translation, rotation, flip and scale to `img` in place
 * (per `config`) and draws the result via the given p5 instance.
 */
export const augmentImage = (
    p5: P5,
    img: P5.Image,
    sourceData: Uint8ClampedArray,
    config: DataAugmentationConfig
) => {
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const index = (x + y * img.width) * 4;
            const rand = p5.random(0, 1);
            if (rand < config.noise) {
                img.pixels[index] = 0;
                img.pixels[index + 1] = 0;
                img.pixels[index + 2] = 0;
                img.pixels[index + 3] = 255;
            } else {
                img.pixels[index] = sourceData[index];
                img.pixels[index + 1] = sourceData[index + 1];
                img.pixels[index + 2] = sourceData[index + 2];
                img.pixels[index + 3] = sourceData[index + 3];
            }
        }
    }
    img.updatePixels();

    // image translation
    let translationXRand = 0;
    let translationYRand = 0;
    if (config.translationX) {
        translationXRand = p5.random(-config.translationX, config.translationX);
    }
    if (config.translationY) {
        translationYRand = p5.random(-config.translationY, config.translationY);
    }
    const xTranslation = img.width * translationXRand;
    const yTranslation = img.height * translationYRand;
    p5.translate(img.width / 2 + xTranslation, img.height / 2 + yTranslation);

    // image rotation
    if (config.rotation) {
        const rotationRand = p5.random(-config.rotation, config.rotation);
        p5.rotate(p5.PI * rotationRand);
    }

    // flip
    let flipX = 1;
    if (config.flipX && 0.5 > p5.random(0, 1)) {
        flipX = -1;
    }
    let flipY = 1;
    if (config.flipY && 0.5 > p5.random(0, 1)) {
        flipY = -1;
    }

    // scale
    let scaleXRand = 0;
    let scaleYRand = 0;
    if (config.scale) {
        scaleXRand = p5.random(config.scale, -config.scale);
        scaleYRand = p5.random(config.scale, -config.scale);
    }

    const scaleX = scaleXRand * flipX;
    const scaleY = scaleYRand * flipY;
    p5.scale(flipX + scaleX, flipY + scaleY);
    p5.image(img, 0, 0);
};
