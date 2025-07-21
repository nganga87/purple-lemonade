import { config } from 'dotenv';
config();

import '@/ai/flows/validate-door-photo.ts';
import '@/ai/flows/compare-validation-photos.ts';
import '@/ai/flows/generate-address-report.ts';
