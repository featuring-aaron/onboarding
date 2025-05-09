import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * components:
 *  schemas:
 *   Discover_Influencer:
 *    type: object
 *    properties:
 *      pk:
 *        type: string
 *        description: 인플루언서의 고유 ID
 *        example: user_10001
 *      username:
 *        type: string
 *        description: 인플루언서의 username
 *        example: user_10001
 *      full_name:
 *        type: string
 *        description: 인플루언서의 full name
 *        example: 인플루언서 10001
 *      account_link:
 *        type: string
 *        description: 인플루언서의 계정 링크
 *        example: https://instagram.com/user_1
 *      profile_img_link:
 *        type: string
 *        description: 인플루언서의 프로필 이미지 링크
 *        example: https://placehold.co/80x80?text=1
 *      follower:
 *        type: number
 *        description: 팔로워 수
 *        example: 12345
 *      real_follower:
 *        type: number
 *        description: 실제 팔로워 수
 *        example: 10000
 *      avg_feed_like:
 *        type: number
 *        description: 평균 피드 좋아요 수
 *        example: 123.4
 *      avg_reach:
 *        type: number
 *        description: 평균 도달 수
 *        example: 5000
 *      real_engagement:
 *        type: number
 *        description: 실제 참여율
 *        example: 0.123
 *      main_audience_gender:
 *        type: string
 *        description: 주요 오디언스 성별
 *        example: F
 *        enum: [F, M]
 *      main_audience_age_range:
 *        type: string
 *        description: 주요 오디언스 연령대
 *        example: 18-24
 *        enum: [18-24, 25-34, 35-44]
 *      is_verified:
 *        type: boolean
 *        description: 메타 인증 여부
 *        example: true
 */
type Discover_Influencer = {
	pk: string;
	username: string;
	full_name: string;
	account_link: string;
	profile_img_link: string;
	follower: number;
	real_follower: number;
	avg_feed_like: number;
	avg_reach: number;
	real_engagement: number;
	main_audience_gender: 'F' | 'M' | null;
	main_audience_age_range: string | null;
	is_verified: boolean;
};

const MOCK_DATA: Discover_Influencer[] = Array.from({ length: 465 }, (_, i) => ({
	pk: `user_${10001 + i}`,
	username: `user_${10001 + i}`,
	full_name: `인플루언서 ${10001 + i}`,
	account_link: `https://www.instagram.com/featuring.official`,
	profile_img_link: `https://placehold.co/80x80?text=${10001 + i}`,
	follower: Math.floor(Math.random() * 50000 + 1000),
	real_follower: Math.floor(Math.random() * 10000),
	avg_feed_like: Math.random() * 300,
	avg_reach: Math.floor(Math.random() * 10000),
	real_engagement: Number(((Math.random() * 300) / 10000).toFixed(3)),
	main_audience_gender: i % 2 === 0 ? 'F' : 'M',
	main_audience_age_range: ['18-24', '25-34', '35-44'][i % 3],
	is_verified: i % 4 === 0,
}));

