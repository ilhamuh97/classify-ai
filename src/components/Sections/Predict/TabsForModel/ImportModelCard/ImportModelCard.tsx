import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassConfigItem } from '@/types.ts';

interface ImportModelCardProps {
    setImportedClassConfig: Dispatch<SetStateAction<ClassConfigItem[] | null>>;
    setImportedModel: Dispatch<SetStateAction<tf.LayersModel | null>>;
}

const ImportModelCard = ({ setImportedClassConfig, setImportedModel }: ImportModelCardProps) => {
    const [classes, setClasses] = useState<ClassConfigItem[] | null>(null);

    const readClassesFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const contents = event.target?.result as string;
            const lines = contents.split('\n');
            const tempClasses: ClassConfigItem[] = lines.map((line, i) => ({
                key: i,
                label: line,
                cameraState: false
            }));
            setClasses(tempClasses);
        };
        reader.readAsText(file);
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        const classesFile = files.find((f) => f.type === 'text/plain');
        if (classesFile) readClassesFile(classesFile);

        const jsonFile = files.find((f) => f.type === 'application/json');
        const weightsFile = files.find((f) => f.name.endsWith('.bin'));
        if (!jsonFile || !weightsFile) return;

        try {
            const model = await tf.loadLayersModel(tf.io.browserFiles([jsonFile, weightsFile]));
            model.summary();
            setImportedClassConfig(classes);
            setImportedModel(model);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Import your model</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                    In order to import your model, you have to import 3 files, which are
                    model.weights.bin, model.json, and classes.txt
                </p>
                <div>
                    <Button asChild variant="outline">
                        <label className="cursor-pointer">
                            <Upload /> Upload
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ImportModelCard;
