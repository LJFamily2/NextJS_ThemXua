// SEO monitoring and testing utilities
export interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  score: number;
}

// Check if page has proper title tag
export const checkPageTitle = (title?: string): SEOCheck => {
  if (!title) {
    return {
      name: 'Page Title',
      status: 'fail',
      message: 'Missing page title',
      score: 0,
    };
  }

  if (title.length < 30) {
    return {
      name: 'Page Title',
      status: 'warning',
      message: 'Title too short (should be 30-60 characters)',
      score: 6,
    };
  }

  if (title.length > 60) {
    return {
      name: 'Page Title',
      status: 'warning',
      message: 'Title too long (should be 30-60 characters)',
      score: 7,
    };
  }

  return {
    name: 'Page Title',
    status: 'pass',
    message: 'Title length is optimal',
    score: 10,
  };
};

// Check meta description
export const checkMetaDescription = (description?: string): SEOCheck => {
  if (!description) {
    return {
      name: 'Meta Description',
      status: 'fail',
      message: 'Missing meta description',
      score: 0,
    };
  }

  if (description.length < 120) {
    return {
      name: 'Meta Description',
      status: 'warning',
      message: 'Description too short (should be 120-160 characters)',
      score: 6,
    };
  }

  if (description.length > 160) {
    return {
      name: 'Meta Description',
      status: 'warning',
      message: 'Description too long (should be 120-160 characters)',
      score: 7,
    };
  }

  return {
    name: 'Meta Description',
    status: 'pass',
    message: 'Description length is optimal',
    score: 10,
  };
};

// Check for structured data
export const checkStructuredData = (): SEOCheck => {
  if (typeof window === 'undefined') {
    return {
      name: 'Structured Data',
      status: 'warning',
      message: 'Cannot check structured data on server',
      score: 5,
    };
  }

  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  if (scripts.length === 0) {
    return {
      name: 'Structured Data',
      status: 'fail',
      message: 'No structured data found',
      score: 0,
    };
  }

  if (scripts.length < 3) {
    return {
      name: 'Structured Data',
      status: 'warning',
      message: `Found ${scripts.length} structured data scripts (recommend at least 3)`,
      score: 7,
    };
  }

  return {
    name: 'Structured Data',
    status: 'pass',
    message: `Found ${scripts.length} structured data scripts`,
    score: 10,
  };
};

// Check for Open Graph tags
export const checkOpenGraph = (): SEOCheck => {
  if (typeof window === 'undefined') {
    return {
      name: 'Open Graph',
      status: 'warning',
      message: 'Cannot check Open Graph on server',
      score: 5,
    };
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const ogImage = document.querySelector('meta[property="og:image"]');

  const missingTags = [];
  if (!ogTitle) missingTags.push('og:title');
  if (!ogDescription) missingTags.push('og:description');
  if (!ogImage) missingTags.push('og:image');

  if (missingTags.length > 0) {
    return {
      name: 'Open Graph',
      status: 'fail',
      message: `Missing Open Graph tags: ${missingTags.join(', ')}`,
      score: 3,
    };
  }

  return {
    name: 'Open Graph',
    status: 'pass',
    message: 'All essential Open Graph tags present',
    score: 10,
  };
};

// Check for responsive viewport
export const checkViewport = (): SEOCheck => {
  if (typeof window === 'undefined') {
    return {
      name: 'Viewport',
      status: 'warning',
      message: 'Cannot check viewport on server',
      score: 5,
    };
  }

  const viewport = document.querySelector('meta[name="viewport"]');

  if (!viewport) {
    return {
      name: 'Viewport',
      status: 'fail',
      message: 'Missing viewport meta tag',
      score: 0,
    };
  }

  const content = viewport.getAttribute('content');
  if (!content?.includes('width=device-width')) {
    return {
      name: 'Viewport',
      status: 'warning',
      message: 'Viewport tag should include width=device-width',
      score: 5,
    };
  }

  return {
    name: 'Viewport',
    status: 'pass',
    message: 'Viewport is properly configured',
    score: 10,
  };
};

// Check for alt text on images
export const checkImageAltText = (): SEOCheck => {
  if (typeof window === 'undefined') {
    return {
      name: 'Image Alt Text',
      status: 'warning',
      message: 'Cannot check images on server',
      score: 5,
    };
  }

  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(
    img => !img.alt || img.alt.trim() === ''
  );

  if (imagesWithoutAlt.length === 0) {
    return {
      name: 'Image Alt Text',
      status: 'pass',
      message: 'All images have alt text',
      score: 10,
    };
  }

  const totalImages = images.length;
  const imagesWithAlt = totalImages - imagesWithoutAlt.length;
  const percentage = Math.round((imagesWithAlt / totalImages) * 100);

  if (percentage < 80) {
    return {
      name: 'Image Alt Text',
      status: 'fail',
      message: `${imagesWithoutAlt.length} of ${totalImages} images missing alt text`,
      score: 3,
    };
  }

  return {
    name: 'Image Alt Text',
    status: 'warning',
    message: `${imagesWithoutAlt.length} of ${totalImages} images missing alt text`,
    score: 7,
  };
};

// Run complete SEO audit
export const runSEOAudit = async (
  title?: string,
  description?: string
): Promise<{
  checks: SEOCheck[];
  totalScore: number;
  grade: string;
}> => {
  const checks: SEOCheck[] = [
    checkPageTitle(title),
    checkMetaDescription(description),
    checkStructuredData(),
    checkOpenGraph(),
    checkViewport(),
    checkImageAltText(),
  ];

  const totalScore = Math.round(
    checks.reduce((sum, check) => sum + check.score, 0) / checks.length
  );

  let grade = 'F';
  if (totalScore >= 90) grade = 'A';
  else if (totalScore >= 80) grade = 'B';
  else if (totalScore >= 70) grade = 'C';
  else if (totalScore >= 60) grade = 'D';

  return {
    checks,
    totalScore,
    grade,
  };
};

// Performance monitoring for SEO
export const measurePageLoadTime = (): Promise<number> => {
  return new Promise(resolve => {
    if (typeof window === 'undefined') {
      resolve(0);
      return;
    }

    window.addEventListener('load', () => {
      const loadTime = performance.now();
      resolve(Math.round(loadTime));
    });
  });
};

// Check Core Web Vitals
export const checkCoreWebVitals = (): Promise<{
  lcp?: number;
  fid?: number;
  cls?: number;
}> => {
  return new Promise(resolve => {
    if (typeof window === 'undefined') {
      resolve({});
      return;
    }

    const metrics: { lcp?: number; fid?: number; cls?: number } = {};

    // This would typically use web-vitals library
    // For now, we'll return placeholder values
    setTimeout(() => {
      resolve(metrics);
    }, 1000);
  });
};
