/**
 * Image Optimization Script for Fantasia Asia
 * 
 * This script optimizes all images in the assets folder to improve website loading speed.
 * It converts large images to optimized WebP format while maintaining visual quality.
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Directories to scan for images
  inputDirs: [
    'assets/images',
    'public'
  ],
  // Image extensions to process
  extensions: ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'],
  // Size threshold - only optimize images larger than this (in bytes)
  sizeThreshold: 200 * 1024, // 200KB
  // Maximum dimensions for different image types
  maxDimensions: {
    hero: { width: 1920, height: 1080 },      // Hero/banner images
    destination: { width: 1600, height: 1200 }, // Destination detail images
    thumbnail: { width: 800, height: 600 },   // Thumbnails and cards
    default: { width: 1400, height: 1000 }    // Default max size
  },
  // Quality settings
  quality: {
    webp: 82,   // WebP quality (0-100)
    jpeg: 85,   // JPEG quality for fallback
    png: 80     // PNG quality
  },
  // Whether to keep original files (rename with .original extension)
  keepOriginals: false,
  // Whether to create WebP versions alongside originals
  createWebpVersions: false,
  // Dry run - just report what would be done
  dryRun: false
};

// Statistics
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0
};

// Determine image type based on path
function getImageType(filePath) {
  const lowerPath = filePath.toLowerCase();
  if (lowerPath.includes('hero') || lowerPath.includes('banner')) {
    return 'hero';
  }
  if (lowerPath.includes('destination') || lowerPath.includes('trending') || lowerPath.includes('about')) {
    return 'destination';
  }
  if (lowerPath.includes('thumb') || lowerPath.includes('card') || lowerPath.includes('adventure')) {
    return 'thumbnail';
  }
  return 'default';
}

// Get all image files recursively
function getImageFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getImageFiles(fullPath, files);
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (CONFIG.extensions.includes(ext)) {
        files.push({
          path: fullPath,
          size: stat.size,
          ext: ext.toLowerCase()
        });
      }
    }
  }
  
  return files;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Optimize a single image
async function optimizeImage(file) {
  const imageType = getImageType(file.path);
  const maxDim = CONFIG.maxDimensions[imageType];
  
  try {
    // Read image metadata
    const metadata = await sharp(file.path).metadata();
    
    // Skip if image is small enough
    if (file.size < CONFIG.sizeThreshold) {
      console.log(`⏭️  Skipping (small): ${file.path} (${formatBytes(file.size)})`);
      stats.skipped++;
      return;
    }
    
    // Determine output format and path
    const ext = file.ext;
    const baseName = file.path.slice(0, -ext.length);
    let outputPath = file.path;
    let outputFormat = ext === '.png' ? 'png' : 'jpeg';
    
    // For very large images or PNGs that aren't icons, convert to WebP
    if (file.size > 500 * 1024 && !file.path.includes('icon')) {
      outputPath = baseName + '.webp';
      outputFormat = 'webp';
    }
    
    console.log(`🔄 Processing: ${file.path}`);
    console.log(`   Original: ${formatBytes(file.size)} (${metadata.width}x${metadata.height})`);
    
    if (CONFIG.dryRun) {
      console.log(`   [DRY RUN] Would resize to max ${maxDim.width}x${maxDim.height} and convert to ${outputFormat}`);
      stats.processed++;
      return;
    }
    
    // Build the sharp pipeline
    let pipeline = sharp(file.path);
    
    // Resize if needed
    const needsResize = metadata.width > maxDim.width || metadata.height > maxDim.height;
    if (needsResize) {
      pipeline = pipeline.resize(maxDim.width, maxDim.height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Apply format-specific optimization
    if (outputFormat === 'webp') {
      pipeline = pipeline.webp({ quality: CONFIG.quality.webp });
    } else if (outputFormat === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: CONFIG.quality.jpeg, mozjpeg: true });
    } else if (outputFormat === 'png') {
      pipeline = pipeline.png({ quality: CONFIG.quality.png, compressionLevel: 9 });
    }
    
    // Write to temp file first
    const tempPath = outputPath + '.tmp';
    await pipeline.toFile(tempPath);
    
    // Get new file size
    const newSize = fs.statSync(tempPath).size;
    
    // Only replace if smaller or if format changed
    if (newSize < file.size || outputPath !== file.path) {
      // Keep original if configured
      if (CONFIG.keepOriginals && outputPath === file.path) {
        fs.renameSync(file.path, file.path + '.original');
      } else if (outputPath !== file.path) {
        // Delete original if converting to different format
        fs.unlinkSync(file.path);
      }
      
      // Move temp to final
      fs.renameSync(tempPath, outputPath);
      
      const savings = file.size - newSize;
      const savingsPercent = ((savings / file.size) * 100).toFixed(1);
      
      console.log(`   ✅ Optimized: ${formatBytes(newSize)} (saved ${formatBytes(savings)}, ${savingsPercent}%)`);
      
      stats.totalOriginalSize += file.size;
      stats.totalOptimizedSize += newSize;
      stats.processed++;
    } else {
      // Remove temp file, keep original
      fs.unlinkSync(tempPath);
      console.log(`   ⏭️  Kept original (already optimal)`);
      stats.skipped++;
    }
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    stats.errors++;
  }
}

// Main function
async function main() {
  console.log('🖼️  Fantasia Asia Image Optimizer');
  console.log('================================\n');
  
  if (CONFIG.dryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be modified\n');
  }
  
  // Collect all image files
  let allFiles = [];
  for (const dir of CONFIG.inputDirs) {
    const dirPath = path.join(process.cwd(), dir);
    console.log(`📁 Scanning: ${dirPath}`);
    const files = getImageFiles(dirPath);
    allFiles = allFiles.concat(files);
  }
  
  // Sort by size (largest first)
  allFiles.sort((a, b) => b.size - a.size);
  
  console.log(`\n📊 Found ${allFiles.length} images to check\n`);
  
  // Show top 10 largest files
  console.log('📈 Largest files:');
  allFiles.slice(0, 10).forEach((f, i) => {
    console.log(`   ${i + 1}. ${formatBytes(f.size).padStart(10)} - ${f.path}`);
  });
  console.log('\n');
  
  // Process each file
  for (const file of allFiles) {
    await optimizeImage(file);
  }
  
  // Print summary
  console.log('\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================');
  console.log(`✅ Processed: ${stats.processed}`);
  console.log(`⏭️  Skipped:   ${stats.skipped}`);
  console.log(`❌ Errors:    ${stats.errors}`);
  
  if (stats.totalOriginalSize > 0) {
    const totalSavings = stats.totalOriginalSize - stats.totalOptimizedSize;
    const savingsPercent = ((totalSavings / stats.totalOriginalSize) * 100).toFixed(1);
    console.log(`\n💾 Space Saved:`);
    console.log(`   Original:  ${formatBytes(stats.totalOriginalSize)}`);
    console.log(`   Optimized: ${formatBytes(stats.totalOptimizedSize)}`);
    console.log(`   Savings:   ${formatBytes(totalSavings)} (${savingsPercent}%)`);
  }
  
  console.log('\n✨ Done!');
}

// Run
main().catch(console.error);
