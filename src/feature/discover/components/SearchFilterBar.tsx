import {
	CoreButton,
	CoreDropdown,
	CoreModal,
	CoreSelect,
	CoreSelectItem,
	CoreTooltip,
	CoreTextInput,
} from '@featuring-corp/components';
import {
	IconSearchOutline,
	IconChevronDownOutline,
	IconTuneOutline,
	IconCloseOutline,
	IconZoomOutAreaOutline,
	IconUserCircleOutline,
	IconInformationFilled,
} from '@featuring-corp/icons';
import * as styles from './searchFilterBar.css';
import { useRef, useState } from 'react';
import { sprinkles } from '@/styles/sprinkles.css';

export default function SearchFilterBar() {
	const [searchOpen, setSearchOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const searchRef = useRef(null);
	const filterRef = useRef(null);
	const handleSearchOpen = () => {
		console.log('열림');
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
						<div className={styles.modalContentBox}>
							<div className={styles.modalContentHeaderTitleBox}>
								<IconZoomOutAreaOutline />
								<div>키워드 관련 인플루언서 검색</div>
							</div>
						</div>
						<CoreButton
							size="lg"
							className={styles.closeButton}
							prefix={<IconCloseOutline />}
							buttonType="contrast"
							onClick={() => setSearchOpen(false)}
						/>
					</div>
				}
				targetRef={searchRef}
			/>
			<CoreButton
				ref={filterRef}
				buttonType="tertiary"
				onClick={() => handleFilterOpen()}
				prefix={<IconTuneOutline />}
				text="고급 필터 설정"
				suffix={<IconChevronDownOutline />}
			/>
			<CoreDropdown
				placement="bottom-start"
				handler={handleFilterOpen}
				open={filterOpen}
				width={900}
				height={541}
				padding={0}
				children={
					<div className={styles.modalContentWrapper}>
						<div className={styles.modalContentBox}>
							<div className={styles.modalContentHeaderTitleBox}>
								<IconUserCircleOutline />
								<div>인플루언서 정보</div>
							</div>
							<CoreButton
								size="lg"
								className={styles.closeButton}
								prefix={<IconCloseOutline size={32} />}
								buttonType="contrast"
								onClick={() => setSearchOpen(false)}
							/>
							<CoreSelect
								label="Label"
								labelElement={
									<CoreTooltip text="It's Label Element">
										<IconInformationFilled color="var(--global-colors-gray-50)" />
									</CoreTooltip>
								}
								size="lg"
								width="240px"
							>
								<CoreSelectItem value="text-1">Option1</CoreSelectItem>
								<CoreSelectItem value="text-2">Option2</CoreSelectItem>
								<CoreSelectItem value="text-3">Option3</CoreSelectItem>
								<CoreSelectItem value="text-4">Option4</CoreSelectItem>
								<CoreSelectItem value="text-5">Option5</CoreSelectItem>
							</CoreSelect>
						</div>
						<div className={styles.modalContentBox}>
							<div className={styles.modalContentHeaderTitleBox}>
								<IconUserCircleOutline />
								<div>인플루언서 정보</div>
							</div>
							<CoreButton
								size="lg"
								className={styles.closeButton}
								prefix={<IconCloseOutline size={32} />}
								buttonType="contrast"
								onClick={() => setSearchOpen(false)}
							/>
							<CoreSelect
								label="Label"
								labelElement={
									<CoreTooltip text="It's Label Element">
										<IconInformationFilled color="var(--global-colors-gray-50)" />
									</CoreTooltip>
								}
								size="lg"
								width="240px"
							>
								<CoreSelectItem value="text-1">Option1</CoreSelectItem>
								<CoreSelectItem value="text-2">Option2</CoreSelectItem>
								<CoreSelectItem value="text-3">Option3</CoreSelectItem>
								<CoreSelectItem value="text-4">Option4</CoreSelectItem>
								<CoreSelectItem value="text-5">Option5</CoreSelectItem>
							</CoreSelect>
						</div>
						<div className={styles.modalContentBox}>
							<div className={styles.modalContentHeaderTitleBox}>
								<IconUserCircleOutline />
								<div>인플루언서 정보</div>
							</div>
							<CoreButton
								size="lg"
								className={styles.closeButton}
								prefix={<IconCloseOutline size={32} />}
								buttonType="contrast"
								onClick={() => setSearchOpen(false)}
							/>
							<CoreSelect
								label="Label"
								labelElement={
									<CoreTooltip text="It's Label Element">
										<IconInformationFilled color="var(--global-colors-gray-50)" />
									</CoreTooltip>
								}
								size="lg"
								width="240px"
							>
								<CoreSelectItem value="text-1">Option1</CoreSelectItem>
								<CoreSelectItem value="text-2">Option2</CoreSelectItem>
								<CoreSelectItem value="text-3">Option3</CoreSelectItem>
								<CoreSelectItem value="text-4">Option4</CoreSelectItem>
								<CoreSelectItem value="text-5">Option5</CoreSelectItem>
							</CoreSelect>
						</div>
					</div>
				}
				targetRef={filterRef}
			/>

			<div>원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.</div>
		</div>
	);
}
