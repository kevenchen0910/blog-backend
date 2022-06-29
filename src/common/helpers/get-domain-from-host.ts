export function getDomainFromHost(host: string): string {
  const parts = host.split('.');
  const domain = parts.slice(-2).join('.');

  if (domain.includes(':')) {
    return domain.slice(0, domain.indexOf(':'));
  }

  return domain;
}
