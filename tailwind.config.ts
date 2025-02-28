
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                minecraft: {
                    'dirt': '#8B5A2B',
                    'grass': '#67C52A',
                    'stone': '#7F7F7F',
                    'wood': '#A0522D',
                    'water': '#3B9AE0',
                    'lava': '#DF4E0A',
                    'sky': '#99CCFF',
                    'obsidian': '#1D1A21',
                    'gold': '#FCEB3F',
                    'iron': '#C8C8C8',
                    'coal': '#2E2E2E',
                    'diamond': '#5BE1E6',
                    'redstone': '#FF0000'
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				pixel: ['MinecraftPixel', 'monospace'],
				minecraft: ['MinecraftRegular', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'pixel-fade-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '50%': { opacity: '0.5', transform: 'scale(0.975)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'pixel-fade-out': {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.5', transform: 'scale(0.975)' },
                    '100%': { opacity: '0', transform: 'scale(0.95)' }
                },
                'block-build': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'block-break': {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.8)', opacity: '0' }
                },
                'minecraft-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }
                },
                'pickaxe-swing': {
                    '0%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(-20deg)' },
                    '100%': { transform: 'rotate(0deg)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pixel-fade-in': 'pixel-fade-in 0.4s ease-out forwards',
                'pixel-fade-out': 'pixel-fade-out 0.4s ease-out forwards',
                'block-build': 'block-build 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'block-break': 'block-break 0.3s ease-out forwards',
                'minecraft-bounce': 'minecraft-bounce 2s ease-in-out infinite',
                'pickaxe-swing': 'pickaxe-swing 0.5s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
