const meta: null|HTMLMetaElement = document.head.querySelector('meta[name="csrf-token"]');

export const csrf: string|null = meta ? meta.getAttribute('content') : null;

