import defaultSettings from '@/settings'

const title = defaultSettings.title || '中国中小企业合作协会'

export default function getPageTitle( pageTitle ) {
  if ( pageTitle ) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
