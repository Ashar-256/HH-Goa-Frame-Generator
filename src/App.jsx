import React from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { StatusCard } from './components/common/StatusCard';
import { MODULE_ARCHITECTURE, SYSTEM_SPECS } from './constants/appConfig';
import { CheckCircle2, ShieldCheck, Layers, Cpu, Smartphone } from 'lucide-react';

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Landing Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            marginBottom: '1.25rem'
          }}>
            <ShieldCheck size={16} color="var(--primary-cyan)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-cyan)', letterSpacing: '0.05em' }}>
              PROJECT FOUNDATION INITIALIZED
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            Hacker House Goa 2026<br />
            <span className="gradient-text">Frame Generator Application</span>
          </h2>

          <p style={{
            maxWidth: '680px',
            margin: '0 auto 2rem auto',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            The React 18 + Vite foundation has been successfully configured with a clean, scalable modular architecture for client-side face detection, focal-point cropping, Canvas frame synthesis, and social sharing.
          </p>

          {/* System Specs Bar */}
          <div className="glass-card" style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            textAlign: 'left'
          }}>
            {SYSTEM_SPECS.map((spec, index) => (
              <div key={index} style={{ borderLeft: '2px solid var(--primary-cyan)', paddingLeft: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', uppercase: 'true', letterSpacing: '0.05em' }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Readiness Grid Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={22} color="var(--primary-cyan)" />
                Architectural Modules
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Structured folder and service hierarchy configured for upcoming task implementations.
              </p>
            </div>

            <div className="badge badge-primary" style={{ padding: '0.5rem 1rem' }}>
              <CheckCircle2 size={14} /> 9 / 9 Modules Structured
            </div>
          </div>

          <div className="grid-responsive">
            {MODULE_ARCHITECTURE.map((module) => (
              <StatusCard key={module.id} module={module} />
            ))}
          </div>
        </section>

        {/* Verification & Mobile Readiness Card */}
        <section className="glass-card" style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(22, 29, 47, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          borderColor: 'rgba(0, 240, 255, 0.2)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 0, 122, 0.1)',
                border: '1px solid rgba(255, 0, 122, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-pink)',
                flexShrink: 0
              }}>
                <Smartphone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Mobile-First & Clean Execution Verified
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The application is configured to be fully responsive across mobile, tablet, and desktop viewports. All code adheres strictly to standard client-side React + Vite practices without over-engineered backend dependencies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
