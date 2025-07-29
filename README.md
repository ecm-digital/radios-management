# 🎨 Radiance Network Management - UX/UI Prototype

![UX/UI Prototype](https://img.shields.io/badge/🎨_Status-UX%2FUI%20PROTOTYPE-ff6b6b?style=for-the-badge)
![Not Production Ready](https://img.shields.io/badge/⚠️_NOT-PRODUCTION%20READY-red?style=for-the-badge)

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-06B6D4?logo=tailwindcss)
![Ant Design](https://img.shields.io/badge/Design%20System-Ant%20Design-0170FE?logo=antdesign)

## ⚠️ WAŻNE: To jest PROTOTYP UX/UI

**Ten projekt NIE JEST funkcjonalną aplikacją.** To prototyp stworzony wyłącznie w celu:

- 🎨 **Demonstracji umiejętności UX/UI design**
- 💻 **Pokazania znajomości React/TypeScript**
- 🎯 **Prezentacji design thinking process**
- 📱 **Demonstracji responsive design**
- ♿ **Pokazania accessibility best practices**

**Wszystkie dane są mock'owane, funkcje są symulowane, a celem jest showcase umiejętności projektowych.**

## 🎯 Cel Prototypu

Ten **prototyp UX/UI** został stworzony jako portfolio piece, demonstrując umiejętności w zakresie projektowania i implementacji nowoczesnych interfejsów użytkownika. Symuluje system zarządzania siecią radiową jako przykład aplikacji enterprise, prezentując:

- ✨ **Nowoczesny design** zgodny z wytycznymi Ant Design
- 🎨 **Spójny system projektowy** z przemyślaną paletą kolorów
- 📱 **Responsywny interfejs** dostosowany do różnych urządzeń
- 🔄 **Interaktywne komponenty** z płynnymi animacjami
- 🧩 **Modularna architektura** komponentów React
- 🎪 **Przykładowe user flows** i wzorce projektowe

## 🚀 Demo Prototypu

🔗 **[Zobacz działający prototyp UX/UI](https://github.com/ecm-digital/radios-management)**

> **Uwaga**: To jest prototyp z mock data, nie działający system zarządzania siecią!

## 📁 Więcej Case Studies

Ten projekt to część mojego portfolio UX/UI. Zobacz więcej projektów:

🏠 **[Portal Dekoracji Wnętrz - Complete Redesign](CASE_STUDY_INTERIOR_DESIGN.md)**  
📋 **[Pełne Portfolio - Wszystkie Case Studies](PORTFOLIO_INDEX.md)**

## 🛠️ Stack Technologiczny

### Frontend
- **React 18.3.1** - Biblioteka do budowy interfejsu użytkownika
- **TypeScript 5.5.3** - Typowany JavaScript dla lepszej jakości kodu
- **Vite** - Szybkie narzędzie do budowy aplikacji
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - Komponenty UI oparte na Radix UI

### Design System
- **Ant Design** - Wytyczne projektowe i paleta kolorów
- **Lucide React** - Spójny zestaw ikon
- **Responsive Design** - Mobile-first approach

### Narzędzia Deweloperskie
- **ESLint** - Linting kodu JavaScript/TypeScript
- **React Router** - Routing w aplikacji SPA
- **React Query** - Zarządzanie stanem serwera
- **React Helmet** - Zarządzanie meta tagami

## 📁 Struktura Projektu

```
src/
├── components/          # Komponenty UI
│   ├── ui/             # Podstawowe komponenty (Button, Card, Input...)
│   ├── AppSidebar.tsx  # Nawigacja boczna
│   ├── StatsCard.tsx   # Karty statystyk
│   └── ActivityFeed.tsx # Feed aktywności
├── pages/              # Strony aplikacji
│   ├── Dashboard.tsx   # Pulpit główny
│   ├── DeviceWizard.tsx # Kreator konfiguracji
│   ├── NetworkMap.tsx  # Mapa sieci
│   └── ...
├── styles/             # Style CSS
│   ├── ant-forms.css   # Style formularzy Ant Design
│   ├── typography.css  # Typografia
│   └── wizard-steps.css # Style kreatora
└── hooks/              # Custom React hooks
```

## 🎨 Demonstrowane Umiejętności UX/UI

### 📊 Dashboard Design
- **Information Architecture**: Logiczne grupowanie informacji
- **Data Visualization**: Karty statystyk z clear hierarchy
- **Micro-interactions**: Hover states i smooth animations
- **Visual Design**: Spójne kolory i typography

### 🔧 User Flow Design (Device Wizard)
- **Multi-step Process**: Intuitive wizard navigation
- **Progress Indication**: Clear visual progress tracking
- **Form Design**: Ant Design compliant forms
- **User Feedback**: Validation states i error handling

### 🧭 Navigation Design
- **Information Architecture**: Logical menu grouping
- **Interaction Design**: Active states i hover effects
- **Responsive Behavior**: Collapsible sidebar with tooltips
- **Accessibility**: Keyboard navigation support

### 🎯 Component System Design
- **Design System**: Consistent color palette i typography
- **Component States**: Hover, active, disabled, loading
- **Micro-interactions**: Subtle animations i transitions
- **Accessibility**: WCAG compliant components

## 🚀 Uruchomienie Projektu

### Wymagania
- Node.js 18+ 
- npm lub yarn

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/ecm-digital/radios-management.git
cd radios-management

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Budowanie do produkcji
npm run build
```

Aplikacja będzie dostępna pod adresem `http://localhost:8080`

## 🎨 Design System

### Paleta Kolorów
- **Primary**: `#1890ff` (Ant Design Blue)
- **Success**: `#52c41a` (Green)
- **Warning**: `#faad14` (Orange) 
- **Error**: `#f5222d` (Red)
- **Info**: `#1890ff` (Blue)

### Typografia
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Font Sizes**: 12px, 14px, 16px, 20px, 24px, 30px, 38px
- **Line Heights**: 1.23 - 1.5715

### Komponenty
- **Border Radius**: 2px (Ant Design standard)
- **Shadows**: Subtelne cienie zgodne z Material Design
- **Transitions**: 0.3s cubic-bezier dla płynnych animacji

## 📱 Responsywność

Projekt wykorzystuje mobile-first approach z breakpointami:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantyczny HTML
- ARIA labels i role
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## 🔄 Demonstrowane User Flows (Prototyp)

1. **Dashboard Overview** - Przykład information dashboard design
2. **Device Configuration Wizard** - Multi-step form UX pattern
3. **Navigation Patterns** - Sidebar navigation z responsive behavior
4. **Component Interactions** - Hover states, loading states, form validation

> **Uwaga**: To są prototypowe flows z mock data, nie rzeczywiste funkcjonalności!

## 📈 Metryki Wydajności

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🤝 Portfolio Contact

Ten **prototyp UX/UI** został stworzony jako demonstracja umiejętności w zakresie:
- UX/UI Design & Design Systems
- Frontend Development (React/TypeScript)
- Responsive Web Design
- Accessibility & Best Practices

**Autor**: Tomasz Gajda  
**Email**: [your-email@example.com]  
**Portfolio**: [your-portfolio-link]  
**LinkedIn**: [your-linkedin-profile]

> Zainteresowany współpracą w zakresie UX/UI design lub frontend development? Skontaktuj się!

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

---

*Projekt stworzony z ❤️ jako showcase umiejętności UX/UI design i React development*