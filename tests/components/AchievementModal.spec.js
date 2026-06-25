import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import AchievementModal from '@/components/AchievementModal.vue';

describe('AchievementModal component', () => {
  const achievementModalMount = (locale = 'en', fakeItem, showScreenshots = false) => mount(AchievementModal, {
	  props: {
		selectedItem: fakeItem,
		showScreenshots: showScreenshots
	  },
	  global: {
		  plugins: [createTestI18n(locale)],
	  }
  });
  const fakeItem = {
		title: 'Test project',
		tags: ['Vue', 'TS'],
		fullDesc: ['First line.', 'Second line.']
	};

  it('should display achievement modal', () => {
	  const wrapper = achievementModalMount('en', fakeItem);

	  expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	  expect(wrapper.find('h3').text()).toBe(fakeItem.title);
	  expect(wrapper.findAll('.achievement-card__tag').length).toBe(fakeItem.tags.length);
	  expect(wrapper.findAll('.modal-full-desc').length).toBe(fakeItem.fullDesc.length);
	  expect(wrapper.find('.modal-gallery').exists()).toBe(false);
	  expect(wrapper.find('.modal-links').exists()).toBe(false);
	  expect(wrapper.find('.links-title').exists()).toBe(false);
  });

  it('should close modal window by button', async () => {
	  const wrapper = achievementModalMount('en', fakeItem);

	  expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	  // Close window.
	  const closeHeaderButton = wrapper.find('.modal-close');
	  await closeHeaderButton.trigger('click');
	  expect(wrapper.emitted('closeModal')).toHaveLength(1);
  });

  it('should close modal window by clicking footer close button', async () => {
	  const wrapper = achievementModalMount('en', fakeItem);

	  expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	  const closeFooterButton = wrapper.find('.modal-footer-close');
	  await closeFooterButton.trigger('click');
	  expect(wrapper.emitted('closeModal')).toHaveLength(1);
  });

  it('should close modal window by clicking overlay area', async () => {
	  const wrapper = achievementModalMount('en', fakeItem);

	  expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	  const overlayElem = wrapper.find('.modal-overlay');
	  await overlayElem.trigger('click');
	  expect(wrapper.emitted('closeModal')).toHaveLength(1);
  });

	it('should NOT close when clicking inside modal container', async () => {
		const wrapper = achievementModalMount('en', fakeItem);
		await wrapper.find('.modal-container').trigger('click');
		expect(wrapper.emitted('closeModal')).toBeFalsy();
	});

  it('modal-overlay should doesn\'t exist because of null item', () => {
	  const emptyItem = null;
	  const wrapper = achievementModalMount('en', emptyItem);

	  expect(wrapper.find('.modal-overlay').exists()).toBe(false);
  });

  it('modal window with screenshot section', async () => {
	 const fakeItemWithScreenshot = {
		 title: 'Test project with screenshot',
		 tags: ['Vue', 'TS'],
		 fullDesc: ['First line.', 'Second line.'],
		 screenshots: [
			  {
		  		"src": "./images/test-screenshot.png",
		  		"alt": "Test screenshot"
			  }
		 ]
	 };

	 const wrapper = achievementModalMount('en', fakeItemWithScreenshot, true);

	 expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	 const screenshotSection = wrapper.find('.modal-gallery');
	 expect(screenshotSection.exists()).toBe(true);
	 const screenshotItems = wrapper.findAll('.modal-gallery__item');
	 expect(screenshotItems.length).toBe(fakeItemWithScreenshot.screenshots.length);

	 // Check expandScreenshot emit
	  const screenshotSpoilerButton = wrapper.find('.modal-spoiler-btn');
	  await screenshotSpoilerButton.trigger('click');
	  expect(wrapper.emitted('toggleScreenshots')).toHaveLength(1);
  });

  it('modal window with commit section',  () => {
	  const fakeItemWithCommitSection = {
		  title: 'Test project with commit',
		  tags: ['Vue', 'TS'],
		  fullDesc: ['First line.', 'Second line.'],
		  commit_title: 'Here you can find a commit',
		  commit_links: [
			  {
				  url: "https://test.com",
				  alt: "Test commit link"
			  }
		  ]
	  };

	  const wrapper = achievementModalMount('en', fakeItemWithCommitSection);
	  expect(wrapper.find('.modal-overlay').exists()).toBe(true);
	  expect(wrapper.find('.links-title').text()).toBe(fakeItemWithCommitSection.commit_title);
	  expect(wrapper.find('.modal-links').exists()).toBe(true);
	  expect(wrapper.findAll('.modal-link-btn').length).toBe(fakeItemWithCommitSection.commit_links.length);
  });
});
