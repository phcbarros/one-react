import styles from './Avatar.module.css'

interface AvatarProps {
  hasBorder?: boolean
  imageSrc: string
  imageAlt?: string
}

export function Avatar({
  imageSrc,
  imageAlt,
  hasBorder = true,
}: Readonly<AvatarProps>) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={imageSrc}
      alt={imageAlt}
    />
  )
}
