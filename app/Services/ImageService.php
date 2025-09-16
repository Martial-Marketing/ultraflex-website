<?php

namespace App\Services;

class ImageService
{
    /**
     * Convert image path to WebP format with SEO naming
     */
    public static function getWebPPath($originalPath, $location = null, $type = 'gym')
    {
        // Remove file extension
        $pathWithoutExt = pathinfo($originalPath, PATHINFO_DIRNAME) . '/' . pathinfo($originalPath, PATHINFO_FILENAME);
        
        // Generate SEO-friendly name
        if ($location) {
            $seoName = self::generateSeoName($originalPath, $location, $type);
            $directory = pathinfo($originalPath, PATHINFO_DIRNAME);
            return $directory . '/' . $seoName . '.webp';
        }
        
        // If no location provided, just remove extension and add .webp
        return $pathWithoutExt . '.webp';
    }
    
    /**
     * Generate SEO-friendly filename
     */
    private static function generateSeoName($originalPath, $location, $type)
    {
        $location = strtolower(str_replace([' ', '-'], '', $location));
        
        // Determine image type from path/filename
        if (str_contains($originalPath, 'workout') || str_contains($originalPath, 'exercise')) {
            return "exercise-in-{$location}";
        } elseif (str_contains($originalPath, 'equipment') || str_contains($originalPath, 'machine')) {
            return "equipment-in-{$location}";
        } else {
            return "gym-in-{$location}";
        }
    }
    
    /**
     * Get image with fallback to original format
     */
    public static function getOptimizedImage($path, $location = null, $type = 'gym')
    {
        $webpPath = self::getWebPPath($path, $location, $type);
        
        // Check if WebP exists, fallback to original
        if (file_exists(public_path($webpPath))) {
            return $webpPath;
        }
        
        return $path;
    }
}