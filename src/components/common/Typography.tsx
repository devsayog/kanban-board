type TypographyProps = {
  text: String
  className?: string
}
interface ParagraphProps extends TypographyProps {
  size?: 'sm' | 'base'
}
export const Heading2 = ({ text }: TypographyProps) => (
  <h3 className="text-lg font-bold uppercase sm:text-xl md:text-2xl xl:text-3xl">
    {text}
  </h3>
)

export const Heading3 = ({ text }: TypographyProps) => (
  <h3 className="capitalize sm:text-lg md:text-xl xl:text-2xl">{text}</h3>
)

export const Paragraph = ({
  text,
  size = 'base',
  className,
}: ParagraphProps) => {
  const classes =
    size === 'sm'
      ? 'text-xs md:text-sm xl:text-base 2xl:text-lg'
      : 'text-sm md:text-base xl:text-lg'
  return <p className={`${classes} ${className}`}>{text}</p>
}
