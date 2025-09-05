import {
    CoreTextInput,
    CoreTooltip,
} from '@featuring-corp/components';
import {
    IconUserCircleOutline,
    IconInformationFilled,
} from '@featuring-corp/icons';
import * as styles from './ContentMetricsSection.css';
import React, { useState, useEffect } from 'react';
import { handleNumberInput } from '@/utils/numberInputUtils';
import { FilterState } from '@/types/filter';

interface ContentMetricsSectionProps {
    filterState: FilterState;
    onFilterChange: (filterState: FilterState) => void;
    onGetCurrentState?: React.MutableRefObject<(() => Partial<FilterState>) | undefined>;
}

export default function ContentMetricsSection({ filterState, onFilterChange, onGetCurrentState }: ContentMetricsSectionProps) {
    // 로컬 상태 관리
    const [avgLikeMin, setAvgLikeMin] = useState(filterState.avgLikeMin);
    const [avgLikeMax, setAvgLikeMax] = useState(filterState.avgLikeMax);
    const [avgViewMin, setAvgViewMin] = useState(filterState.avgViewMin);
    const [avgViewMax, setAvgViewMax] = useState(filterState.avgViewMax);
    const [erMin, setErMin] = useState(filterState.erMin);
    const [erMax, setErMax] = useState(filterState.erMax);
    const [reachMin, setReachMin] = useState(filterState.reachMin);
    const [reachMax, setReachMax] = useState(filterState.reachMax);

    // 필터 상태가 변경될 때 로컬 상태 동기화
    useEffect(() => {
        setAvgLikeMin(filterState.avgLikeMin);
        setAvgLikeMax(filterState.avgLikeMax);
        setAvgViewMin(filterState.avgViewMin);
        setAvgViewMax(filterState.avgViewMax);
        setErMin(filterState.erMin);
        setErMax(filterState.erMax);
        setReachMin(filterState.reachMin);
        setReachMax(filterState.reachMax);
    }, [filterState]);

    const updateFilterState = (newFilterState: FilterState) => {
        onFilterChange(newFilterState);
    };

    // 현재 로컬 상태를 반환하는 함수
    const getCurrentState = () => ({
        avgLikeMin,
        avgLikeMax,
        avgViewMin,
        avgViewMax,
        erMin,
        erMax,
        reachMin,
        reachMax,
    });

    // 부모 컴포넌트에서 현재 상태를 가져올 수 있도록 함수 등록
    React.useEffect(() => {
        if (onGetCurrentState) {
            onGetCurrentState.current = getCurrentState;
        }
    }, [avgLikeMin, avgLikeMax, avgViewMin, avgViewMax, erMin, erMax, reachMin, reachMax]);
    return (
        <div className={styles.modalContentBox}>
            <div className={styles.modalContentHeaderTitleBox}>
                <IconUserCircleOutline />
                <div>콘텐츠 지표</div>
            </div>
            <div className={styles.inputRangeContainer}>
                <CoreTextInput
                    label="평균 동영상 좋아요 수"
                    value={avgLikeMin}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setAvgLikeMin);
                    }}
                    placeholder="부터"
                />
                <span className={styles.rangeSeparator}>~</span>
                <CoreTextInput
                    value={avgLikeMax}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setAvgLikeMax);
                    }}
                    placeholder="까지"
                />
            </div>
            <div className={styles.inputRangeContainer}>
                <CoreTextInput
                    label="평균 동영상 조회 수"
                    value={avgViewMin}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setAvgViewMin);
                    }}
                    placeholder="부터"
                />
                <span className={styles.rangeSeparator}>~</span>
                <CoreTextInput
                    value={avgViewMax}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setAvgViewMax);
                    }}
                    placeholder="까지"
                />
            </div>
            <div className={styles.inputRangeContainer}>
                <CoreTextInput
                    label="ER(%)"
                    value={erMin}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setErMin);
                    }}
                    placeholder="부터"
                />
                <span className={styles.rangeSeparator}>~</span>
                <CoreTextInput
                    value={erMax}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setErMax);
                    }}
                    placeholder="까지"
                />
            </div>
            <div className={styles.inputRangeContainer}>
                <CoreTextInput
                    label="예상 평균 도달 수"
                    value={reachMin}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setReachMin);
                    }}
                    placeholder="부터"
                    labelElement={
                        <CoreTooltip text="It's Label Element">
                            <IconInformationFilled color="var(--global-colors-gray-50)" />
                        </CoreTooltip>
                    }
                />
                <span className={styles.rangeSeparator}>~</span>
                <CoreTextInput
                    value={reachMax}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleNumberInput(newValue, setReachMax);
                    }}
                    placeholder="까지"
                    labelElement={
                        <CoreTooltip text="It's Label Element">
                            <IconInformationFilled color="var(--global-colors-gray-50)" />
                        </CoreTooltip>
                    }
                />
            </div>
        </div>
    );
}
