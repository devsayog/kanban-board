type TypographyProps = {
  text: string
}
interface ParagraphProps extends TypographyProps {
  size?: 'sm' | 'base'
  className?: string
}
export const Heading2 = ({ text }: TypographyProps) => (
  <h2
    className="w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-light uppercase sm:text-xl md:text-2xl xl:text-3xl "
    title={text}
  >
    {text}
  </h2>
)

export const Heading3 = ({ text }: TypographyProps) => (
  <h3 className="font-light capitalize sm:text-lg md:text-xl xl:text-2xl">
    {text}
  </h3>
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
