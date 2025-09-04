import {
    CoreButton,
    CoreDropdown,
} from '@featuring-corp/components';
import {
    IconSearchOutline,
    IconChevronDownOutline,
    IconCloseOutline,
    IconZoomOutAreaOutline,
} from '@featuring-corp/icons';
import React, { useRef } from 'react';
import * as styles from './KeywordSearchDropdown.css';

interface KeywordSearchDropdownProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function KeywordSearchDropdown({ isOpen, onToggle }: KeywordSearchDropdownProps) {
    const searchRef = useRef(null);

    return (
        <>
            <CoreButton
                ref={searchRef}
                onClick={onToggle}
                prefix={<IconSearchOutline />}
                text="키워드 검색"
                suffix={<IconChevronDownOutline />}
            />
            <CoreDropdown
                placement="bottom-start"
                handler={onToggle}
                open={isOpen}
                width={648}
                height={541}
                children={
                    <div className={styles.modalContentWrapper}>
                        <div className={styles.modalContentBox}>
                            <div className={styles.modalContentHeaderTitleBox}>
                                <IconZoomOutAreaOutline />
                                <div>키워드 관련 인플루언서 검색</div>
                            </div>
                        </div>
                        <CoreButton
                            size="lg"
                            className={styles.closeButton}
                            prefix={<IconCloseOutline />}
                            buttonType="contrast"
                            onClick={onToggle}
                        />
                    </div>
                }
                targetRef={searchRef}
            />
        </>
    );
}
