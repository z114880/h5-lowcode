import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          header: {
            setting: 'page setting',
            copyLink: 'copy link',
            redo: 'redo',
            undo: 'undo',
            delete: 'delete',
            increaseZIndex: 'increase z-index',
            decreaseZIndex: 'decrease z-index',
            importJson: 'import json',
            exportJson: 'export json',
            downloadProject: 'download project',
            preview: 'preview',
            deploy: 'deploy',
            album: 'album',
            makeSureDeploy: 'Are you sure to deploy?',
            overwriteProductionProject:
              'This operation will overwrite the current production project.',
            yes: 'yes',
            no: 'no',
            logout: 'logout',
            deploySuccess: 'deploy success',
            deployFailed: 'deploy failed, please try again',
            completeProjectName: 'please complete project name',
            copiedToClipboard: 'copied to clipboard',
            httpsLocalhostOnly: 'clipboard API is only in HTTPS/localhost',
            projectName: 'project name',
            shareTitle: 'share title',
            shareMessage: 'share message',
            shareLogo: 'share logo',
            inputProjectName: 'please input project name',
            inputShareTitle: 'please input share title',
            inputShareMessage: 'please input share message',
            inputShareLogo: 'please input share logo',
            copy: 'copy',
            uploadImage: 'upload image'
          },
          leftPannel: {
            page: 'page',
            mainPage: 'main page',
            modal: 'modal',
            createModal: 'create modal',
            component: 'component',
            baseComponent: 'base',
            customizedComponent: 'other',
            baseLayout: 'base layout',
            tabLayout: 'tab layout',
            blockLayout: 'block layout',
            button: 'button',
            text: 'text',
            input: 'input',
            textarea: 'textarea',
            image: 'image',
            lotteryButton: 'lottery button',
            prizeButton: 'prize button',
            infoButton: 'info button',
            loginButton: 'login button',
            shareButton: 'share button',
            exchangeButton: 'exchange button',
            timeLeft: 'time left',
            showMoreButton: 'show-more button',
            showMoreContainer: 'show-more container',
            modalType: 'modal type',
            modalName: 'modal name',
            chooseModalType: 'Please choose modal type',
            inputModalName: 'Please input modal name',
            showGuideline: 'show guideline',
            hideGuideline: 'hide guideline',
            customizedModal: 'customized modal',
            uniqueModalName: 'modal name has to be unique!'
          },
          rightPannel: {
            name: 'name',
            attribute: 'attribute',
            animation: 'animation',
            noChoosenElement: 'no choosen element',
            noEditableAttribute: 'no editable attribute',
            componentName: 'component name',
            save: 'save',
            none: 'none',
            action: 'action',
            setAction: 'set action',
            chooseAction: 'choose action',
            openDialog: 'open modal',
            openLink: 'open link',
            backTop: 'back top',
            modalName: 'modal name',
            Url: 'url',
            currentAnimation: 'current animation',
            noAnimation: 'none',
            chooseAnimation: 'choose animation',
            keyframes: 'keyframes',
            addKeyframe: 'add keyframe',
            addStyle: 'add style',
            duration: 'duration',
            delay: 'delay',
            timingFunction: 'timing function',
            iterationCount: 'iteration count',
            infinite: 'infinite',
            AnimationFillMode: 'AnimationFillMode',
            triggerMode: 'trigger mode',
            default: 'default',
            click: 'click',
            percentageNumber: 'Please enter a percentage number',
            keyframeRepeated: 'keyframe repeated',
            delete: 'delete',
            canNotEdit: 'can not edit animation',
            success: 'success',
            addTab: 'add Tab',
            deleteTab: 'delete Tab',
            activeTab: 'active Tab',
            tabHeight: 'Tab height'
          },
          attribute: {
            width: 'width',
            height: 'height',
            X: 'X',
            Y: 'Y',
            'activity-id': 'activity id',
            src: 'src',
            name: 'name'
          },
          css: {
            fontSize: 'fontSize',
            backgroundImage: 'backgroundImage',
            color: 'color',
            lineHeight: 'lineHeight',
            textAlign: 'textAlign',
            position: 'position',
            textDecoration: 'textDecoration',
            text: 'text',
            backgroundColor: 'backgroundColor',
            placeholder: 'placeholder',
            fontWeight: 'fontWeight',
            borderRadius: 'borderRadius',
            opacity: 'opacity'
          },
          textAlign: {
            left: 'left',
            center: 'center',
            right: 'right',
            justify: 'justify'
          },
          position: {
            relative: 'relative',
            absolute: 'absolute'
          },
          textDecoration: {
            none: 'none',
            'line-through': 'line-through',
            underline: 'underline'
          },
          fontWeight: {
            normal: 'normal',
            bold: 'bold'
          },
          toast: {
            canNotDeleteElement: 'Can not delete this element',
            currentZIndex: 'Success! current z-index:',
            canNotSetZindex: 'Can not set z-index',
            minimalZIndex: 'Error! The minimal z-index is 1'
          }
        }
      },
      zh: {
        translation: {
          header: {
            setting: '页面设置',
            copyLink: '复制链接',
            redo: '恢复',
            undo: '撤销',
            delete: '删除',
            increaseZIndex: '上移一层',
            decreaseZIndex: '下移一层',
            importJson: '导入JSON',
            exportJson: '导出JSON',
            downloadProject: '下载代码',
            preview: '预览',
            deploy: '部署',
            album: '图片库',
            makeSureDeploy: '确定要部署吗？',
            overwriteProductionProject: '此操作会覆盖线上项目',
            yes: '是',
            no: '否',
            logout: '退出登录',
            deploySuccess: '部署成功',
            deployFailed: '部署失败，请重试',
            completeProjectName: '请补全项目名称',
            copiedToClipboard: '已拷贝至剪切板',
            httpLocalhostOnly: '只能在https或者localhost中调用',
            projectName: '项目名称',
            shareTitle: '分享标题',
            shareMessage: '分享摘要',
            shareLogo: '分享Logo',
            inputProjectName: '请输入项目名称',
            inputShareTitle: '请输入分享标题',
            inputShareMessage: '请输入分享摘要',
            inputShareLogo: '请输入分享Logo',
            copy: '复制',
            uploadImage: '上传图片'
          },
          leftPannel: {
            page: '页面',
            mainPage: '主页面',
            modal: '弹窗',
            createModal: '创建弹窗',
            component: '组件',
            baseComponent: '基础组件',
            customizedComponent: '业务组件',
            baseLayout: '基础容器',
            tabLayout: 'Tab容器',
            blockLayout: '块级容器',
            button: '按钮',
            text: '文本',
            input: '输入框',
            textarea: '多行输入框',
            image: '图片',
            lotteryButton: '抽奖按钮',
            prizeButton: '我的奖品按钮',
            infoButton: '活动说明按钮',
            loginButton: '登录按钮',
            shareButton: '分享按钮',
            exchangeButton: '积分兑换按钮',
            timeLeft: '剩余抽奖次数',
            showMoreButton: '显示更多按钮',
            showMoreContainer: '显示更多容器',
            modalType: '弹窗类型',
            modalName: '弹窗名称',
            chooseModalType: '请选择弹窗类型',
            inputModalName: '请输入弹窗类型',
            showGuideline: '显示辅助线',
            hideGuideline: '隐藏辅助线',
            customizedModal: '自定义弹窗',
            uniqueModalName: '弹窗名称须是唯一值！'
          },
          rightPannel: {
            name: '组件名称',
            attribute: '属性',
            animation: '动画',
            noChoosenElement: '无选中元素',
            noEditableAttribute: '无可编辑属性',
            componentName: '组件名称',
            save: '保存',
            none: '无',
            action: '交互',
            setAction: '设置交互',
            chooseAction: '选择事件',
            openDialog: '打开弹窗',
            openLink: '跳转链接',
            backTop: '返回顶部',
            modalName: '弹窗名称',
            Url: '链接地址',
            currentAnimation: '当前动效',
            chooseAnimation: '选择动效',
            noAnimation: '无动效',
            keyframes: '自定义动效',
            addKeyframe: '新增关键帧',
            addStyle: '新增属性',
            duration: '执行时间',
            delay: '动画延迟',
            timingFunction: '动画曲线',
            iterationCount: '动画次数',
            infinite: '循环播放',
            AnimationFillMode: 'AnimationFillMode',
            triggerMode: '触发方式',
            default: '默认',
            click: '点击',
            percentageNumber: '请输入一个百分比正整数',
            keyframeRepeated: '关键帧重复',
            delete: '删除',
            canNotEdit: '不可编辑动效',
            success: '成功',
            addTab: '新增Tab',
            deleteTab: '删除Tab',
            activeTab: '激活Tab',
            tabHeight: 'Tab高度'
          },
          attribute: {
            width: '宽度',
            height: '高度',
            X: 'X',
            Y: 'Y',
            'activity-id': '活动id',
            src: '图片地址',
            name: '名称'
          },
          css: {
            fontSize: '字体大小',
            backgroundImage: '背景图片',
            color: '文本颜色',
            lineHeight: '行高',
            textAlign: '对齐方式',
            position: '定位方式',
            textDecoration: '文字样式',
            text: '文本',
            backgroundColor: '背景颜色',
            placeholder: 'placeholder',
            fontWeight: '字体粗细',
            borderRadius: '圆角',
            opacity: '透明度'
          },
          textAlign: {
            left: '左对齐',
            center: '居中对齐',
            right: '右对齐',
            justify: '两端对齐'
          },
          position: {
            relative: '相对定位',
            absolute: '绝对定位'
          },
          textDecoration: {
            none: '无',
            'line-through': '中划线',
            underline: '下划线'
          },
          fontWeight: {
            normal: '正常',
            bold: '粗体'
          },
          toast: {
            canNotDeleteElement: '无法删除此元素',
            currentZIndex: '成功！当前层级:',
            canNotSetZindex: '此元素无法设置层级',
            minimalZIndex: '错误！最低层级为1'
          }
        }
      }
    }
  })

export default i18n
