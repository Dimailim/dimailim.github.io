import {mount} from '@vue/test-utils';

export default function withSetup(composable) {
	let result;

	const Comp = {
		setup() {
			result = composable();
			return () => {};
		}
	};
	const wrapper = mount(Comp);

	return {result, wrapper};
}