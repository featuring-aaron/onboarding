import { CoreSegmentedControl, CoreSegmentedControlGroup } from '@featuring-corp/components';
import { IconDocumentOutline } from '@featuring-corp/icons';
import { useState } from 'react';
import * as styles from './snsCategory.css';

const snsCategory = [
	{ title: '인스타그램', icon: <IconDocumentOutline /> },
	{ title: '유튜브', icon: <IconDocumentOutline /> },
	{ title: '엑스', icon: <IconDocumentOutline /> },
	{ title: '틱톡', icon: <IconDocumentOutline /> },
	{ title: '네이버 블로그', icon: <IconDocumentOutline /> },
];

export default function SnsCategory() {
	const [value, setValue] = useState<string>('');
	const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setValue(event.currentTarget.value);
	};
	return (
		<div className={styles.segmentedControlGroupWrapper}>
			<CoreSegmentedControlGroup>
				{snsCategory.map((item) => (
					<CoreSegmentedControl
						className={styles.segmentedControlBox}
						key={item.title}
						selected={value === item.title}
						value={item.title}
						onClick={handleChange}
						leadingElement={item.icon}
						children={item.title}
					/>
				))}
			</CoreSegmentedControlGroup>
		</div>
	);
}
