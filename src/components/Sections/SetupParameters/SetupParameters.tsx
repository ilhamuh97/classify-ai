import SettingField from './SettingField/SettingField';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { setupParametersContext as headerContext } from '../../../assets/text/headerText/headerText';
import { DatasetItem } from '../../../types';
import styles from './SetupParameters.module.scss';

interface SetupParametersProps {
    dataset: DatasetItem[];
}

const SetupParameters = ({ dataset }: SetupParametersProps) => {
    return (
        <div className={styles.setupParameters}>
            <SectionHeader
                title={headerContext.title}
                subTitle={headerContext.subTitle}
                stepStatus={headerContext.stepStatus}
            />
            <SettingField dataset={dataset} />
        </div>
    );
};

export default SetupParameters;
