# Code Files Analysis

This document lists all code files in the project, categorized as used or unused based on import references and actual usage in the application.

## Used Code Files

These files are actively imported and used in the application:

### App Directory
- `app/page.tsx` - Main page component
- `app/layout.tsx` - Root layout component
- `app/globals.css` - Global styles

### Components Directory
- `components/AboutSection.tsx`
- `components/AnimatedHeroText.tsx`
- `components/BlogSection.tsx`
- `components/FlowerAnimation.tsx`
- `components/FooterSection.tsx`
- `components/GradientBlinds.tsx`
- `components/HeroSection.tsx`
- `components/LoadingScreen.tsx`
- `components/Navbar.tsx`
- `components/ParticleAnimation.tsx`
- `components/ProcessSection.tsx`
- `components/ResultsSection.tsx`
- `components/ServicesSection.tsx`
- `components/TestimonialsSection.tsx`
- `components/theme-provider.tsx`

### UI Components
- `components/ui/accordion.tsx`
- `components/ui/alert-dialog.tsx`
- `components/ui/alert.tsx`
- `components/ui/aspect-ratio.tsx`
- `components/ui/avatar.tsx`
- `components/ui/badge.tsx`
- `components/ui/breadcrumb.tsx`
- `components/ui/button.tsx`
- `components/ui/calendar.tsx`
- `components/ui/card.tsx`
- `components/ui/carousel.tsx`
- `components/ui/chart.tsx`
- `components/ui/checkbox.tsx`
- `components/ui/collapsible.tsx`
- `components/ui/command.tsx`
- `components/ui/context-menu.tsx`
- `components/ui/dialog.tsx`
- `components/ui/drawer.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/form.tsx`
- `components/ui/hover-border-gradient-demo.tsx`
- `components/ui/hover-border-gradient.tsx`
- `components/ui/hover-card.tsx`
- `components/ui/input-otp.tsx`
- `components/ui/input.tsx`
- `components/ui/label.tsx`
- `components/ui/menubar.tsx`
- `components/ui/navigation-menu.tsx`
- `components/ui/pagination.tsx`
- `components/ui/popover.tsx`
- `components/ui/progress.tsx`
- `components/ui/radio-group.tsx`
- `components/ui/resizable.tsx`
- `components/ui/scroll-area.tsx`
- `components/ui/select.tsx`
- `components/ui/separator.tsx`
- `components/ui/sheet.tsx`
- `components/ui/sidebar.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/slider.tsx`
- `components/ui/sonner.tsx`
- `components/ui/switch.tsx`
- `components/ui/table.tsx`
- `components/ui/tabs.tsx`
- `components/ui/textarea.tsx`
- `components/ui/toast.tsx`
- `components/ui/toaster.tsx`
- `components/ui/toggle-group.tsx`
- `components/ui/toggle.tsx`
- `components/ui/tooltip.tsx`
- `components/ui/use-mobile.tsx`
- `components/ui/use-toast.ts`

### Hooks
- `hooks/use-mobile.ts`
- `hooks/use-toast.ts`

### Library
- `lib/utils.ts`

## Unused Code Files

These files exist in the project but are not imported or used:

### Components Directory
- `components/particle.txt` - Text file, not code

### Comps Directory (All appear to be text files, not code)
- `comps/backlight.txt`
- `comps/breath.txt`
- `comps/flower1.txt`
- `comps/flower2.txt`
- `comps/gradientnoise.txt`
- `comps/herotext.txt`
- `comps/shader.txt`
- `comps/svgnoisegradient.txt`
- `comps/textring.txt`

### Styles Directory
- `styles/globals.css` - Duplicate of app/globals.css

## Notes

- Configuration files (package.json, tsconfig.json, etc.) are not included as they are not code files in the traditional sense.
- Asset files in `public/` directory are not included.
- Node modules are excluded as they are third-party dependencies.
- The analysis is based on static import analysis; dynamic imports or runtime usage may not be captured.
