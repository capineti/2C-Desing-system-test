# 🚀 Quick Start Guide

## Paso 1: Auditoría de tu Archivo de Figma

### Checklist de Auditoría

Antes de empezar, vamos a revisar tu archivo actual de Figma. Usa este checklist:

#### ✅ Estructura General
- [ ] ¿Las páginas están organizadas lógicamente?
- [ ] ¿Hay una separación clara entre foundations, components, y screens?
- [ ] ¿Los componentes están agrupados por categorías?
- [ ] ¿Existe documentación dentro del archivo?

#### ✅ Componentes
- [ ] ¿Los componentes usan naming consistente?
- [ ] ¿Hay componentes duplicados o no utilizados?
- [ ] ¿Los componentes tienen variantes bien definidas?
- [ ] ¿Las propiedades de componentes tienen nombres claros?

#### ✅ Estilos y Variables
- [ ] ¿Se usan variables de Figma o estilos tradicionales?
- [ ] ¿Los colores tienen nombres semánticos (ej: `primary`) o descriptivos (ej: `blue-500`)?
- [ ] ¿Hay consistencia en los valores de spacing?
- [ ] ¿Los text styles están bien organizados?

#### ✅ Tokens
- [ ] ¿Existen design tokens definidos?
- [ ] ¿Los tokens siguen una convención de nombres?
- [ ] ¿Hay tokens primitivos vs semánticos?
- [ ] ¿Los componentes usan tokens o valores hardcoded?

#### ✅ Problemas Comunes
- [ ] Colores hardcoded en componentes
- [ ] Inconsistencia en spacing (ej: 15px, 17px, 19px)
- [ ] Componentes con demasiadas variantes
- [ ] Falta de documentación
- [ ] Nombres genéricos (Component 1, Frame 234)

---

## Paso 2: Setup Inicial

### 2.1 Crear Figma Access Token

1. Ve a Figma → Settings → Account
2. Scroll hasta "Personal Access Tokens"
3. Click "Create new token"
4. Nombre: `Antigravity Design System Sync`
5. Scopes necesarios:
   - ✅ File content (read)
   - ✅ Variables (read & write)
   - ✅ Comments (write)
6. Copia el token (lo necesitaremos después)

### 2.2 Instalar Tokens Studio Plugin

1. En Figma, ve a Plugins → Browse plugins
2. Busca "Tokens Studio for Figma"
3. Instala el plugin
4. Abre el plugin en tu archivo

### 2.3 Configurar Git Repository

```bash
# Crear nuevo repositorio
mkdir design-system
cd design-system

# Inicializar Git
git init

# Crear estructura de carpetas
mkdir -p tokens/{primitives,semantic,component}
mkdir -p components/{figma,react,specs}
mkdir -p docs/{auto-generated,guides,audits}
mkdir -p scripts
mkdir -p .github/workflows

# Crear .gitignore
cat > .gitignore << EOF
node_modules/
.DS_Store
.env
*.log
dist/
build/
.cache/
EOF

# Inicializar npm
npm init -y

# Instalar dependencias
npm install --save-dev \
  style-dictionary \
  @tokens-studio/sd-transforms \
  typescript \
  @types/node
```

### 2.4 Configurar Style Dictionary

Crear `style-dictionary.config.js`:

```javascript
const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

// Registrar transformaciones de Tokens Studio
registerTransforms(StyleDictionary);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
};
```

### 2.5 Configurar Tokens Studio

1. Abre Tokens Studio en Figma
2. Ve a Settings → Sync
3. Selecciona "GitHub"
4. Configura:
   - Repository: `tu-usuario/design-system`
   - Branch: `main`
   - File path: `tokens/tokens.json`
   - Personal Access Token: [tu token de GitHub]

---

## Paso 3: Crear Design Tokens Base

### 3.1 Estructura de Tokens

Crear `tokens/primitives/colors.json`:

