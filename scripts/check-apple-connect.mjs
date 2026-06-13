import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const required = [
  'EXPO_APPLE_ID',
  'EXPO_ASC_APP_ID',
  'EXPO_ASC_API_KEY_ID',
  'EXPO_ASC_API_KEY_ISSUER_ID',
  'EXPO_ASC_API_KEY_PATH'
];

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing App Store Connect environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const keyPath = resolve('apps/mobile', process.env.EXPO_ASC_API_KEY_PATH);
if (!existsSync(keyPath)) {
  console.error(`App Store Connect API key file was not found: ${keyPath}`);
  process.exit(1);
}

console.log('App Store Connect configuration is present for EAS Submit.');
