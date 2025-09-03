'use client';

import { type SortingState } from '@tanstack/react-table';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { CoreTable } from '@featuring-corp/components';
import type { Influencer } from '../../../../types/influencer';

import * as styles from './influencerTable.css';

// 1) 헤더 정의: key만 맞추면 됨
const headers: Array<{ label: string; key: keyof Influencer }> = [
	{ label: '계정', key: 'full_name' },
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

// 2) key → 셀 렌더러 매핑
const cellByKey: Partial<Record<keyof Influencer, (row: Influencer) => React.ReactNode>> = {
	full_name: (r) => (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
			<Avatar>
				<AvatarImage src={r.profile_img_link} alt={r.full_name} />
				<AvatarFallback>{r.username.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
			<div>
				<div style={{ fontWeight: 'bold' }}>{r.full_name}</div>
				<div style={{ fontSize: 12, color: '#666' }}>@{r.username}</div>
			</div>
		</div>
	),

	categories: (r) => {
		const cats = Array.isArray(r.categories) ? r.categories : [r.categories as unknown as string];
		return (
			<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
				{cats.map((c) => (
					<Badge key={c}>{c}</Badge>
				))}
			</div>
		);
	},

	last_upload_date: (r) => r.last_upload_date ?? '-',
	follower: (r) => r.follower.toLocaleString(),
	real_follower: (r) => r.real_follower.toLocaleString(),
	real_engagement: (r) => r.real_engagement.toFixed(1),
	avg_reach: (r) => r.avg_reach.toLocaleString(),
	avg_feed_like: (r) => r.avg_feed_like.toFixed(1),
	avg_video_views: (r) => r.avg_video_views?.toLocaleString() ?? '-',
	avg_video_likes: (r) => r.avg_video_likes?.toLocaleString() ?? '-',
	main_audience_gender: (r) =>
		r.main_audience_gender === 'F' ? '여성' : r.main_audience_gender === 'M' ? '남성' : '-',
	main_audience_age_range: (r) => r.main_audience_age_range ?? '-',
	cpr: (r) => r.cpr?.toLocaleString() ?? '-',
	avg_ad_cost: (r) => r.avg_ad_cost?.toLocaleString() ?? '-',
};

// 3) 기본/폴백 렌더러 (특별한 포맷 없을 때)
function defaultRender<T extends keyof Influencer>(row: Influencer, key: T) {
	const v = row[key] as unknown;
	if (v == null) return '-';
	if (typeof v === 'number') return v.toString();
	if (Array.isArray(v)) return v.join(', ');
	return String(v);
}

interface InfluencerTableProps {
	data: Influencer[];
	sorting: SortingState;
	onSortingChange: (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => void;
}

export function InfluencerTable({ data }: InfluencerTableProps) {
	return (
		<CoreTable.Container style={{ width: '100%' }}>
			<CoreTable.Table size="sm">
				<CoreTable.TableHead>
					<CoreTable.TableRow>
						{headers.map((h) => (
							<CoreTable.TableHeader key={h.key}>{h.label}</CoreTable.TableHeader>
						))}
					</CoreTable.TableRow>
				</CoreTable.TableHead>

				<CoreTable.TableBody>
					{data.map((row) => (
						<CoreTable.TableRow key={row.pk} className={styles.tableRow}>
							{headers.map((h) => (
								<CoreTable.TableCell key={String(h.key)} className={styles.tableCell}>
									{cellByKey[h.key]?.(row) ?? defaultRender(row, h.key as keyof Influencer)}
								</CoreTable.TableCell>
							))}
						</CoreTable.TableRow>
					))}
				</CoreTable.TableBody>
			</CoreTable.Table>
		</CoreTable.Container>
	);
}
