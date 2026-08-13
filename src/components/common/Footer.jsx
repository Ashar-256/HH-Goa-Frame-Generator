import React from 'react';
import { Heart, Code2 } from 'lucide-react';
import { APP_INFO } from '../../constants/appConfig';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 1.5rem',
      background: 'rgba(11, 15, 25, 0.95)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Code2 size={16} color="var(--primary-cyan)" />
          <span>{APP_INFO.name} — Task 1: Project Foundation</span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Built for Hacker House Goa 2026 shortlisting evaluation &bull; Responsive, client-only architecture
        </p>
      </div>
    </footer>
  );
};
