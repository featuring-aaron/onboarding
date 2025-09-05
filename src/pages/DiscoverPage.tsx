
'use client';

import { useState, useEffect } from 'react';
import { type SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import TableHeader from '../feature/discover/components/Table/TableHeader';
import SnsCategory from '../feature/discover/components/SnsCategory';
import SearchFilterBar from '../feature/discover/components/Filter/SearchFilterBar';
import { InfluencerTable } from '../feature/discover/components/Table/InfluencerTable';
import { Influencer } from '../types/influencer';
import { FilterState } from '../types/filter';
import { getDiscover } from '../pages/api/discovers';

export default function DiscoverPage() {
    const router = useRouter();
    const [data, setData] = useState<Influencer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // URL 쿼리 파라미터에서 현재 페이지를 가져오거나 기본값 1 사용
    const currentPage = parseInt(router.query.page as string, 10) || 1;

    // itemsPerPage 상태를 localStorage에 저장하여 유지
    useEffect(() => {
        const savedItemsPerPage = localStorage.getItem('influencerTableItemsPerPage');
        if (savedItemsPerPage) {
            setItemsPerPage(parseInt(savedItemsPerPage, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('influencerTableItemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    // 필터 상태 관리
    const [filterState, setFilterState] = useState<FilterState>({
        categories: [],
        followerMin: '',
        followerMax: '',
        verified: '전체',
        avgLikeMin: '',
        avgLikeMax: '',
        avgViewMin: '',
        avgViewMax: '',
        erMin: '',
        erMax: '',
        reachMin: '',
        reachMax: '',
    });


    // 필터 적용 함수
    const handleApplyFilters = (newFilterState: FilterState) => {
        setFilterState(newFilterState);
        // 필터 적용 시 첫 페이지로 이동
        router.push({ pathname: router.pathname, query: { ...router.query, page: 1 } }, undefined, { shallow: true });
        // 필터가 변경되면 useEffect에서 자동으로 API를 다시 호출함
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 정렬 상태를 API 파라미터로 변환
                const sortBy = sorting.length > 0 ? sorting[0].id : undefined;
                const order = sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined;

                // 필터 상태를 API 파라미터로 변환
                const apiParams = {
                    page: currentPage,
                    page_size: itemsPerPage,
                    min_follower: filterState.followerMin ? parseInt(filterState.followerMin.replace(/,/g, '')) : undefined,
                    max_follower: filterState.followerMax ? parseInt(filterState.followerMax.replace(/,/g, '')) : undefined,
                    min_avg_feed_like: filterState.avgLikeMin ? parseInt(filterState.avgLikeMin.replace(/,/g, '')) : undefined,
                    max_avg_feed_like: filterState.avgLikeMax ? parseInt(filterState.avgLikeMax.replace(/,/g, '')) : undefined,
                    min_real_engagement: filterState.erMin ? parseFloat(filterState.erMin) / 100 : undefined, // ER은 백분율로 변환
                    max_real_engagement: filterState.erMax ? parseFloat(filterState.erMax) / 100 : undefined, // ER은 백분율로 변환
                    min_avg_video_views: filterState.avgViewMin ? parseInt(filterState.avgViewMin.replace(/,/g, '')) : undefined,
                    max_avg_video_views: filterState.avgViewMax ? parseInt(filterState.avgViewMax.replace(/,/g, '')) : undefined,
                    min_avg_reach: filterState.reachMin ? parseInt(filterState.reachMin.replace(/,/g, '')) : undefined,
                    max_avg_reach: filterState.reachMax ? parseInt(filterState.reachMax.replace(/,/g, '')) : undefined,
                    categories: filterState.categories.length > 0 ? filterState.categories.join(',') : undefined,
                    is_verified: filterState.verified === '전체' ? undefined : filterState.verified === '있음' ? true : false,
                    sort_by: sortBy,
                    order: order,
                };

                const response = await getDiscover(apiParams);

                if (response && response.data) {
                    setData(response.data);
                    setTotalCount(response.total || response.data.length);
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
    }, [router.query.page, filterState, itemsPerPage, sorting]);



    return (
        <>
            <TableHeader />
            <SnsCategory />
            <SearchFilterBar
                filterState={filterState}
                onApplyFilters={handleApplyFilters}
            />
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
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            )}
        </>
    );
}
