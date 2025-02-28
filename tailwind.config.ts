
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
                    'dirt-dark': '#5D3C1C',
                    'grass': '#67C52A',
                    'grass-dark': '#4A9223',
                    'stone': '#7F7F7F',
                    'stone-dark': '#4A4A4A',
                    'wood': '#A0522D',
                    'wood-dark': '#6E3A1F',
                    'water': '#3B9AE0',
                    'water-dark': '#2A72AC',
                    'lava': '#DF4E0A',
                    'lava-dark': '#A13907',
                    'sky': '#99CCFF',
                    'sky-dark': '#1D2033',
                    'obsidian': '#1D1A21',
                    'obsidian-light': '#2A2530',
                    'bedrock': '#101010',
                    'gold': '#FCEB3F',
                    'gold-dark': '#D1B62C',
                    'iron': '#C8C8C8',
                    'iron-dark': '#9B9B9B',
                    'coal': '#2E2E2E',
                    'diamond': '#5BE1E6',
                    'diamond-dark': '#3BACB0',
                    'redstone': '#FF0000',
                    'redstone-dark': '#C30000',
                    'netherite': '#342324',
                    'emerald': '#17DD62',
                    'emerald-dark': '#11A549'
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
                },
                'minecraft-rain': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' }
                },
                '3d-float': {
                    '0%': { transform: 'translateZ(0) translateY(0)' },
                    '50%': { transform: 'translateZ(20px) translateY(-10px)' },
                    '100%': { transform: 'translateZ(0) translateY(0)' }
                },
                'torch-flicker': {
                    '0%, 100%': { boxShadow: '0 0 15px 5px rgba(255, 160, 10, 0.6)' },
                    '50%': { boxShadow: '0 0 25px 8px rgba(255, 160, 10, 0.8)' }
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
                'pickaxe-swing': 'pickaxe-swing 0.5s ease-in-out',
                'minecraft-rain': 'minecraft-rain 10s linear infinite',
                '3d-float': '3d-float 4s ease-in-out infinite',
                'torch-flicker': 'torch-flicker 2s ease-in-out infinite'
			},
            boxShadow: {
                'minecraft': '5px 5px 0px rgba(0, 0, 0, 0.2)',
                'minecraft-inset': 'inset 2px 2px 0px rgba(255, 255, 255, 0.25), inset -2px -2px 0px rgba(0, 0, 0, 0.25)',
                'minecraft-btn': '5px 5px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.15), inset -1px -1px 0px rgba(0, 0, 0, 0.15)',
                'minecraft-3d': '0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3), 0 -3px 0px rgba(255, 255, 255, 0.1) inset',
                'torch': '0 0 15px 5px rgba(255, 160, 10, 0.6)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
