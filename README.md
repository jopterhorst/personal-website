# Jop ter Horst - Personal Website

A sophisticated, Apple-inspired personal portfolio website featuring dynamic status tracking, live time displays, and comprehensive Apple Liquid Glass design system. This entire project was vibe-coded using **Claude Sonnet 4** through an iterative design process.

## ✨ Key Features

### 🟢 Apple-Style Live Activity
- **Dynamic Status System**: Real-time status updates based on CET timezone
- **Color-Coded Indicators**: Visual status dots with smooth pulse animations
- **Smart Scheduling**: Automatically shows working hours, family time, sleeping, weekend activities
- **Live Clock**: Real-time CET time display that updates every minute

### 🎨 Apple Liquid Glass Design
- **Glass Morphism Effects**: Sophisticated backdrop-filter blur with layered transparency
- **Smooth Interactions**: Subtle 3D transforms on hover with reduced sensitivity
- **Theme Toggle**: Seamless light/dark mode switching with system preference detection
- **Particle System**: Optimized floating background animations

### 📱 Responsive & Accessible
- **Mobile-First Design**: Optimized layouts for all screen sizes
- **Performance Optimized**: Efficient animations and reduced computational overhead
- **Clean Typography**: Apple's system fonts with proper hierarchy
- **Smooth Animations**: Hardware-accelerated transforms and transitions

### 🏗️ Professional Portfolio Structure
- **Experience Timeline**: Detailed work history with company information
- **Skills Visualization**: Animated progress bars with expertise levels
- **Project Showcase**: Featured projects with tags and external links
- **Comprehensive Footer**: Connect links, expertise areas, and service offerings

## 🛠️ Tech Stack

- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Advanced styling with custom properties, grid layouts, and glass effects
- **Vanilla JavaScript**: Real-time functionality, theme management, and DOM manipulation
- **Feather Icons**: Clean, consistent iconography
- **Apple Design Principles**: Following iOS/macOS design patterns and interactions

## 🎯 Status System

The live activity automatically displays different statuses based on CET time:

- 🟢 **Working at Mendix** (Mon-Fri, 9 AM - 6 PM)
- 🟠 **Family time** (Daily, 6 AM - 9 AM & Weekdays 6 PM - 10 PM)
- ⚫ **Sleeping** (Daily, 10 PM - 6 AM)
- 🟣 **Enjoying the weekend** (Sat-Sun, 9 AM - 10 PM)

## 📁 File Structure

```
├── index.html          # Main portfolio structure with Live Activity
├── styles.css          # Complete styling system with glass effects
├── script.js           # Interactive functionality and animations
├── assets/             # Profile images and resources
└── README.md           # This documentation
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/jopterhorst/personal-website.git
   cd personal-website
   ```

2. **Open in browser**
   ```bash
   open index.html
   ```

3. **Customize content**
   - Update personal information in `index.html`
   - Modify styling variables in `styles.css`
   - Adjust status logic in the JavaScript section

## 🎨 Customization Guide

### Color System
The design uses CSS custom properties for easy theming:
```css
:root {
  --bg-primary: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --text-primary: #1d1d1f;
  --border-color: rgba(255, 255, 255, 0.18);
}
```

### Status Configuration
Modify the time-based status logic in the JavaScript:
```javascript
if (cetDay >= 1 && cetDay <= 5 && cetHour >= 9 && cetHour < 18) {
    status = "Working at Mendix";
    statusColor = "#34C759";
}
```

## 🌐 Browser Support

- **Chrome/Edge**: Full support with hardware acceleration
- **Safari**: Native backdrop-filter support with optimal performance
- **Firefox**: Good support with minor blur effect differences
- **Mobile**: Optimized for iOS Safari and Chrome Mobile

## ⚡ Performance Optimizations

- **Reduced Particle Count**: Optimized from 12 to 6 background particles
- **Efficient Animations**: Transform-based animations using GPU acceleration
- **Minimal Reflows**: CSS custom properties for dynamic theming
- **Lazy Loading**: Intersection observers for scroll-triggered animations
- **Debounced Updates**: Time updates limited to once per minute

## 🔧 Built With Claude Sonnet 4

This entire portfolio was developed through an iterative "vibe-coding" process using Claude Sonnet 3.5, featuring:
- **Conversational Development**: Natural language requirements to production code
- **Iterative Refinement**: Continuous improvements based on feedback
- **Apple Design Expertise**: AI-guided implementation of Apple design patterns
- **Performance Optimization**: Intelligent suggestions for better UX
- **Modern Best Practices**: Current web development standards and accessibility

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!


Built with ❤️ using Apple's design principles
