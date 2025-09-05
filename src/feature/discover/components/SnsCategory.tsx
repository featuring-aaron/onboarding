import { CoreSegmentedControl, CoreSegmentedControlGroup } from '@featuring-corp/components';
import {
	IconDocumentOutline,
	IconInstagramColored,
	IconYoutubeColored,
	IconXColored,
	IconNaverBlogColored,
	IconTiktokColored,
} from '@featuring-corp/icons';
import { useState } from 'react';
import * as styles from './snsCategory.css';
import { CoreIconBadge } from '@featuring-corp/components';

const snsCategory = [
	{ title: '인스타그램', icon: <CoreIconBadge icon={<IconInstagramColored />} /> },
	{ title: '유튜브', icon: <CoreIconBadge icon={<IconYoutubeColored />} /> },
	{ title: '엑스', icon: <CoreIconBadge icon={<IconXColored />} /> },
	{ title: '틱톡', icon: <CoreIconBadge icon={<IconTiktokColored />} /> },
	{ title: '네이버 블로그', icon: <CoreIconBadge icon={<IconNaverBlogColored />} /> },
];

export default function SnsCategory() {
	const [value, setValue] = useState<string>('');
	const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setValue(event.currentTarget.value);
	};
	return (
		<div className={styles.segmentedControlGroupWrapper}>
			<CoreSegmentedControlGroup className={styles.segmentedControlGroup}>
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
