import { forwardRef, useState, useEffect } from 'react';

/**
 * SmartImage - Intelligently handles image formats and fallbacks.
 * 
 * If the image fails to load (e.g., if you swapped a .jpg for a .webp in the folder
 * but didn't update the code), this component will automatically try the other 
 * extensions (.webp, .jpg, .png) until it finds the right one.
 */

const SmartImage = forwardRef(({ src, alt = '', className = '', ...rest }, ref) => {
    // Determine the base path by stripping any of our known extensions
    const basePath = src.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    
    // The order of extensions to try if the initial src fails
    const fallbackExtensions = ['.webp', '.jpg', '.png'];
    
    const [currentSrc, setCurrentSrc] = useState(src);
    const [fallbackIndex, setFallbackIndex] = useState(0);

    // Reset state if the parent passes a completely new src prop
    useEffect(() => {
        setCurrentSrc(src);
        setFallbackIndex(0);
    }, [src]);

    const handleError = () => {
        if (fallbackIndex < fallbackExtensions.length) {
            // Try the next extension
            const nextExt = fallbackExtensions[fallbackIndex];
            setCurrentSrc(`${basePath}${nextExt}`);
            setFallbackIndex(prev => prev + 1);
        }
    };

    return (
        <img 
            ref={ref} 
            src={currentSrc} 
            alt={alt} 
            className={className} 
            onError={handleError}
            {...rest} 
        />
    );
});

SmartImage.displayName = 'SmartImage';

export default SmartImage;
