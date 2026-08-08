/**
 * Fallback image helpers for remote product/avatar URLs.
 */

export function getImageFallback(label = 'Product', size = 400) {
  const text = encodeURIComponent(String(label).replace(/-/g, ' ').slice(0, 24));
  return `https://placehold.co/${size}x${size}/eef5ff/2563eb?text=${text}`;
}

export function getProductImageSrc(product, index = 0) {
  return product?.images?.[index] || getImageFallback(product?.category || product?.title || 'Product');
}

export function handleImageError(event, label = 'Product') {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') return;

  img.dataset.fallbackApplied = 'true';
  const size = img.width > 0 ? Math.round(img.width) : 400;
  img.src = getImageFallback(label, size);
}
