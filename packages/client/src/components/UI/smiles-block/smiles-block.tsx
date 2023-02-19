import React, { HTMLAttributes, MouseEvent } from 'react'
import styles from './smiles-block.module.scss'

interface ISmilesBlockProps extends HTMLAttributes<HTMLUListElement> {
  onImg: (node: HTMLElement) => void
}

const smiles = [
  'smile-1.png',
  'smile-2.png',
  'smile-3.png',
  'smile-4.png',
  'smile-5.png',
  'smile-6.png',
  'smile-7.png',
]

const SmilesBlock: React.FC<ISmilesBlockProps> = ({ onImg }) => {
  const onSmileCLick = (e: MouseEvent) => {
    const node = e.target as HTMLElement
    if (node.nodeName === 'IMG') {
      onImg(node)
    }
  }
  return (
    <ul
      className={styles['smiles-block-smiles']}
      onClick={e => onSmileCLick(e)}>
      {smiles.map(smile => (
        <li key={smile}>
          <img src={'/src/assets/smiles/' + smile} width='30' height='30' />
        </li>
      ))}
    </ul>
  )
}

export default SmilesBlock
