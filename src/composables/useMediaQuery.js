import {onMounted, onUnmounted, ref} from 'vue';

const useMediaQuery = (mediaQuery) => {
	const mediaQueryList = window.matchMedia(mediaQuery);
	const isMatch =  ref(mediaQueryList.matches);

	const update = (event) => {
		isMatch.value = event.matches;
	}

	onMounted(() => mediaQueryList.addEventListener('change', update));
	onUnmounted(() => mediaQueryList.removeEventListener('change', update));

	return isMatch;
};

export default useMediaQuery;