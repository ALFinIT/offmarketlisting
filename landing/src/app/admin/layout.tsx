import type { ReactNode } from 'react';
import MarketsProvider from '../providers/MarketsProvider';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <MarketsProvider>{children}</MarketsProvider>;
}
