import jsx from './prism-jsx.js';
import typescript from './prism-typescript.js';

export default /** @type {import("../types").LanguageProto} */ ({
	id: 'tsx',
	require: [jsx, typescript],
	grammar({ extend }) {
		let typescript = extend('typescript', {});
		const tsx = extend('jsx', typescript);

		// doesn't work with TS because TS is too complex
		delete tsx['parameter'];
		delete tsx['literal-property'];

		// This will prevent collisions between TSX tags and TS generic types.
		// Idea by https://github.com/karlhorky
		// Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928
		let tag = /** @type {import('../types').GrammarToken} */ (tsx.tag);
		tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + '(?:' + tag.pattern.source + ')', tag.pattern.flags);
		tag.lookbehind = true;

		return tsx;
	}
});
