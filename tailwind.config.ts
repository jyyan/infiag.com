import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  darkMode: 'class',
  plugins: [typography],
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep:     'hsl(var(--bg-deep))',
          base:     'hsl(var(--bg-base))',
          elevated: 'hsl(var(--bg-elevated))',
          glass:    'hsl(var(--bg-glass))',
        },
        accent: {
          glow:    'hsl(var(--accent-glow))',
          bright:  'hsl(var(--accent-bright))',
          deep:    'hsl(var(--accent-deep))',
        },
        lumi: {
          purple: 'hsl(var(--lumi-purple))',
          pink:   'hsl(var(--lumi-pink))',
          cyan:   'hsl(var(--lumi-cyan))',
          soft:   'hsl(var(--lumi-soft))',
        },
        fg: {
          primary:   'hsl(var(--fg-primary))',
          secondary: 'hsl(var(--fg-secondary))',
          muted:     'hsl(var(--fg-muted))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-hero':  'radial-gradient(ellipse at top, hsl(var(--accent-deep) / 0.4), transparent 70%)',
        'gradient-glow':  'linear-gradient(135deg, hsl(var(--accent-glow)) 0%, hsl(var(--accent-bright)) 100%)',
        'gradient-text':  'linear-gradient(90deg, #fff 0%, hsl(var(--accent-bright)) 100%)',
        'gradient-lumi':  'linear-gradient(135deg, hsl(var(--lumi-purple)) 0%, hsl(var(--lumi-pink)) 100%)',
        'gradient-lumi-text': 'linear-gradient(90deg, hsl(var(--lumi-pink)) 0%, hsl(var(--lumi-purple)) 100%)',
        'gradient-lumi-halo': 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--lumi-purple) / 0.45) 0%, hsl(var(--lumi-pink) / 0.18) 50%, transparent 75%)',
      },
      boxShadow: {
        'glow-sm':    '0 0 12px hsl(var(--accent-glow) / 0.4)',
        'glow':       '0 0 24px hsl(var(--accent-glow) / 0.5)',
        'glow-lg':    '0 0 48px hsl(var(--accent-glow) / 0.6)',
        'inner-glow': 'inset 0 0 16px hsl(var(--accent-glow) / 0.3)',
        'lumi-glow':    '0 0 24px hsl(var(--lumi-purple) / 0.55)',
        'lumi-glow-lg': '0 0 64px hsl(var(--lumi-purple) / 0.7)',
      },
      backdropBlur: { glass: '12px' },
      fontFamily: {
        display: ['"Noto Serif TC"', '"Noto Serif SC"', 'serif'],
        sans:    ['"Noto Sans TC"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'orbit':      'orbit 20s linear infinite',
        'particle':   'particle 8s ease-in-out infinite',
        'draw-line':  'drawLine 2s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.4)' },
          '50%':      { boxShadow: '0 0 32px hsl(var(--accent-glow) / 0.8)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' },
        },
        particle: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '50%':      { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        drawLine: {
          'from': { strokeDashoffset: '1000' },
          'to':   { strokeDashoffset: '0' },
        },
      },
    },
  },
}
