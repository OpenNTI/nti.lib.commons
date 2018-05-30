/* eslint-env jest */
import rebase from '../rebase-references.js';

describe('rebase-references', () => {
	describe('params', () => {
		test('changes value if the name is href and the value is a relative url', () => {
			expect(rebase('<param name="href" value="resources/resource" />', 'https://test.nextthought.com'))
				.toMatch(/<param name="href" value="https:\/\/test.nextthought.com\/resources\/resource(.*)/);
		});

		test('leave no href params alone', () => {
			expect(rebase('<param name="type" value="value" />', 'https://test.nextthought.com'))
				.toEqual('<param name="type" value="value" />');
		});

		test('leave href params alone if the value is full qualifies', () => {
			expect(rebase('<param name="href" value="http://www.google.com" />', 'https://test.nextthought.com'))
				.toEqual('<param name="href" value="http://www.google.com" />');
		});

		test('leave href params alone if the value is a NTIID', () => {
			expect(rebase('<param name="href" value="tag:nextthought.com,2011-10:OU-NTICard-OU_BIOL2124_F_2017_Human_Physiology.nticard.nticard_week_glance_011" />', 'https://test.nextthought.com'))
				.toEqual('<param name="href" value="tag:nextthought.com,2011-10:OU-NTICard-OU_BIOL2124_F_2017_Human_Physiology.nticard.nticard_week_glance_011" />');
		});
	});
});
