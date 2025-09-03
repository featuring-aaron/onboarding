'use client';

import { useState, useEffect } from 'react';
import { type SortingState } from '@tanstack/react-table';
import TableHeader from './components/TableHeader';
import SnsCategory from './components/SnsCategory';
import SearchFilterBar from './components/SearchFilterBar';
import { InfluencerTable } from './components/InfluencerTable';
import { Influencer } from '../../../types/influencer';

export default function DiscoverPage() {
	const [data, setData] = useState<Influencer[]>([]);
	const [loading, setLoading] = useState(true);
	const [sorting, setSorting] = useState<SortingState>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/discover?page=1&page_size=10');
				const result = await response.json();
				setData(result.data);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<TableHeader />
			<SnsCategory />
			<SearchFilterBar />
			<InfluencerTable data={data} sorting={sorting} onSortingChange={setSorting} />
		</>
	);
}
