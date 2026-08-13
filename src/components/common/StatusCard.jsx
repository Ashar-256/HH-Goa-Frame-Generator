import React from 'react';
import * as Icons from 'lucide-react';

export const StatusCard = ({ module }) => {
  // Dynamically resolve icon from lucide-react
  const IconComponent = Icons[module.icon] || Icons.CheckCircle;

  return (
    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(0, 240, 255, 0.08)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary-cyan)'
        }}>
          <IconComponent size={20} />
        </div>

        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-dim)',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)'
        }}>
          {module.phase}
        </span>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
        {module.name}
      </h3>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
        {module.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.75rem'
      }}>
        <span style={{ color: 'var(--text-dim)' }}>Status</span>
        <span style={{ color: 'var(--primary-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-cyan)' }}></span>
          {module.status}
        </span>
      </div>
    </div>
  );
};
