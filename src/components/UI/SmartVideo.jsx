import { forwardRef, useState, useEffect, useRef } from 'react';

/**
 * SmartVideo - Intelligently handles video formats and fallbacks.
 * 
 * If the video fails to load (e.g., if you swapped a .mp4 for a .webm in the folder
 * but didn't update the code), this component will automatically try the other 
 * extensions (.mp4, .webm) until it finds the right one.
 */

const SmartVideo = forwardRef(({ src, ...rest }, ref) => {
    // Determine the base path by stripping any known video extensions
    const basePath = src.replace(/\.(mp4|webm|ogg)$/i, '');
    
    // The order of extensions to try if the initial src fails
    const fallbackExtensions = ['.mp4', '.webm', '.ogg'];
    
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
        <video 
            ref={ref} 
            src={currentSrc} 
            onError={handleError}
            {...rest} 
        />
    );
});

SmartVideo.displayName = 'SmartVideo';

export default SmartVideo;