/**
 * @swagger
 * /api/discover:
 *  get:
 *    summary: 인플루언서 검색 API
 *    tags:
 *      - Discover
 *    parameters:
 *      - name: page
 *        in: query
 *        description: 페이지 번호
 *        required: false
 *        default: 1
 *        schema:
 *          type: integer
 *      - name: page_size
 *        in: query
 *        description: 페이지 크기
 *        required: false
 *        default: 20
 *        schema:
 *          type: integer
 *      - name: min_follower
 *        in: query
 *        description: 최소 팔로워 수
 *        required: false
 *        schema:
 *          type: integer
 *      - name: max_follower
 *        in: query
 *        description: 최대 팔로워 수
 *        required: false
 *        schema:
 *          type: integer
 *      - name: main_audience_gender
 *        in: query
 *        description: 주요 오디언스 성별
 *        required: false
 *        schema:
 *          type: string
 *          enum: [F, M]
 *      - name: main_audience_age_range
 *        in: query
 *        description: 주요 오디언스 연령대
 *        required: false
 *        schema:
 *          type: string
 *          enum: [18-24, 25-34, 35-44]
 *      - name: is_verified
 *        in: query
 *        description: 메타 인증 여부
 *        required: false
 *        schema:
 *          type: boolean
 *      - name: sort_by
 *        in: query
 *        description: 정렬 기준
 *        required: false
 *        schema:
 *          type: string
 *          enum: [follower, real_follower, avg_feed_like, avg_reach, real_engagement]
 *      - name: order
 *        in: query
 *        description: 정렬 방식
 *        required: false
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *    responses:
 *      200:
 *        description: 인플루언서 목록을 가져옵니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                total:
 *                  type: integer
 *                page:
 *                  type: integer
 *                pageSize:
 *                  type: integer
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Discover_Influencer'
 *      400:
 *        description: 잘못된 파라미터 등 클라이언트 오류
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: 에러 메시지
 */
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		{ data: Discover_Influencer[]; total: number; page: number; pageSize: number } | { error: string }
	>,
) {
	const {
		page = '1',
		page_size = '20',
		min_follower,
		max_follower,
		main_audience_gender,
		main_audience_age_range,
		is_verified,
		sort_by,
		order,
	} = req.query;

	// Parameter validation
	const allowedGenders = ['F', 'M'];
	const allowedAgeRanges = ['18-24', '25-34', '35-44'];
	const allowedSortBy = [
		'follower',
		'real_follower',
		'avg_feed_like',
		'avg_reach',
		'real_engagement',
		'main_audience_gender',
		'main_audience_age_range',
		'is_verified',
	];
	const allowedOrder = ['asc', 'desc'];

	// page, page_size validation
	if (isNaN(Number(page)) || Number(page) < 1) {
		return res.status(400).json({ error: 'Invalid page parameter. Must be a positive integer.' });
	}
	if (isNaN(Number(page_size)) || Number(page_size) < 1) {
		return res.status(400).json({ error: 'Invalid page_size parameter. Must be a positive integer.' });
	}

	// min_follower, max_follower validation
	if (min_follower !== undefined && (isNaN(Number(min_follower)) || Number(min_follower) < 0)) {
		return res.status(400).json({ error: 'Invalid min_follower parameter. Must be a non-negative integer.' });
	}
	if (max_follower !== undefined && (isNaN(Number(max_follower)) || Number(max_follower) < 0)) {
		return res.status(400).json({ error: 'Invalid max_follower parameter. Must be a non-negative integer.' });
	}
	// main_audience_gender validation
	if (
		main_audience_gender !== undefined &&
		(typeof main_audience_gender !== 'string' || !allowedGenders.includes(main_audience_gender))
	) {
		return res
			.status(400)
			.json({ error: `Invalid main_audience_gender parameter. Allowed values: ${allowedGenders.join(', ')}` });
	}
	// main_audience_age_range validation
	if (
		main_audience_age_range !== undefined &&
		(typeof main_audience_age_range !== 'string' || !allowedAgeRanges.includes(main_audience_age_range))
	) {
		return res
			.status(400)
			.json({ error: `Invalid main_audience_age_range parameter. Allowed values: ${allowedAgeRanges.join(', ')}` });
	}
	// is_verified validation
	if (is_verified !== undefined && is_verified !== 'true' && is_verified !== 'false') {
		return res.status(400).json({ error: "Invalid is_verified parameter. Allowed values: 'true', 'false'" });
	}
	// sort_by validation
	if (sort_by !== undefined && (typeof sort_by !== 'string' || !allowedSortBy.includes(sort_by))) {
		return res.status(400).json({ error: `Invalid sort_by parameter. Allowed values: ${allowedSortBy.join(', ')}` });
	}
	// order validation
	if (order !== undefined && (typeof order !== 'string' || !allowedOrder.includes(order))) {
		return res.status(400).json({ error: `Invalid order parameter. Allowed values: ${allowedOrder.join(', ')}` });
	}

	let result = [...MOCK_DATA];

	// Filtering
	if (min_follower && !isNaN(+min_follower)) {
		result = result.filter((i) => i.follower >= +min_follower);
	}
	if (max_follower && !isNaN(+max_follower)) {
		result = result.filter((i) => i.follower <= +max_follower);
	}
	if (main_audience_gender && typeof main_audience_gender === 'string') {
		result = result.filter((i) => i.main_audience_gender === main_audience_gender);
	}
	if (main_audience_age_range && typeof main_audience_age_range === 'string') {
		result = result.filter((i) => i.main_audience_age_range === main_audience_age_range);
	}
	if (is_verified === 'true') {
		result = result.filter((i) => i.is_verified);
	}

	// Sorting
	result.sort((a, b) => {
		const key = sort_by as keyof Discover_Influencer;
		const aVal = a[key] ?? 0;
		const bVal = b[key] ?? 0;
		return order === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
	});

	// Pagination
	const pageNum = +page;
	const size = +page_size;
	const start = (pageNum - 1) * size;
	const data = result.slice(start, start + size);

	res.status(200).json({
		total: result.length,
		page: pageNum,
		pageSize: size,
		data,
	});
}