```json
{
  "color": {
    "primitive": {
      "white": { "value": "#FFFFFF", "type": "color" },
      "black": { "value": "#000000", "type": "color" },
      "gray": {
        "50": { "value": "#F9FAFB", "type": "color" },
        "100": { "value": "#F3F4F6", "type": "color" },
        "200": { "value": "#E5E7EB", "type": "color" },
        "300": { "value": "#D1D5DB", "type": "color" },
        "400": { "value": "#9CA3AF", "type": "color" },
        "500": { "value": "#6B7280", "type": "color" },
        "600": { "value": "#4B5563", "type": "color" },
        "700": { "value": "#374151", "type": "color" },
        "800": { "value": "#1F2937", "type": "color" },
        "900": { "value": "#111827", "type": "color" }
      },
      "blue": {
        "50": { "value": "#EFF6FF", "type": "color" },
        "100": { "value": "#DBEAFE", "type": "color" },
        "200": { "value": "#BFDBFE", "type": "color" },
        "300": { "value": "#93C5FD", "type": "color" },
        "400": { "value": "#60A5FA", "type": "color" },
        "500": { "value": "#3B82F6", "type": "color" },
        "600": { "value": "#2563EB", "type": "color" },
        "700": { "value": "#1D4ED8", "type": "color" },
        "800": { "value": "#1E40AF", "type": "color" },
        "900": { "value": "#1E3A8A", "type": "color" }
      }
    }
  }
}
```

Crear `tokens/semantic/colors.json`:

```json
{
  "color": {
    "bg": {
      "primary": { "value": "{color.primitive.white}", "type": "color" },
      "secondary": { "value": "{color.primitive.gray.50}", "type": "color" },
      "tertiary": { "value": "{color.primitive.gray.100}", "type": "color" }
    },
    "text": {
      "primary": { "value": "{color.primitive.gray.900}", "type": "color" },
      "secondary": { "value": "{color.primitive.gray.600}", "type": "color" },
      "disabled": { "value": "{color.primitive.gray.400}", "type": "color" }
    },
    "brand": {
      "primary": { "value": "{color.primitive.blue.500}", "type": "color" },
      "secondary": { "value": "{color.primitive.blue.600}", "type": "color" }
    }
  }
}
```

### 3.2 Spacing Tokens

Crear `tokens/primitives/spacing.json`:

```json
{
  "spacing": {
    "0": { "value": "0", "type": "spacing" },
    "1": { "value": "4px", "type": "spacing" },
    "2": { "value": "8px", "type": "spacing" },
    "3": { "value": "12px", "type": "spacing" },
    "4": { "value": "16px", "type": "spacing" },
    "5": { "value": "20px", "type": "spacing" },
    "6": { "value": "24px", "type": "spacing" },
    "8": { "value": "32px", "type": "spacing" },
    "10": { "value": "40px", "type": "spacing" },
    "12": { "value": "48px", "type": "spacing" },
    "16": { "value": "64px", "type": "spacing" },
    "20": { "value": "80px", "type": "spacing" }
  }
}
```

### 3.3 Typography Tokens

Crear `tokens/primitives/typography.json`:

```json
{
  "font": {
    "family": {
      "sans": { "value": "Inter, system-ui, sans-serif", "type": "fontFamilies" },
      "mono": { "value": "Fira Code, monospace", "type": "fontFamilies" }
    },
    "size": {
      "xs": { "value": "12px", "type": "fontSizes" },
      "sm": { "value": "14px", "type": "fontSizes" },
      "md": { "value": "16px", "type": "fontSizes" },
      "lg": { "value": "18px", "type": "fontSizes" },
      "xl": { "value": "20px", "type": "fontSizes" },
      "2xl": { "value": "24px", "type": "fontSizes" },
      "3xl": { "value": "30px", "type": "fontSizes" },
      "4xl": { "value": "36px", "type": "fontSizes" }
    },
    "weight": {
      "regular": { "value": "400", "type": "fontWeights" },
      "medium": { "value": "500", "type": "fontWeights" },
      "semibold": { "value": "600", "type": "fontWeights" },
      "bold": { "value": "700", "type": "fontWeights" }
    },
    "lineHeight": {
      "tight": { "value": "1.2", "type": "lineHeights" },
      "normal": { "value": "1.5", "type": "lineHeights" },
      "relaxed": { "value": "1.75", "type": "lineHeights" }
    }
  }
}
```

