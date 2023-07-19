import { FC } from 'react'
import BaseLayout from '../BaseLayout'
import { registerConfig } from '@/components/EditableMaterial'
type propsType = {
  containerIndex: number
}
const Dialog: FC<propsType> = (props) => {
  const { containerIndex } = props
  const position = registerConfig.componentMap['dialog'].position
  return (
    <mat-dialog
      class="min-h-[570px] max-h-[809px] h-[calc(100vh-160px)]"
      show="true"
      style={position}
    >
      <BaseLayout
        containerIndex={containerIndex}
        blockIndex={[0]}
        slotName="content"
        double={true}
        right={true}
        bottom={true}
      />
    </mat-dialog>
  )
}
export default Dialog
