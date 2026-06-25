import {ref} from 'vue';

const useIntersectionObserver = (options) => {
	let visibleElementId = ref('');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				visibleElementId.value = entry.target.id;
			}
		})
	}, options);

	const initObservers = (elementIds) => {
		elementIds.forEach(elementId => {
			const element = document.getElementById(elementId);
			if (element) {
				observer.observe(element);
			}
		});
	}

	const disconnectObserver = () => {
		observer.disconnect();
	}

	return {visibleElementId, initObservers, disconnectObserver};
}

export default useIntersectionObserver;
