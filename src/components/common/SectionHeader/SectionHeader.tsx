import { Typography } from 'antd';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
    title: string;
    subTitle: string;
    stepStatus: string;
}

const SectionHeader = ({ title, subTitle, stepStatus }: SectionHeaderProps) => {
    return (
        <Typography className={styles.sectionHeader}>
            <span className={styles.stepStatus}>{stepStatus}</span>
            <Typography.Title className={styles.title} level={2}>
                {title}
            </Typography.Title>
            <Typography.Paragraph className={styles.subTitle}>{subTitle}</Typography.Paragraph>
        </Typography>
    );
};

export default SectionHeader;
