import styles from './Avatar.module.css'

export function Avatar({imageSrc, imageAlt, hasBorder = true}) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={imageSrc}
      alt={imageAlt}
    />
  )
}