---

## Paso 4: Scripts de Automatización

### 4.1 Build Script

Crear `scripts/build-tokens.js`:

```javascript
const StyleDictionary = require('style-dictionary');
const config = require('../style-dictionary.config');

console.log('🎨 Building design tokens...\n');

const sd = StyleDictionary.extend(config);

sd.buildAllPlatforms();

console.log('\n✅ Tokens built successfully!');
console.log('📁 Output: dist/');
```

Agregar a `package.json`:

```json
{
  "scripts": {
    "build:tokens": "node scripts/build-tokens.js",
    "watch:tokens": "nodemon --watch tokens --exec npm run build:tokens"
  }
}
```

### 4.2 Figma Sync Script

Crear `scripts/sync-from-figma.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Configurar con tu Figma Access Token
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

async function fetchFigmaVariables() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );

  const data = await response.json();
  return data;
}

async function syncFromFigma() {
  console.log('🔄 Syncing from Figma...\n');

  try {
    const variables = await fetchFigmaVariables();
    
    // Transformar variables de Figma a formato de tokens
    const tokens = transformFigmaToTokens(variables);
    
    // Guardar tokens
    fs.writeFileSync(
      path.join(__dirname, '../tokens/figma-sync.json'),
      JSON.stringify(tokens, null, 2)
    );

    console.log('✅ Sync completed!');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

function transformFigmaToTokens(figmaData) {
  // Implementar transformación según estructura de Figma
  // Este es un ejemplo simplificado
  const tokens = {};
  
  // Procesar variables de Figma
  // ...
  
  return tokens;
}

syncFromFigma();
```

### 4.3 Accessibility Audit Script

Crear `scripts/audit-accessibility.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Función para calcular contraste WCAG
function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hexColor) {
  const rgb = hexToRgb(hexColor);
  const [r, g, b] = rgb.map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function auditAccessibility() {
  console.log('♿ Running accessibility audit...\n');

  const tokens = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../dist/json/tokens.json'), 'utf8')
  );

  const report = {
    timestamp: new Date().toISOString(),
    results: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
    },
  };

  // Auditar contrastes de colores
  // Ejemplo: verificar texto sobre fondos
  const textColors = [
    tokens['color-text-primary'],
    tokens['color-text-secondary'],
  ];
  const bgColors = [
    tokens['color-bg-primary'],
    tokens['color-bg-secondary'],
  ];

  textColors.forEach(textColor => {
    bgColors.forEach(bgColor => {
      const contrast = getContrastRatio(textColor, bgColor);
      const passesAA = contrast >= 4.5;
      const passesAAA = contrast >= 7;

      report.results.push({
        test: `Contrast: ${textColor} on ${bgColor}`,
        contrast: contrast.toFixed(2),
        wcagAA: passesAA ? '✅ Pass' : '❌ Fail',
        wcagAAA: passesAAA ? '✅ Pass' : '❌ Fail',
      });

      report.summary.total++;
      if (passesAA) report.summary.passed++;
      else report.summary.failed++;
    });
  });

  // Guardar reporte
  const reportPath = path.join(
    __dirname,
    '../docs/audits/accessibility-report.json'
  );
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('✅ Audit completed!');
  console.log(`📊 Results: ${report.summary.passed}/${report.summary.total} passed`);
  console.log(`📄 Report: ${reportPath}`);
}

auditAccessibility();
```

---

## Paso 5: GitHub Actions

### 5.1 Token Build & Deploy

Crear `.github/workflows/build-tokens.yml`:

