import {
    CoreButton,
    CoreMultiSelectPrim,
    CoreCheckbox,
    CoreTooltip,
    CoreTextInput,
    CoreSegmentedControl,
    CoreSegmentedControlGroup,
} from '@featuring-corp/components';
import {
    IconUserCircleOutline,
    IconInformationFilled,
} from '@featuring-corp/icons';
import * as styles from './InfluencerInfoSection.css';
import { sprinkles } from '@/styles/sprinkles.css';
import React, { useState, useEffect } from 'react';
import { handleNumberInput } from '@/utils/numberInputUtils';
import { FilterState } from '@/types/filter';

interface InfluencerInfoSectionProps {
    filterState: FilterState;
    onFilterChange: (filterState: FilterState) => void;
    onGetCurrentState?: React.MutableRefObject<(() => Partial<FilterState>) | undefined>;
}

export default function InfluencerInfoSection({ filterState, onFilterChange, onGetCurrentState }: InfluencerInfoSectionProps) {
    // 로컬 상태 관리
    const [followerMin, setFollowerMin] = useState(filterState.followerMin);
    const [followerMax, setFollowerMax] = useState(filterState.followerMax);
    const [verified, setVerified] = useState(filterState.verified);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filterState.categories);

    // 필터 상태가 변경될 때 로컬 상태 동기화
    useEffect(() => {
        setFollowerMin(filterState.followerMin);
        setFollowerMax(filterState.followerMax);
        setVerified(filterState.verified);
        setSelectedCategories(filterState.categories);
    }, [filterState]);

    const handleFollowerRangeClick = (min: string, max: string) => {
        setFollowerMin(min);
        setFollowerMax(max);
    };

    const handleVerifiedChange = (value: '전체' | '없음' | '있음') => {
        setVerified(value);
    };

    const handleCategoryChange = (value: string) => {
        // CoreMultiSelectPrim의 onValueChange는 string을 받지만, 
        // 실제로는 선택된 값들의 배열을 관리해야 합니다.
        // 이 부분은 컴포넌트의 실제 동작에 따라 조정이 필요할 수 있습니다.
        const newCategories = selectedCategories.includes(value)
            ? selectedCategories.filter(cat => cat !== value)
            : [...selectedCategories, value];
        setSelectedCategories(newCategories);
    };

    const updateFilterState = (newFilterState: FilterState) => {
        onFilterChange(newFilterState);
    };

    // 현재 로컬 상태를 반환하는 함수
    const getCurrentState = () => ({
        categories: selectedCategories,
        followerMin,
        followerMax,
        verified,
    });

    // 부모 컴포넌트에서 현재 상태를 가져올 수 있도록 함수 등록
    React.useEffect(() => {
        if (onGetCurrentState) {
            onGetCurrentState.current = getCurrentState;
        }
    }, [selectedCategories, followerMin, followerMax, verified]);
    return (
        <div className={styles.modalContentBox}>
            <div className={styles.modalContentHeaderTitleBox}>
                <IconUserCircleOutline />
                <div>인플루언서 정보</div>
            </div>
            <CoreMultiSelectPrim.Root
                width="100%"
                value={selectedCategories}
                onValueChange={handleCategoryChange}
            >
                <CoreMultiSelectPrim.Label tooltip="tooltip">
                    카테고리
                </CoreMultiSelectPrim.Label>
                <CoreMultiSelectPrim.Trigger>
                    <CoreMultiSelectPrim.Value valueWrap />
                </CoreMultiSelectPrim.Trigger>
                <CoreMultiSelectPrim.Portal>
                    <CoreMultiSelectPrim.Content>
                        <CoreMultiSelectPrim.Item value="짤/밈">
                            {(selected) => <CoreCheckbox checked={selected} label="짤/밈" />}
                        </CoreMultiSelectPrim.Item>
                        <CoreMultiSelectPrim.Item value="문화/종교/역사">
                            {(selected) => <CoreCheckbox checked={selected} label="문화/종교/역사" />}
                        </CoreMultiSelectPrim.Item>
                        <CoreMultiSelectPrim.Item value="영화/방송">
                            {(selected) => <CoreCheckbox checked={selected} label="영화/방송" />}
                        </CoreMultiSelectPrim.Item>
                        <CoreMultiSelectPrim.Item value="미술/디자인">
                            {(selected) => <CoreCheckbox checked={selected} label="미술/디자인" />}
                        </CoreMultiSelectPrim.Item>
                        <CoreMultiSelectPrim.Item value="음악/댄스">
                            {(selected) => <CoreCheckbox checked={selected} label="음악/댄스" />}
                        </CoreMultiSelectPrim.Item>
                        <CoreMultiSelectPrim.Item value="고양이">
                            {(selected) => <CoreCheckbox checked={selected} label="고양이" />}
                        </CoreMultiSelectPrim.Item>
                    </CoreMultiSelectPrim.Content>
                </CoreMultiSelectPrim.Portal>
            </CoreMultiSelectPrim.Root>
            <div style={{ width: '100%' }}>
                <div className={styles.tooltipContainer}>
                    팔로워 수
                    <CoreTooltip
                        eventType="hover"
                        autoAdjust
                        text="툴팁 텍스트 입니다."
                        title="타이틀"
                    >
                        <IconInformationFilled color="var(--global-colors-gray-50)" />
                    </CoreTooltip>
                </div>
                <div className={styles.followerRangeContainer}>
                    <CoreButton
                        buttonType='tertiary'
                        width={120}
                        text="1천 ~ 1만"
                        onClick={() => handleFollowerRangeClick('1,000', '10,000')}
                    />
                    <CoreButton
                        buttonType='tertiary'
                        className={styles.followerRangeButton}
                        text="1만 ~ 10만"
                        onClick={() => handleFollowerRangeClick('10,000', '100,000')}
                    />
                    <CoreButton
                        buttonType='tertiary'
                        width={120}
                        text="10만 ~ 100만"
                        onClick={() => handleFollowerRangeClick('100,000', '1,000,000')}
                    />
                    <CoreButton
                        buttonType='tertiary'
                        className={styles.followerRangeButton}
                        text="100만 이상"
                        onClick={() => handleFollowerRangeClick('1,000,000', '2,000,000,000')}
                    />
                </div>
                <div className={styles.inputRangeContainer} style={{ marginTop: '12px' }}>
                    <CoreTextInput
                        value={followerMin}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            handleNumberInput(newValue, setFollowerMin);
                        }}
                        placeholder="부터"
                    />
                    <span className={styles.rangeSeparator}>~</span>
                    <CoreTextInput
                        value={followerMax}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            handleNumberInput(newValue, setFollowerMax);
                        }}
                        placeholder="까지"
                    />
                </div>

            </div>
            <CoreMultiSelectPrim.Label tooltip="tooltip">
                인증 배지 유무
            </CoreMultiSelectPrim.Label>
            <CoreSegmentedControlGroup style={{ width: '100%', justifyContent: 'space-between' }} >

                <CoreSegmentedControl
                    className={styles.segmentedControlBox}
                    key="전체"
                    value="전체"
                    children="전체"
                    selected={verified === '전체'}
                    onClick={() => handleVerifiedChange('전체')}
                />
                <CoreSegmentedControl
                    className={styles.segmentedControlBox}
                    key="없음"
                    value="없음"
                    children="없음"
                    selected={verified === '없음'}
                    onClick={() => handleVerifiedChange('없음')}
                />
                <CoreSegmentedControl
                    className={styles.segmentedControlBox}
                    key="있음"
                    value="있음"
                    children="있음"
                    selected={verified === '있음'}
                    onClick={() => handleVerifiedChange('있음')}
                />

            </CoreSegmentedControlGroup>



        </div>
    );
}
