'use client';

import React from 'react';
import { type SortingState } from '@tanstack/react-table';

import { CorePagination, CoreTable, CoreCheckbox, CoreAvatar, CoreTag, CoreSelect, CoreSelectItem, CoreMultiSelectPrim } from '@featuring-corp/components';
import type { Influencer } from '@/types/influencer';

import * as styles from './influencerTable.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';



// 스크롤 컬럼 (나머지 모든 컬럼) - API에서 실제로 받아오는 데이터만
const scrollHeaders: Array<{ label: string; key: keyof Influencer; sortable?: boolean }> = [
	{ label: '팔로워 수', key: 'follower', sortable: true },
	{ label: '예상 유효 팔로워수', key: 'real_follower', sortable: true },
	{ label: 'ER', key: 'real_engagement', sortable: true },
	{ label: '예상 평균 도달 수', key: 'avg_reach', sortable: true },
	{ label: '평균 피드 좋아요 수', key: 'avg_feed_like', sortable: true },
	{ label: '오디언스 성별', key: 'main_audience_gender', sortable: false },
	{ label: '오디언스 나이', key: 'main_audience_age_range', sortable: false },
];

// 각 컬럼의 width 정의 - API에서 실제로 받아오는 데이터만
const columnWidths = [
	'140px', // 팔로워 수
	'160px', // 예상 유효 팔로워수
	'100px', // ER
	'180px', // 예상 평균 도달 수
	'160px', // 평균 피드 좋아요 수
	'120px', // 오디언스 성별
	'120px', // 오디언스 나이
];

const cellByKey: Partial<Record<keyof Influencer, (row: Influencer) => React.ReactNode>> = {
	full_name: (r) => (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
			<CoreAvatar src={r.profile_img_link} />
			<div>
				<div style={{ fontWeight: 'bold' }}>{r.full_name}</div>
				<div style={{ fontSize: 12, color: '#666' }}>@{r.username}</div>
			</div>
		</div>
	),
	follower: (r) => r.follower?.toLocaleString() ?? '-',
	real_follower: (r) => r.real_follower?.toLocaleString() ?? '-',
	real_engagement: (r) => r.real_engagement ? (r.real_engagement * 100).toFixed(2) + '%' : '-',
	avg_reach: (r) => r.avg_reach?.toLocaleString() ?? '-',
	avg_feed_like: (r) => r.avg_feed_like ? r.avg_feed_like.toFixed(1) : '-',
	main_audience_gender: (r) =>
		r.main_audience_gender === 'F' ? '여성' : r.main_audience_gender === 'M' ? '남성' : '-',
	main_audience_age_range: (r) => r.main_audience_age_range ?? '-',
};

function defaultRender<T extends keyof Influencer>(row: Influencer, key: T) {
	const v = row[key] as unknown;
	if (v == null || v === undefined) return '-';
	if (typeof v === 'number') {
		if (isNaN(v)) return '-';
		return v.toString();
	}
	if (Array.isArray(v)) {
		if (v.length === 0) return '-';
		return v.join(', ');
	}
	if (typeof v === 'string' && v.trim() === '') return '-';
	return String(v);
}

