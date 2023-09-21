/* eslint-disable @typescript-eslint/ban-ts-comment */
import { pageConfigType, schemaType } from '../../../../types/Schema'
import prettier, { Options } from 'prettier'
import parserHtml from 'prettier/parser-html'
import parserCss from 'prettier/parser-postcss'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
//@ts-ignore
import normalizeCss from '../build-in-code/normalize.css'
//@ts-ignore
import indexCss from '../../dist/index.css'
//@ts-ignore
import animationCss from '../../dist/animation.css'
//@ts-ignore
import presetsJs from '../build-in-code/presets.js'
//@ts-ignore
import bottomJs from '../build-in-code/bottom.js'
//@ts-ignore
import apis from '../../dist/util/apis.js'
//@ts-ignore
import tools from '../../dist/util/tools.js'
//@ts-ignore
import BaseLayout from '../../dist/material/BaseLayout.js'
//@ts-ignore
import BlockLayout from '../../dist/material/BlockLayout.js'
//@ts-ignore
import Button from '../../dist/material/Button.js'
//@ts-ignore
import CloseButton from '../../dist/material/CloseButton'
//@ts-ignore
import CopyCouponButton from '../../dist/material/CopyCouponButton'
//@ts-ignore
import Dialog from '../../dist/material/Dialog'
//@ts-ignore
import DrawButton from '../../dist/material/DrawButton'
//@ts-ignore
import ExchangeButton from '../../dist/material/ExchangeButton'
//@ts-ignore
import Image from '../../dist/material/Image'
//@ts-ignore
import InfoBox from '../../dist/material/InfoBox'
//@ts-ignore
import InfoButton from '../../dist/material/InfoButton'
//@ts-ignore
import Input from '../../dist/material/Input'
//@ts-ignore
import LoginButton from '../../dist/material/LoginButton'
//@ts-ignore
import PrizeBox from '../../dist/material/PrizeBox'
//@ts-ignore
import PrizeButton from '../../dist/material/PrizeButton'
//@ts-ignore
import ShareButton from '../../dist/material/ShareButton'
//@ts-ignore
import ShowMoreButton from '../../dist/material/ShowMoreButton'
//@ts-ignore
import SubmitButton from '../../dist/material/SubmitButton'
//@ts-ignore
import TabContent from '../../dist/material/TabContent'
//@ts-ignore
import TabHeader from '../../dist/material/TabHeader'
//@ts-ignore
import TabHeaderItem from '../../dist/material/TabHeaderItem'
//@ts-ignore
import TabHeaderItemActive from '../../dist/material/TabHeaderItemActive'
//@ts-ignore
import TabHeaderItemDeActive from '../../dist/material/TabHeaderItemDeActive'
//@ts-ignore
import TabLayout from '../../dist/material/TabLayout'
//@ts-ignore
import Text from '../../dist/material/Text'
//@ts-ignore
import TextArea from '../../dist/material/TextArea'
//@ts-ignore
import TimeLeftText from '../../dist/material/TimeLeftText'

import ContainerBuilder from './containerBuilder'

