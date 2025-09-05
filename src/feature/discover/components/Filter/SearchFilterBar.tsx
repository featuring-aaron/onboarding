import React, { useState } from 'react';
import * as styles from './SearchFilterBar.css';
import KeywordSearchDropdown from './KeywordSearchDropdown';
import AdvancedFilterDropdown from './AdvancedFilterDropdown';
import { FilterState } from '@/types/filter';

interface SearchFilterBarProps {
	filterState: FilterState;
	onApplyFilters: (filterState: FilterState) => void;
}

export default function SearchFilterBar({ filterState, onApplyFilters }: SearchFilterBarProps) {
	const [searchOpen, setSearchOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);

	const handleSearchOpen = () => {
		console.log('열림');
		setSearchOpen(!searchOpen);
	};
	const handleFilterOpen = () => {
		setFilterOpen(!filterOpen);
	};
	return (
		<div className={styles.container}>
			<KeywordSearchDropdown
				isOpen={searchOpen}
				onToggle={handleSearchOpen}
			/>
			<AdvancedFilterDropdown
				isOpen={filterOpen}
				onToggle={handleFilterOpen}
				filterState={filterState}
				onApplyFilters={onApplyFilters}
			/>
			<div>원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.</div>
		</div>
	);
}