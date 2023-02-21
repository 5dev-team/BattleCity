const calculateStageIndex = (stageIndex: number, arrLength: number): number => {
  if (arrLength <= stageIndex) {
    return calculateStageIndex(stageIndex - arrLength, arrLength)
  }
  return stageIndex
}

export default calculateStageIndex