const prettierConfig = {
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100000,
  proseWrap: 'never',
  semi: false
} as Options
export default class ProjectBuilder {
  Container: ContainerBuilder
  options: { config: pageConfigType }
  template: string
  Chunks: any[]
  CssStr: string
  constructor(Schema: any, options: { config: pageConfigType }) {
    this.Container = new ContainerBuilder(options)
    this.Chunks = []
    this.CssStr = ''
    this.options = options
    this.createChunk(Schema)
    const body = this.addBody()
    this.template = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <title>${this.options.config.title || ''}</title>
      <link rel="icon" type="image/svg+xml" href="/funet.svg" />
      <link rel="stylesheet" href="./normalize.css">
      <link rel="stylesheet" href="./animation.css">
      <link rel="stylesheet" href="./index.css">
      <script src="./presets.js"></script>
      <script src="https://file.caixin.com/webjs/axios/1.2.2/axios.js"></script>
      <script src="https://file.caixin.com/webjs/wap/flexible.js" type="text/javascript" charset="utf-8"></script>
      </head>
    
    <body>
      <div id="app">
        ${body}
      </div>
    </body>

    <!-- 微信分享代码 -->
    <div style="display:none" id="wx_shareLogo">${this.options.config.sharedLogo || ''}</div>
    <div style="display:none" id="wx_shareTitle">${this.options.config.sharedTitle || ''}</div>
    <div style="display:none" id="wx_shareMessage">${this.options.config.sharedMessage || ''}</div>
    ${
      body.indexOf('BaseLayout'.toLowerCase()) > -1
        ? '<script src="./material/BaseLayout.js" type="module"></script>'
        : ''
    }${
      body.indexOf('BlockLayout'.toLowerCase()) > -1
        ? '<script src="./material/BlockLayout.js" type="module"></script>'
        : ''
    }${
      body.indexOf('Button'.toLowerCase()) > -1
        ? '<script src="./material/Button.js" type="module"></script>'
        : ''
    }${
      body.indexOf('CloseButton'.toLowerCase()) > -1
        ? '<script src="./material/CloseButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('CopyCouponButton'.toLowerCase()) > -1
        ? '<script src="./material/CopyCouponButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('Dialog'.toLowerCase()) > -1
        ? '<script src="./material/Dialog.js" type="module"></script>'
        : ''
    }${
      body.indexOf('DrawButton'.toLowerCase()) > -1
        ? '<script src="./material/DrawButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('ExchangeButton'.toLowerCase()) > -1
        ? '<script src="./material/ExchangeButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('Image'.toLowerCase()) > -1
        ? '<script src="./material/Image.js" type="module"></script>'
        : ''
    }${
      body.indexOf('InfoBox'.toLowerCase()) > -1
        ? '<script src="./material/InfoBox.js" type="module"></script>'
        : ''
    }${
      body.indexOf('InfoButton'.toLowerCase()) > -1
        ? '<script src="./material/InfoButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('Input'.toLowerCase()) > -1
        ? '<script src="./material/Input.js" type="module"></script>'
        : ''
    }${
      body.indexOf('LoginButton'.toLowerCase()) > -1
        ? '<script src="./material/LoginButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('PrizeBox'.toLowerCase()) > -1
        ? '<script src="./material/PrizeBox.js" type="module"></script>'
        : ''
    }${
      body.indexOf('PrizeButton'.toLowerCase()) > -1
        ? '<script src="./material/PrizeButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('ShareButton'.toLowerCase()) > -1
        ? '<script src="./material/ShareButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('ShowMoreButton'.toLowerCase()) > -1
        ? '<script src="./material/ShowMoreButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('SubmitButton'.toLowerCase()) > -1
        ? '<script src="./material/SubmitButton.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabContent'.toLowerCase()) > -1
        ? '<script src="./material/TabContent.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabHeader'.toLowerCase()) > -1
        ? '<script src="./material/TabHeader.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabHeaderItem'.toLowerCase()) > -1
        ? '<script src="./material/TabHeaderItem.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabHeaderItemActive'.toLowerCase()) > -1
        ? '<script src="./material/TabHeaderItemActive.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabHeaderItemDeActive'.toLowerCase()) > -1
        ? '<script src="./material/TabHeaderItemDeActive.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TabLayout'.toLowerCase()) > -1
        ? '<script src="./material/TabLayout.js" type="module"></script>'
        : ''
    }${
      body.indexOf('Text'.toLowerCase()) > -1
        ? '<script src="./material/Text.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TextArea'.toLowerCase()) > -1
        ? '<script src="./material/TextArea.js" type="module"></script>'
        : ''
    }${
      body.indexOf('TimeLeftText'.toLowerCase()) > -1
        ? '<script src="./material/TimeLeftText.js" type="module"></script>'
        : ''
    }
    <!-- 微信分享代码 -->
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <!-- 统计和分享代码 -->
    <script src="./bottom.js"></script>
    </html>`
  }
  public createChunk(Schema: schemaType) {
    for (let i = 0; i < Schema.container.length; i++) {
      const buildContainer = this.Container.builid(Schema.container[i])
      this.Chunks.push(buildContainer?.element)
      this.CssStr += buildContainer?.css
    }
  }
  public addBody() {
    let str = ''
    for (let i = 0; i < this.Chunks.length; i++) {
      str += this.Chunks[i]
    }
    return str
  }

  compressZip() {
    const zip = new JSZip()
    zip.file('normalize.css', normalizeCss)
    zip.file('animation.css', animationCss)
    zip.file('presets.js', presetsJs)
    zip.file('bottom.js', bottomJs)
    const materialFolder = zip.folder('material')
    materialFolder?.file('BaseLayout.js', BaseLayout)
    materialFolder?.file('BlockLayout.js', BlockLayout)
    materialFolder?.file('Button.js', Button)
    materialFolder?.file('CloseButton.js', CloseButton)
    materialFolder?.file('CopyCouponButton.js', CopyCouponButton)
    materialFolder?.file('Dialog.js', Dialog)
    materialFolder?.file('DrawButton.js', DrawButton)
    materialFolder?.file('ExchangeButton.js', ExchangeButton)
    materialFolder?.file('Image.js', Image)
    materialFolder?.file('InfoBox.js', InfoBox)
    materialFolder?.file('InfoButton.js', InfoButton)
    materialFolder?.file('Input.js', Input)
    materialFolder?.file('LoginButton.js', LoginButton)
    materialFolder?.file('PrizeBox.js', PrizeBox)
    materialFolder?.file('PrizeButton.js', PrizeButton)
    materialFolder?.file('ShareButton.js', ShareButton)
    materialFolder?.file('ShowMoreButton.js', ShowMoreButton)
    materialFolder?.file('SubmitButton.js', SubmitButton)
    materialFolder?.file('TabContent.js', TabContent)
    materialFolder?.file('TabHeader.js', TabHeader)
    materialFolder?.file('TabHeaderItem.js', TabHeaderItem)
    materialFolder?.file('TabHeaderItemActive.js', TabHeaderItemActive)
    materialFolder?.file('TabHeaderItemDeActive.js', TabHeaderItemDeActive)
    materialFolder?.file('TabLayout.js', TabLayout)
    materialFolder?.file('Text.js', Text)
    materialFolder?.file('TextArea.js', TextArea)
    materialFolder?.file('TimeLeftText.js', TimeLeftText)
    const utilFolder = zip.folder('util')
    utilFolder?.file('apis.js', apis)
    utilFolder?.file('tools.js', tools)
    return zip
  }

  public browserGenerate() {
    const htmlTemplate = prettier.format(this.template, {
      ...prettierConfig,
      parser: 'html',
      plugins: [parserHtml]
    })
    const cssTemplate = prettier.format(indexCss + this.CssStr, {
      parser: 'css',
      plugins: [parserCss]
    })
    const zip = this.compressZip()
    zip.file('index.html', htmlTemplate)
    zip.file('index.css', cssTemplate)
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, `${this.options.config.projectName || '代码'}.zip`)
    })
  }
  public async deployGenerate() {
    const htmlTemplate = prettier.format(this.template, {
      ...prettierConfig,
      parser: 'html',
      plugins: [parserHtml]
    })
    const cssTemplate = prettier.format(indexCss + this.CssStr, {
      parser: 'css',
      plugins: [parserCss]
    })
    const zip = this.compressZip()
    zip.file('index.html', htmlTemplate)
    zip.file('index.css', cssTemplate)
    const deployZip = await zip.generateAsync({ type: 'blob' })
    return new File([deployZip], `${this.options.config.projectName || '代码'}.zip`)
  }
}