interface InfluencerTableProps {
	data: Influencer[];
	sorting: SortingState;
	onSortingChange: (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => void;
	totalCount?: number;
	itemsPerPage: number;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function InfluencerTable({
	data,
	sorting,
	onSortingChange,
	totalCount,
	itemsPerPage,
	onItemsPerPageChange,
}: InfluencerTableProps) {
	const router = useRouter();
	const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

	// itemsPerPage는 props로 받아서 사용
	// 선택된 갯수에 따라 동적으로 라벨 생성
	const fixedHeaders: Array<{ label: string; key: keyof Influencer }> = [
		{ label: selectedItems.size > 0 ? `${selectedItems.size}명 선택` : '계정', key: 'full_name' },
	];

	// URL 쿼리 파라미터에서 현재 페이지를 가져오거나 기본값 1 사용
	const currentPage = parseInt(router.query.page as string, 10) || 1;

	// 서버 사이드 페이지네이션을 사용하므로 받은 데이터를 그대로 표시
	const currentData = data;

	// totalCount를 기준으로 총 페이지 수 계산 (서버에서 받은 totalCount 사용)
	const totalPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 1;

	useEffect(() => {
		const pageFromUrl = parseInt(router.query.page as string, 10);
		if (pageFromUrl && pageFromUrl > 0 && pageFromUrl <= totalPages) {

		} else if (router.query.page) {

			router.replace({ pathname: router.pathname, query: { ...router.query, page: 1 } }, undefined, { shallow: true });
		}
	}, [router.query.page, totalPages, router]);

	const handlePageChange = (page: number) => {

		router.push({ pathname: router.pathname, query: { ...router.query, page } }, undefined, { shallow: true });
	};

	const isAllCurrentPageSelected = currentData.every((item) => selectedItems.has(item.pk));

	const handleHeaderCheckboxChange = () => {
		if (isAllCurrentPageSelected) {
			const newSelectedItems = new Set(selectedItems);
			currentData.forEach((item) => newSelectedItems.delete(item.pk));
			setSelectedItems(newSelectedItems);
		} else {
			const newSelectedItems = new Set(selectedItems);
			currentData.forEach((item) => newSelectedItems.add(item.pk));
			setSelectedItems(newSelectedItems);
		}
	};

	const handleItemCheckboxChange = (itemPk: string) => {
		const newSelectedItems = new Set(selectedItems);
		if (newSelectedItems.has(itemPk)) {
			newSelectedItems.delete(itemPk);
		} else {
			newSelectedItems.add(itemPk);
		}
		setSelectedItems(newSelectedItems);
	};
	const handleSelectChange = (value: string) => {
		const newItemsPerPage = parseInt(value);
		onItemsPerPageChange(newItemsPerPage);
		// 페이지당 항목 수가 변경되면 첫 페이지로 이동
		router.push({ pathname: router.pathname, query: { ...router.query, page: 1 } }, undefined, { shallow: true });
	};

	// 헤더 클릭 핸들러
	const handleHeaderClick = (key: keyof Influencer) => {
		const currentSort = sorting.find(s => s.id === key);
		let newSorting: SortingState;

		if (!currentSort) {
			// 현재 정렬되지 않은 컬럼을 클릭하면 오름차순으로 정렬
			newSorting = [{ id: key, desc: false }];
		} else if (currentSort.desc) {
			// 내림차순에서 클릭하면 정렬 해제
			newSorting = [];
		} else {
			// 오름차순에서 클릭하면 내림차순으로 변경
			newSorting = [{ id: key, desc: true }];
		}

		onSortingChange(newSorting);
	};

	// 정렬 방향 표시를 위한 함수
	const getSortDirection = (key: keyof Influencer) => {
		const currentSort = sorting.find(s => s.id === key);
		if (!currentSort) return null;
		return currentSort.desc ? 'desc' : 'asc';
	};
	return (
		<div>
			<CoreTable.Container className={styles.tableWrapper}>
				<div className={styles.tableContainer}>

					<div className={styles.fixedArea}>
						<CoreTable.Table size="lg" className={styles.fixedTable}>
							<CoreTable.TableHead className={styles.tableHeaderRow}>
								<CoreTable.TableRow className={styles.tableHeaderRow}>
									<CoreTable.TableCell className={styles.checkBox}>
										<CoreCheckbox checked={isAllCurrentPageSelected} onChange={handleHeaderCheckboxChange} />
									</CoreTable.TableCell>
									{fixedHeaders.map((h) => (
										<CoreTable.TableHeader className={styles.headerCell} key={h.key as string} style={{ width: '320px' }}>
											{h.label}
										</CoreTable.TableHeader>
									))}
								</CoreTable.TableRow>
							</CoreTable.TableHead>
							<CoreTable.TableBody>
								{currentData.map((row) => (
									<CoreTable.TableRow key={row.pk} className={styles.tableBodyRow}>
										<CoreTable.TableCell className={styles.checkBoxBody}>
											<CoreCheckbox checked={selectedItems.has(row.pk)} onChange={() => handleItemCheckboxChange(row.pk)} />
										</CoreTable.TableCell>
										{fixedHeaders.map((h) => (
											<CoreTable.TableCell key={String(h.key)} className={styles.bodyCell} style={{ width: '320px' }}>
												{cellByKey[h.key]?.(row) ?? defaultRender(row, h.key as keyof Influencer)}
											</CoreTable.TableCell>
										))}
									</CoreTable.TableRow>
								))}
							</CoreTable.TableBody>
						</CoreTable.Table>
					</div>


					<div className={styles.scrollArea}>
						<CoreTable.Table size="lg" className={styles.scrollTable}>
							<CoreTable.TableHead className={styles.tableHeaderRow}>
								<CoreTable.TableRow className={styles.tableHeaderRow}>

									{scrollHeaders.map((h, index) => (
										<CoreTable.TableHeader
											className={styles.headerCell}
											key={h.key as string}
											style={{
												width: columnWidths[index] || '120px',
												cursor: h.sortable ? 'pointer' : 'default'
											}}
											onClick={h.sortable ? () => handleHeaderClick(h.key) : undefined}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
												{h.label}
												{h.sortable && getSortDirection(h.key) && (
													<span style={{ fontSize: '12px', color: '#666' }}>
														{getSortDirection(h.key) === 'asc' ? '↑' : '↓'}
													</span>
												)}
											</div>
										</CoreTable.TableHeader>
									))}

								</CoreTable.TableRow>
							</CoreTable.TableHead>
							<CoreTable.TableBody>
								{currentData.map((row) => (
									<CoreTable.TableRow key={row.pk} className={styles.tableBodyRow}>
										{scrollHeaders.map((h, index) => (
											<CoreTable.TableCell
												key={String(h.key)}
												className={styles.bodyCell}
												style={{ width: columnWidths[index] || '120px' }}
											>
												{cellByKey[h.key]?.(row) ?? defaultRender(row, h.key as keyof Influencer)}
											</CoreTable.TableCell>
										))}
									</CoreTable.TableRow>
								))}
							</CoreTable.TableBody>
						</CoreTable.Table>
					</div>
				</div>

				<div className={styles.selectPageNationWrapper}>
					<CoreSelect
						labelElement="/ page"
						size="lg"
						width="120px"
						value={itemsPerPage.toString()}
						secondaryLabel="/ page"
						optionPlacement="top-start"
						setValue={handleSelectChange}
					>
						<CoreSelectItem value="5">5명</CoreSelectItem>
						<CoreSelectItem value="7">7명</CoreSelectItem>
						<CoreSelectItem value="10">10명</CoreSelectItem>
						<CoreSelectItem value="15">15명</CoreSelectItem>

					</CoreSelect>
					<div className={styles.paginationContainer}>
						<CorePagination activePage={currentPage} onPageChange={handlePageChange} totalPage={totalPages} />
					</div>
				</div>


			</CoreTable.Container >
		</div >
	);
}
