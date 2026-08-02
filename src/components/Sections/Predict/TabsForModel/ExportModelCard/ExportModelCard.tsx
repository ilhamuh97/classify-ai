import * as tf from '@tensorflow/tfjs';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassConfigItem } from '@/types.ts';

interface ExportModelCardProps {
    model: tf.LayersModel | null;
    classConfig: ClassConfigItem[];
}

const ExportModelCard = ({ model, classConfig }: ExportModelCardProps) => {
    const classesTextBuilder = () => {
        let result = '';
        classConfig.forEach((c, i) => {
            if (i !== classConfig.length - 1) {
                result += `${c.label}\n`;
            } else {
                result += c.label;
            }
        });
        return result;
    };

    const exportModel = async () => {
        const classesText = classesTextBuilder();
        try {
            const modelName = 'my-model';
            await model!.save('downloads://' + modelName);

            const blob = new Blob([classesText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'classes.txt';
            link.href = url;
            link.click();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Export your model</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="text-sm text-muted-foreground">
                    <p>
                        To save your trained model to your computer, click the button below. This
                        will create and export three files:
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                        <li>model.json</li>
                        <li>model.weights.bin</li>
                        <li>classes.txt</li>
                    </ul>
                </div>
                <div>
                    <Button onClick={() => exportModel()} disabled={!model}>
                        <Download /> Export
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExportModelCard;
