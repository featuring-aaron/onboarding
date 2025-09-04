'use client';

import { useState, useEffect } from 'react';
import { type SortingState } from '@tanstack/react-table';
import TableHeader from './components/TableHeader';
import SnsCategory from './components/SnsCategory';
import SearchFilterBar from './components/SearchFilterBar';
import { InfluencerTable } from './components/InfluencerTable';
import { Influencer } from '../../types/influencer';
import { getDiscover } from '../../pages/api/discovers';	

export default function DiscoverPage() {
	const [data, setData] = useState<Influencer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				
				const response = await getDiscover();
			
				if (response && response.data) {
					setData(response.data);
					
					setTotalCount(response.pageSize);
					
				} else {
					setError('데이터를 불러올 수 없습니다.');
				}
			} catch (err) {
				console.error('데이터 로딩 실패:', err);
				setError('데이터를 불러오는 중 오류가 발생했습니다.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [currentPage]);



	return (
		<>
			<TableHeader />
			<SnsCategory />
			<SearchFilterBar />
			{loading ? (
				<div style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					height: '200px',
					fontSize: '16px',
					color: '#666'
				}}>
					데이터를 불러오는 중...
				</div>
			) : error ? (
				<div style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					height: '200px',
					fontSize: '16px',
					color: '#ff4444'
				}}>
					{error}
				</div>
			) : (
				<InfluencerTable 
					data={data} 
					sorting={sorting} 
					onSortingChange={setSorting}
					totalCount={totalCount}
					currentPage={currentPage}
				
				/>
			)}
		</>
	);
}
