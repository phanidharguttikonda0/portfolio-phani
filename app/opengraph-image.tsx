import { ImageResponse } from 'next/og';

export const alt = 'Phanidhar Reddy | Cloud Backend & Distributed Systems Specialist';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0b1110',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#e1ece5',
          border: '1px solid #22352b',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '28px',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#10b981',
              }}
            />
            phani.pro
          </div>
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '18px',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            Available: 20 hrs/week ($500/wk)
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '22px',
              fontFamily: 'monospace',
              color: '#10b981',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            AWS INFRASTRUCTURE & DISTRIBUTED SYSTEMS ARCHITECT
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            Guttikonda Phanidhar Reddy
          </div>
          <div
            style={{
              fontSize: '26px',
              color: '#8ca396',
              maxWidth: '960px',
              lineHeight: 1.4,
            }}
          >
            Eliminating database connection starvation, designing isolated 3-tier AWS VPCs via Terraform, and engineering sub-50ms backends in Rust (Tokio) and Go.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #182720',
            paddingTop: '30px',
            fontFamily: 'monospace',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#34d399' }}>48.7ms</div>
            <div style={{ fontSize: '14px', color: '#718b7e' }}>p99 WebSocket Latency</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>153</div>
            <div style={{ fontSize: '14px', color: '#718b7e' }}>Production REST Endpoints</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#93c5fd' }}>274ns</div>
            <div style={{ fontSize: '14px', color: '#718b7e' }}>Tokio MPSC Dispatch</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#a855f7' }}>100% IaC</div>
            <div style={{ fontSize: '14px', color: '#718b7e' }}>Modular AWS Terraform</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
