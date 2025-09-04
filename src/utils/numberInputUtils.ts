// 숫자 포맷팅 유틸리티 함수들
export const formatNumberWithCommas = (value: string): string => {
	// 숫자가 아닌 문자 제거
	const numbersOnly = value.replace(/[^0-9]/g, '');
	// 3자리마다 콤마 추가
	return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommas = (value: string): string => {
	return value.replace(/,/g, '');
};

export const handleNumberInput = (value: string, setter: (value: string) => void) => {
	const formatted = formatNumberWithCommas(value);
	setter(formatted);
};