# Radiance Network Management - UX/UI Prototype

![Radiance Network Management](https://img.shields.io/badge/Status-UX%2FUI%20Prototype-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-06B6D4?logo=tailwindcss)
![Ant Design](https://img.shields.io/badge/Design%20System-Ant%20Design-0170FE?logo=antdesign)

## 🎯 Cel Projektu

Ten projekt to **prototyp UX/UI** stworzony w celu demonstracji umiejętności projektowania i implementacji nowoczesnych interfejsów użytkownika. Symuluje system zarządzania siecią radiową, prezentując:

- ✨ **Nowoczesny design** zgodny z wytycznymi Ant Design
- 🎨 **Spójny system projektowy** z przemyślaną paletą kolorów
- 📱 **Responsywny interfejs** dostosowany do różnych urządzeń
- 🔄 **Interaktywne komponenty** z płynnymi animacjami
- 🧩 **Modularna architektura** komponentów React
- 🎪 **Przykładowe user flows** i wzorce projektowe

## 🚀 Demo

🔗 **[Zobacz działający prototyp](https://github.com/ecm-digital/radios-management)**

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

## 🎨 Funkcje UX/UI

### 📊 Dashboard
- Karty statystyk z animacjami hover
- Feed aktywności z różnymi typami zdarzeń
- Responsywny grid layout
- Spójne kolory statusów

### 🔧 Device Wizard
- Wieloetapowy kreator konfiguracji
- Wizualny wskaźnik postępu (Steps)
- Formularze zgodne z Ant Design
- Walidacja i feedback użytkownika

### 🧭 Nawigacja
- Sidebar z grupowaniem logicznym
- Aktywne stany nawigacji
- Tooltips dla zwinięty stan
- Smooth transitions

### 🎯 Komponenty UI
- Spójny system kolorów
- Różne stany komponentów (hover, active, disabled)
- Mikrointerakcje i animacje
- Accessibility compliance

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

## 🔄 Przykładowe User Flows

1. **Dashboard Overview** - Przegląd stanu sieci
2. **Device Configuration** - Konfiguracja urządzeń przez kreator
3. **Network Monitoring** - Monitorowanie aktywności sieci
4. **Alert Management** - Zarządzanie alertami i powiadomieniami

## 📈 Metryki Wydajności

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🤝 Kontakt

Ten projekt został stworzony jako demonstracja umiejętności UX/UI design i frontend development.

**Autor**: Tomasz Gajda  
**Email**: [kontakt@example.com]  
**Portfolio**: [portfolio-link]  
**LinkedIn**: [linkedin-profile]

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

---

*Projekt stworzony z ❤️ jako showcase umiejętności UX/UI design i React development*