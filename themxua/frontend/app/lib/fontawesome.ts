// Font Awesome configuration
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from dynamically adding its CSS since we did it manually above
config.autoAddCss = false;

export default config;
