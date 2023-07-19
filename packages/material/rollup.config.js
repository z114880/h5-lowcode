import rollupTypescript from '@rollup/plugin-typescript'
import rollupPrettier from 'rollup-plugin-prettier'
export default {
  input: {
    Text: 'components/base/Text/index.ts',
    Input: 'components/base/Input/index.ts',
    TextArea: 'components/base/TextArea/index.ts',
    BaseLayout: 'components/base/BaseLayout/index.ts',
    BlockLayout: 'components/base/BlockLayout/index.ts',
    TabLayout: 'components/base/TabLayout/index.ts',
    TabHeader: 'components/base/TabLayout/TabHeader.ts',
    TabContent: 'components/base/TabLayout/TabContent.ts',
    TabHeaderItem: 'components/base/TabLayout/TabHeaderItem.ts',
    TabHeaderItemActive: 'components/base/TabLayout/TabHeaderItemActive.ts',
    TabHeaderItemDeActive: 'components/base/TabLayout/TabHeaderItemDeActive.ts',
    Button: 'components/base/Button/index.ts',
    CloseButton: 'components/base/CloseButton/index.ts',
    Image: 'components/base/Image/index.ts',
    Dialog: 'components/base/Dialog/index.ts',
    InfoButton: 'components/customized/InfoButton/index.ts',
    DrawButton: 'components/customized/DrawButton/index.ts',
    PrizeButton: 'components/customized/PrizeButton/index.ts',
    SubmitButton: 'components/customized/SubmitButton/index.ts',
    LoginButton: 'components/customized/LoginButton/index.ts',
    ShareButton: 'components/customized/ShareButton/index.ts',
    ExchangeButton: 'components/customized/ExchangeButton/index.ts',
    ShowMoreButton: 'components/customized/ShowMoreButton/index.ts',
    InfoBox: 'components/customized/InfoBox/index.ts',
    PrizeBox: 'components/customized/PrizeBox/index.ts',
    TimeLeftText: 'components/customized/TimeLeftText/index.ts',
    CopyCouponButton: 'components/customized/CopyCouponButton/index.ts'
  },
  output: {
    dir: 'dist',
    format: 'es',
    minifyInternalExports: false,
    entryFileNames: 'material/[name].js',
    chunkFileNames: 'util/[name].js'
  },
  plugins: [
    rollupTypescript({ target: 'ES2018' }),
    rollupPrettier({
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'none',
      printWidth: 100,
      proseWrap: 'never',
      semi: false
    })
  ]
}
