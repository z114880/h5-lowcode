import { blockType, schemaType } from '@/editor/types'

export const getBlockElementByIndexes = (
  schema: schemaType | Record<string, any>,
  containerIndex: number,
  blockIndex: number[]
) => {
  try {
    const element = schema.container[containerIndex]
    let num = 0
    const getElement = (temp: any, i: number): any => {
      if (i <= 0) {
        return temp
      }
      temp = temp.blocks[blockIndex[num]]
      i--
      num++
      return getElement(temp, i)
    }
    return getElement(element, blockIndex.length)
    // if (blockIndex.length == 0) return element
    // if (blockIndex.length == 1) return element.blocks[blockIndex[0]]
    // if (blockIndex.length == 2) return element.blocks[blockIndex[0]].blocks![blockIndex[1]]
    // if (blockIndex.length == 3)
    //   return element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks![blockIndex[2]]
    // if (blockIndex.length == 4)
    //   return element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks![blockIndex[2]].blocks![
    //     blockIndex[3]
    //   ]
  } catch (error) {
    return 'notFound'
  }
}

export const getBlocksByIndexes = (
  schema: schemaType | Record<string, any>,
  containerIndex: number,
  blockIndex: number[]
) => {
  try {
    const element = schema.container[containerIndex]
    let num = 0
    const getElement = (temp: any, i: number): any => {
      if (i <= 0) {
        return temp
      }
      temp = temp.blocks[blockIndex[num]]
      i--
      num++
      return getElement(temp, i)
    }
    return getElement(element, blockIndex.length).blocks
    // if (blockIndex.length == 0) return element.blocks
    // if (blockIndex.length == 1) return element.blocks[blockIndex[0]].blocks
    // if (blockIndex.length == 2) return element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks
    // if (blockIndex.length == 3)
    //   return element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks![blockIndex[2]].blocks
    // if (blockIndex.length == 4)
    //   return element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks![blockIndex[2]].blocks[
    //     blockIndex[3]
    //   ].blocks
  } catch (error) {
    return 'notFound'
  }
}

export const deleteElementByIndexes = (
  schema: schemaType | Record<string, any>,
  containerIndex: number,
  blockIndex: number[]
) => {
  const element = schema.container[containerIndex]
  if (blockIndex.length == 0) {
    schema.container.splice(containerIndex, 1)
    return schema
  }
  let num = 0
  const getElement = (temp: any, i: number): any => {
    if (i <= 0) {
      return temp
    }
    temp = temp.blocks[blockIndex[num]]
    i--
    num++
    return getElement(temp, i)
  }
  getElement(element, blockIndex.length - 1).blocks!.splice(blockIndex[blockIndex.length - 1], 1)
  return schema

  // if (blockIndex.length == 0) schema.container.splice(containerIndex, 1)
  // if (blockIndex.length == 1) element.blocks.splice(blockIndex[0], 1)
  // if (blockIndex.length == 2) element.blocks[blockIndex[0]].blocks!.splice(blockIndex[1], 1)
  // if (blockIndex.length == 3)
  //   element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks!.splice(blockIndex[2], 1)
  // if (blockIndex.length == 4)
  //   element.blocks[blockIndex[0]].blocks![blockIndex[1]].blocks![blockIndex[2]].blocks!.splice(
  //     blockIndex[3],
  //     1
  //   )
  // return schema
}

export const getKeyElementByBlocks = (key: string, blocks: blockType[], index?: number) => {
  let num = 0
  for (let i = 0; i < blocks.length; i++) {
    if (index && blocks[i].key === key && num < index) {
      num++
      continue
    }
    if (blocks[i].key === key) {
      return blocks[i]
    }
  }
  return null
}

export const getKeyIndexByBlocks = (key: string, blocks: blockType[]) => {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].key === key) {
      return i
    }
  }
  return null
}
