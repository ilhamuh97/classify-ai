import { ChangeEvent, RefObject, useRef } from 'react';
import { toast } from 'sonner';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CroppedImage } from '@/types.ts';

interface AddDatasetProps {
    turnOnCamera: () => void;
    inputByUpload: (uploadImage: CroppedImage) => void;
    canvasRef: RefObject<HTMLCanvasElement | null>;
}

const AddDataset = ({ turnOnCamera, inputByUpload, canvasRef }: AddDatasetProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const cropToSquare = (img: HTMLImageElement): CroppedImage => {
        const context = canvasRef.current!.getContext('2d')!;
        context.drawImage(img, 0, 0, 265, 265);
        return {
            src: canvasRef.current!.toDataURL(),
            imgData: context.getImageData(0, 0, 265, 265)
        };
    };

    const processFile = (file: File) => {
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpg' || file.type === 'image/jpeg';
        if (!isPNG && !isJPEG) {
            toast.error(`${file.name} is not a png, jpg, or jpeg file`);
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const size = Math.min(img.width, img.height);
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const context = canvas.getContext('2d')!;
                context.drawImage(
                    img,
                    (img.width - size) / 2,
                    (img.height - size) / 2,
                    size,
                    size,
                    0,
                    0,
                    size,
                    size
                );
                const squaredImage = canvas.toDataURL();
                const reducedImg = new Image();
                reducedImg.onload = function () {
                    const squareImg = cropToSquare(reducedImg);
                    inputByUpload(squareImg);
                };
                reducedImg.src = squaredImage;
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        Array.from(event.target.files ?? []).forEach(processFile);
        event.target.value = '';
    };

    return (
        <div className="flex flex-wrap gap-2 p-3.5">
            <Button onClick={turnOnCamera}>
                <Camera /> Use camera
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload /> Upload
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default AddDataset;
