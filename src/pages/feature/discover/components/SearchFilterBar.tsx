import { CoreButton, CoreDropdown, CoreModal, CoreTextInput } from '@featuring-corp/components';
import {
	IconSearchOutline,
	IconChevronDownOutline,
	IconCalendarOutline,
	IconCloseOutline,
	IconZoomOutAreaOutline,
} from '@featuring-corp/icons';
import * as styles from './searchFilterBar.css';
import { useRef, useState } from 'react';

export default function SearchFilterBar() {
	const [searchOpen, setSearchOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const searchRef = useRef(null);
	const filterRef = useRef(null);
	const handleSearchOpen = () => {
		setSearchOpen(!searchOpen);
	};
	const handleFilterOpen = () => {
		setFilterOpen(!filterOpen);
	};
	return (
		<div className={styles.container}>
			<CoreButton
				ref={searchRef}
				onClick={() => handleSearchOpen()}
				prefix={<IconSearchOutline />}
				text="키워드 검색"
				suffix={<IconChevronDownOutline />}
			/>
			<CoreDropdown
				placement="bottom-start"
				handler={handleSearchOpen}
				open={searchOpen}
				width={648}
				height={541}
				children={
					<div className={styles.modalContentWrapper}>
						<div className={styles.modalContentHeaderBox}>
							<div className={styles.modalContentHeaderTitleBox}>
								<IconZoomOutAreaOutline />
								<div>키워드 관련 인플루언서 검색</div>
							</div>

							<CoreButton prefix={<IconCloseOutline />} buttonType="contrast" onClick={() => setSearchOpen(false)} />
						</div>
						<CoreTextInput placeholder="키워드를 입력해주세요." />
						<div className={styles.modalContentFooterBox}>
							<CoreButton buttonType="tertiary" text="취소" onClick={() => setSearchOpen(false)} />
							<CoreButton buttonType="primary" text="필터 적용" onClick={() => setSearchOpen(false)} />
						</div>
					</div>
				}
				targetRef={searchRef}
			/>
			<CoreButton
				ref={filterRef}
				buttonType="tertiary"
				onClick={() => handleFilterOpen()}
				prefix={<IconSearchOutline />}
				text="고급 필터 설정"
				suffix={<IconChevronDownOutline />}
			/>
			<CoreDropdown
				placement="top-start"
				handler={handleFilterOpen}
				open={filterOpen}
				width={240}
				children={<div></div>}
				targetRef={filterRef}
			/>

			<div>원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.</div>
		</div>
	);
}
