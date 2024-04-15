import styles from './Avatar.module.css'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

export function Avatar({hasBorder = true, ...props}: Readonly<AvatarProps>) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  )
}
