import {
    CoreButton,
    CoreDropdown,
} from '@featuring-corp/components';
import {
    IconTuneOutline,
    IconChevronDownOutline,
    IconCloseOutline,
    IconUserCircleOutline,
} from '@featuring-corp/icons';
import React, { useRef, useState, useEffect } from 'react';
import * as styles from './AdvancedFilterDropdown.css';
import InfluencerInfoSection from './InfluencerInfoSection';
import ContentMetricsSection from './ContentMetricsSection';
import { sprinkles } from '@/styles/sprinkles.css';
import { FilterState } from '@/types/filter';

interface AdvancedFilterDropdownProps {
    isOpen: boolean;
    onToggle: () => void;
    filterState: FilterState;
    onApplyFilters: (filterState: FilterState) => void;
}

export default function AdvancedFilterDropdown({
    isOpen,
    onToggle,
    filterState,
    onApplyFilters,
}: AdvancedFilterDropdownProps) {
    const filterRef = useRef(null);

    // 로컬 필터 상태 관리
    const [localFilterState, setLocalFilterState] = useState<FilterState>(filterState);

    // 하위 컴포넌트들의 현재 상태를 가져오는 ref
    const influencerInfoRef = useRef<() => Partial<FilterState>>();
    const contentMetricsRef = useRef<() => Partial<FilterState>>();

    // 외부 필터 상태가 변경될 때 로컬 상태 동기화
    useEffect(() => {
        setLocalFilterState(filterState);
    }, [filterState]);

    const handleApplyFilter = () => {
        // 하위 컴포넌트들의 현재 상태를 가져와서 합치기
        const influencerInfoState = influencerInfoRef.current?.() || {};
        const contentMetricsState = contentMetricsRef.current?.() || {};

        const finalFilterState: FilterState = {
            ...localFilterState,
            ...influencerInfoState,
            ...contentMetricsState,
        };

        onApplyFilters(finalFilterState);
        onToggle(); // 필터 적용 후 드롭다운 닫기
    };

    const handleLocalFilterChange = (newFilterState: FilterState) => {
        setLocalFilterState(newFilterState);
    };

    return (
        <>
            <CoreButton
                ref={filterRef}
                buttonType="tertiary"
                onClick={onToggle}
                prefix={<IconTuneOutline />}
                text="고급 필터 설정"
                suffix={<IconChevronDownOutline />}
            />
            <CoreDropdown
                placement="bottom-start"
                handler={onToggle}
                open={isOpen}
                width={900}
                height={541}
                padding={0}
                children={
                    <div>
                        <div className={styles.modalContentWrapper}>

                            <CoreButton
                                size="lg"
                                className={styles.closeButton}
                                prefix={<IconCloseOutline size={32} />}
                                buttonType="contrast"
                                onClick={onToggle}
                            />
                            <InfluencerInfoSection
                                filterState={localFilterState}
                                onFilterChange={handleLocalFilterChange}
                                onGetCurrentState={influencerInfoRef}
                            />
                            <ContentMetricsSection
                                filterState={localFilterState}
                                onFilterChange={handleLocalFilterChange}
                                onGetCurrentState={contentMetricsRef}
                            />
                            <div className={styles.modalContentBox}>
                                <div className={styles.modalContentHeaderTitleBox}>
                                    <IconUserCircleOutline />
                                    <div>오디언스</div>
                                </div>
                            </div>

                        </div>
                        <div
                            className={sprinkles({ paddingX: 'spacing-600', paddingY: 'spacing-400' })}
                            style={{ display: 'flex', height: '91px', justifyContent: 'end', gap: '10px', alignItems: 'center' }}>
                            <CoreButton
                                size="lg"
                                text="취소"
                                buttonType="tertiary"
                                onClick={onToggle}
                            />
                            <CoreButton
                                size="lg"
                                text="필터 적용"
                                onClick={handleApplyFilter}
                            />
                        </div>
                    </div>
                }
                targetRef={filterRef}
            />
        </>
    );
}
