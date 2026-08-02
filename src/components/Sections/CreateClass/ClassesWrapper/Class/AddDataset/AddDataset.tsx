import { RefObject } from 'react';
import { Button, Upload, message, Space } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { CroppedImage } from '../../../../../../types';
import styles from './AddDataset.module.scss';

interface AddDatasetProps {
    turnOnCamera: () => void;
    inputByUpload: (uploadImage: CroppedImage) => void;
    canvasRef: RefObject<HTMLCanvasElement | null>;
}

const AddDataset = ({ turnOnCamera, inputByUpload, canvasRef }: AddDatasetProps) => {
    const cropToSquare = (img: HTMLImageElement): CroppedImage => {
        const context = canvasRef.current!.getContext('2d')!;
        context.drawImage(img, 0, 0, 265, 265);
        return {
            src: canvasRef.current!.toDataURL(),
            imgData: context.getImageData(0, 0, 265, 265)
        };
    };

    const beforeUpload = (file: RcFile) => {
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpg' || file.type === 'image/jpeg';
        if (!isPNG && !isJPEG) {
            message.error(`${file.name} is not a png, jpg, or jpeg file`);
            return isPNG || Upload.LIST_IGNORE;
        } else {
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
            reader.readAsDataURL(new Blob([file]));
        }
        return false;
    };

    return (
        <Space className={styles.buttons}>
            <Button onClick={turnOnCamera} type="primary" icon={<CameraOutlined />}>
                Use camera
            </Button>
            <Upload showUploadList={false} multiple beforeUpload={beforeUpload}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </Space>
    );
};

export default AddDataset;
