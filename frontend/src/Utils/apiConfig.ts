export function getBaseUrl(): string {
    if (import.meta.env.DEV) {
        console.log('true')
      return '/api';
    }
    console.log('false')
    // In production, use the full URL
    return 'https://api.ngml.skillzserver.com';
  }