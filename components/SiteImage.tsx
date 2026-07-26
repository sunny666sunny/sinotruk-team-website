import Image, { type ImageProps } from 'next/image';

type InformativeImageProps = Omit<ImageProps, 'alt' | 'aria-hidden'> & { alt: string; decorative?: false };
type DecorativeImageProps = Omit<ImageProps, 'alt' | 'aria-hidden'> & { alt?: never; decorative: true };
type SiteImageProps = InformativeImageProps | DecorativeImageProps;

export function SiteImage(props: SiteImageProps) {
  if (props.decorative) {
    const { decorative: _decorative, ...imageProps } = props;
    void _decorative;
    return <Image {...imageProps} alt="" aria-hidden="true" />;
  }

  const { decorative: _decorative, ...imageProps } = props;
  void _decorative;
  return <Image {...imageProps} alt={imageProps.alt} />;
}
