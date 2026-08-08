import { getProductImageSrc, handleImageError } from '../../utils/imageFallback';

const ProductImage = ({
  product,
  src,
  alt,
  category,
  className,
  loading = 'lazy',
  index = 0,
  ...props
}) => {
  const imageSrc = src ?? (product ? getProductImageSrc(product, index) : '');
  const fallbackLabel = category ?? product?.category ?? product?.title ?? alt ?? 'Product';

  return (
    <img
      src={imageSrc}
      alt={alt ?? product?.title ?? 'Product image'}
      className={className}
      loading={loading}
      onError={(event) => handleImageError(event, fallbackLabel)}
      {...props}
    />
  );
};

export default ProductImage;
