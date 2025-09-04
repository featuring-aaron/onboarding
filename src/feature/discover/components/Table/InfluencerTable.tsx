'use client';

import React from 'react';
import { type SortingState } from '@tanstack/react-table';

import { CorePagination, CoreTable, CoreCheckbox, CoreAvatar, CoreTag, CoreSelect, CoreSelectItem, CoreMultiSelectPrim } from '@featuring-corp/components';
import type { Influencer } from '@/types/influencer';

import * as styles from './influencerTable.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';



// 스크롤 컬럼 (나머지 모든 컬럼)
const scrollHeaders: Array<{ label: string; key: keyof Influencer }> = [
	{ label: '카테고리', key: 'categories' },
	{ label: '최근 업로드 일', key: 'last_upload_date' },
	{ label: '팔로워 수', key: 'follower' },
	{ label: '예상 유효 팔로워수', key: 'real_follower' },
	{ label: 'ER', key: 'real_engagement' },
	{ label: '예상 평균 도달 수', key: 'avg_reach' },
	{ label: '평균 피드 좋아요 수', key: 'avg_feed_like' },
	{ label: '평균 동영상 조회 수', key: 'avg_video_views' },
	{ label: '평균 동영상 좋아요 수', key: 'avg_video_likes' },
	{ label: '오디언스 성별', key: 'main_audience_gender' },
	{ label: '오디언스 나이', key: 'main_audience_age_range' },
	{ label: '예상 CPR', key: 'cpr' },
	{ label: '예상 광고비', key: 'avg_ad_cost' },
];

// 각 컬럼의 width 정의
const columnWidths = [
	'150px', // 카테고리
	'120px', // 최근 업로드 일
	'140px', // 팔로워 수
	'160px', // 예상 유효 팔로워수
	'100px', // ER
	'180px', // 예상 평균 도달 수 (더 넓게)
	'160px', // 평균 피드 좋아요 수
	'160px', // 평균 동영상 조회 수
	'160px', // 평균 동영상 좋아요 수
	'120px', // 오디언스 성별
	'120px', // 오디언스 나이
	'120px', // 예상 CPR
	'120px'  // 예상 광고비
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

	categories: (r) => {
		if (!r.categories || (Array.isArray(r.categories) && r.categories.length === 0)) {
			return '-';
		}
		const cats = Array.isArray(r.categories) ? r.categories : [r.categories as unknown as string];
		return (
			<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
				{cats.map((c: string) => (
					<CoreTag key={c} text={c} />
				))}
			</div>
		);
	},

	last_upload_date: (r) => r.last_upload_date ?? '-',
	follower: (r) => r.follower?.toLocaleString() ?? '-',
	real_follower: (r) => r.real_follower?.toLocaleString() ?? '-',
	real_engagement: (r) => r.real_engagement ? r.real_engagement.toFixed(2) + '%' : '-',
	avg_reach: (r) => r.avg_reach?.toLocaleString() ?? '-',
	avg_feed_like: (r) => r.avg_feed_like ? r.avg_feed_like.toFixed(1) : '-',
	avg_video_views: (r) => r.avg_video_views?.toLocaleString() ?? '-',
	avg_video_likes: (r) => r.avg_video_likes?.toLocaleString() ?? '-',
	main_audience_gender: (r) =>
		r.main_audience_gender === 'F' ? '여성' : r.main_audience_gender === 'M' ? '남성' : '-',
	main_audience_age_range: (r) => r.main_audience_age_range ?? '-',
	cpr: (r) => r.cpr?.toLocaleString() ?? '-',
	avg_ad_cost: (r) => r.avg_ad_cost?.toLocaleString() ?? '-',
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
											style={{ width: columnWidths[index] || '120px' }}
										>
											{h.label}
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
