import Home from '../page'
import { formatMetadata, getFormatPage } from '@/lib/format-pages'

const format = getFormatPage('svg')
export const metadata = formatMetadata(format)

export default function Page() {
  return <Home format={format} />
}
