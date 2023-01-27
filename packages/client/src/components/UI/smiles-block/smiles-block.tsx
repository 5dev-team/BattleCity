import React from 'react'
import styles from './smiles-block.module.scss'

const SmilesBlock: React.FC = ({...props}) => {
  return (
    <ul 
      className={styles['smiles-block-smiles']}
      {...props}
    >
      <li><img src='/src/assets/smiles/smile-1.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-2.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-3.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-4.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-5.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-6.png' width='30' height='30'/></li>
      <li><img src='/src/assets/smiles/smile-7.png' width='30' height='30'/></li>
    </ul>
  )
}

export default SmilesBlock
