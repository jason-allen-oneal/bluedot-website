/** @type {import('postcss-load-config').Config} */
const stripPropertyAtRule = () => ({
  postcssPlugin: 'strip-property-at-rule',
  AtRule(atRule) {
    if (atRule.name === 'property') {
      atRule.remove();
    }
  },
});
stripPropertyAtRule.postcss = true;

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // LightningCSS warns on @property (used by daisyUI radial progress). Strip it to silence build warnings.
    stripPropertyAtRule,
  },
};
export default config;
