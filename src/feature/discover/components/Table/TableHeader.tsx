import { CoreButton } from '@featuring-corp/components';
import { IconDocumentOutline } from '@featuring-corp/icons';
import * as styles from './tableHeader.css';
export default function TableHeader() {
	return (
		<div className={styles.container}>
			<div>인플루언서 찾기</div>
			<CoreButton prefix={<IconDocumentOutline />} buttonType="tertiary" text="인플루언서 찾기 가이드" />
		</div>
	);
}