```yaml
name: Build Design Tokens

on:
  push:
    branches: [main]
    paths:
      - 'tokens/**'
  pull_request:
    branches: [main]
    paths:
      - 'tokens/**'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build tokens
        run: npm run build:tokens

      - name: Run accessibility audit
        run: node scripts/audit-accessibility.js

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: design-tokens
          path: dist/

      - name: Commit generated files
        if: github.event_name == 'push'
        run: |
          git config user.name "Design System Bot"
          git config user.email "bot@designsystem.com"
          git add dist/ docs/audits/
          git diff --quiet && git diff --staged --quiet || git commit -m "chore: Update generated tokens and audit reports"
          git push
```

### 5.2 Auto Documentation

Crear `.github/workflows/generate-docs.yml`:

```yaml
name: Generate Documentation

on:
  push:
    branches: [main]
    paths:
      - 'tokens/**'
      - 'components/**'

jobs:
  generate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Generate token documentation
        run: node scripts/generate-token-docs.js

      - name: Generate changelog
        run: node scripts/generate-changelog.js

      - name: Commit documentation
        run: |
          git config user.name "Docs Bot"
          git config user.email "docs@designsystem.com"
          git add docs/
          git commit -m "docs: Auto-update documentation [skip ci]"
          git push
```

---

## Paso 6: Primeros Componentes

### 6.1 Button Component en React

Crear `components/react/Button/Button.tsx`:

```tsx
import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  hasLeadingIcon = false,
  hasTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  children,
  onClick,
}) => {
  const classNames = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled && 'button--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {hasLeadingIcon && leadingIcon && (
        <span className="button__icon button__icon--leading">
          {leadingIcon}
        </span>
      )}
      <span className="button__label">{children}</span>
      {hasTrailingIcon && trailingIcon && (
        <span className="button__icon button__icon--trailing">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};
```

Crear `components/react/Button/Button.css`:

```css
/* Importar tokens */
@import '../../../dist/css/tokens.css';

.button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  
  /* Typography */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  
  /* Spacing */
  padding: var(--spacing-2) var(--spacing-4);
  
  /* Visual */
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease-out);
  
  /* Interaction */
  user-select: none;
}

/* Variants */
.button--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-primitive-white);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-brand-secondary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button--secondary {
  background-color: transparent;
  color: var(--color-brand-primary);
  border: 2px solid var(--color-brand-primary);
}

.button--tertiary {
  background-color: transparent;
  color: var(--color-brand-primary);
}

/* Sizes */
.button--sm {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.button--lg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}

/* States */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Icons */
.button__icon {
  display: inline-flex;
  align-items: center;
}
```

---

## Paso 7: Testing & Preview

### 7.1 Setup Storybook

```bash
npx storybook@latest init
```

Crear `components/react/Button/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_KEY',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    hasLeadingIcon: true,
    leadingIcon: <span>→</span>,
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

---

## 🎯 Checklist de Implementación

### Semana 1
- [ ] Auditar archivo de Figma existente
- [ ] Crear Figma Access Token
- [ ] Instalar Tokens Studio
- [ ] Configurar Git repository
- [ ] Crear estructura de carpetas
- [ ] Definir tokens primitivos (colors, spacing, typography)
- [ ] Primera sincronización Figma → Git

### Semana 2
- [ ] Configurar Style Dictionary
- [ ] Crear scripts de build
- [ ] Setup GitHub Actions
- [ ] Crear tokens semánticos
- [ ] Documentar convenciones de nombres
- [ ] Primera build de tokens a CSS/JS

### Semana 3
- [ ] Crear primer componente (Button)
- [ ] Setup Storybook
- [ ] Implementar accessibility audit
- [ ] Crear documentación de componente
- [ ] Testing visual

### Semana 4
- [ ] Implementar reverse sync (Code → Figma)
- [ ] Automatizar generación de documentación
- [ ] Visual regression testing
- [ ] Feedback loop a Figma

---

## 📞 Próximos Pasos

**¿Listo para empezar?**

1. Comparte tu archivo de Figma (o dime si empezamos desde cero)
2. Dime qué framework usas (React, Vue, etc.)
3. ¿Tienes componentes existentes que migrar?
4. ¿Qué componentes son prioritarios?

¡Vamos a construir el mejor sistema de diseño! 🚀
