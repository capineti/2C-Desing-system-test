# 🤖 Integración con UX Pilot

## Visión General

**UX Pilot** es un plugin de IA para Figma que genera pantallas completas, wireframes y UI de alta fidelidad desde prompts. La integración con tu sistema de diseño crea un flujo de trabajo potente:

```
Prompt → UX Pilot → Figma ← Antigravity (lee vía API) → Código React
                      ↓
                 Tokens Studio
                      ↓
                     Git
                      ↓
              Style Dictionary
                      ↓
                  Stitches
```

**Aclaración importante:**
- **UX Pilot** → Genera diseños EN Figma (plugin)
- **Figma** → Centro del sistema (diseño + tokens)
- **Antigravity** → Lee Figma vía API, genera código React
- **Tokens Studio** → Sincroniza tokens Figma ↔ Git
- **Git** → Source of truth
- **Style Dictionary** → Transforma tokens
- **Stitches** → CSS-in-JS para React

## Arquitectura Actualizada

### El Rol de UX Pilot

**UX Pilot es una herramienta de DISEÑO RÁPIDO**, no parte del pipeline automatizado:

```
┌─────────────────────────────────────────────────────────────────┐
│                    UX PILOT (AI Plugin)                         │
│                    [Herramienta de Diseño]                      │
│                                                                 │
│  • Plugin de Figma (integración nativa)                        │
│  • Genera wireframes y UI de alta fidelidad                    │
│  • Exporta DIRECTAMENTE a Figma con capas estructuradas        │
│  • Review de accesibilidad con IA                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Genera diseños EN Figma
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         FIGMA                                   │
│                  [Centro del Sistema]                           │
│                                                                 │
│  • Recibe diseños de UX Pilot (ya en Figma)                    │
│  • Designer refina y aplica design tokens                      │
│  • Variables y componentes organizados                         │
│  • ÚNICA fuente de diseño                                      │
└──────────┬────────────────────────────────────┬─────────────────┘
           │                                    │
           │ Tokens Studio                      │ Figma API
           │ (sync automático)                  │ (lectura)
           ▼                                    ▼
┌──────────────────────┐           ┌────────────────────────────┐
│   GIT REPOSITORY     │           │     ANTIGRAVITY            │
│  [Source of Truth]   │           │     (AI Agent)             │
│                      │           │                            │
│  • tokens.json       │           │  • Lee diseños de Figma    │
│  • component specs   │           │  • Genera código React     │
└──────────┬───────────┘           │  • Refactoriza con tokens  │
           │                       │  • Audita accesibilidad    │
           │ GitHub Actions        └────────────┬───────────────┘
           │                                    │
           ▼                                    │
┌──────────────────────┐                        │
│  STYLE DICTIONARY    │                        │
│  [Transformación]    │                        │
│                      │                        │
│  Genera:             │                        │
│  • CSS Variables     │                        │
│  • Stitches Config   │                        │
└──────────┬───────────┘                        │
           │                                    │
           └────────────────┬───────────────────┘
                            │
                            ▼
              ┌────────────────────────┐
              │  STITCHES + REACT      │
              │  [Implementación]      │
              │                        │
              │  • Type-safe           │
              │  • Tokens aplicados    │
              │  • Production-ready    │
              └────────┬───────────────┘
                       │
                       ▼
              ┌────────────────────────┐
              │     STORYBOOK          │
              │  [Documentación]       │
              │                        │
              │  • Preview             │
              │  • Documenta           │
              │  • Testa               │
              └────────────────────────┘
```

### Flujo Correcto

**Conexiones clave:**

1. **UX Pilot → Figma**: Plugin genera diseños directamente EN Figma
2. **Figma → Git**: Tokens Studio sincroniza tokens automáticamente  
3. **Figma → Antigravity**: Antigravity lee diseños vía Figma API
4. **Git → Style Dictionary**: Transforma tokens a código
5. **Antigravity + Tokens → React**: Código final con design system

**UX Pilot NO está en el pipeline automático:**

```
DISEÑO RÁPIDO (Manual):
UX Pilot (plugin) → Figma (refinar)

PIPELINE AUTOMÁTICO (Bidireccional):
Figma ↔ Git ↔ Código
  ↓
Antigravity (lee Figma, genera código)
```

---

## Flujo de Trabajo Completo

### IMPORTANTE: Dos Flujos Separados

**1. UX Pilot (Diseño Rápido - Manual)**
- Solo para prototipado y exploración
- NO conectado al pipeline automático
- Export manual a Figma

**2. Figma ↔ Antigravity (Pipeline Automático)**
- Sincronización bidireccional
- Automatizado con Git
- Aquí es donde ocurre "la magia"

---

### Fase 1: Diseño Rápido con UX Pilot (OPCIONAL)

> **Nota:** Esta fase es OPCIONAL. Puedes diseñar directamente en Figma si prefieres.

#### 1.1 Crear Prompt Efectivo

**Estructura de Prompt Recomendada:**

```
[Tipo de pantalla] + [Propósito] + [Elementos clave] + [Estilo] + [Restricciones]
```

**Ejemplo Básico:**
```
Create a dashboard screen for a sales analytics app with:
- Header with logo and user profile
- Sidebar navigation with icons
- Main content area with 4 metric cards showing revenue, users, conversion rate, and growth
- Interactive line chart showing monthly trends
- Data table with recent transactions
- Modern, clean design with blue accent color
- Mobile responsive layout
```

**Ejemplo Avanzado (usando tu Design System):**
```
Create a product listing page with:

Layout:
- Sticky header with search bar and cart icon
- Left sidebar with filters (categories, price range, ratings)
- Grid of product cards (3 columns on desktop, 1 on mobile)
- Pagination at bottom

Components needed:
- ProductCard with image, title, price, rating, and "Add to Cart" button
- FilterGroup with checkboxes
- SearchBar with icon
- PriceRangeSlider

Design System:
- Use Inter font family
- Primary color: #3B82F6 (blue-500)
- Spacing: 8px base grid
- Border radius: 8px for cards
- Shadows: subtle elevation for cards

Accessibility:
- Ensure WCAG AA contrast
- Keyboard navigable filters
- Screen reader friendly labels
```

#### 1.2 Generar en UX Pilot

1. Ir a [UX Pilot](https://labs.google/stitch)
2. Ingresar el prompt
3. Revisar la pantalla generada
4. Iterar con prompts adicionales:
   ```
   "Make the cards more compact"
   "Add hover effects to the product cards"
   "Increase spacing between sections"
   ```

#### 1.3 Exportar a Figma (SOLO Figma)

**Único export que usamos:**

1. **Figma** (✅ Recomendado - ÚNICO que usamos)
   - Click "Export to Figma"
   - Se crea un archivo con capas editables
   - Auto Layout ya configurado
   - Componentes organizados
   
   **Este es el ÚNICO export que necesitas. El código se genera después desde Figma con Antigravity.**

**NO uses estos exports:**
- ❌ React Code - No lo necesitas, Antigravity lo genera mejor desde Figma
- ❌ HTML/CSS - No lo necesitas, solo usamos Figma

---

### Fase 2: Refinamiento en Figma (AQUÍ EMPIEZA LA MAGIA)

#### 2.1 Importar a tu Design System File

```
1. Abrir archivo generado por Stitch en Figma
2. Copiar componentes necesarios
3. Pegar en tu archivo de Design System
4. Organizar en la sección correcta (Screens / Components)
```

#### 2.2 Aplicar Design Tokens

**Proceso de Auditoría:**

1. **Colores**
   - ❌ Identificar colores hardcoded
   - ✅ Reemplazar con variables del sistema
   ```
   Antes: #3B82F6 (hardcoded)
   Después: {color-brand-primary} (variable)
   ```

2. **Spacing**
   - ❌ Valores arbitrarios (15px, 23px)
   - ✅ Valores del sistema (16px, 24px)
   ```
   Antes: padding 15px
   Después: padding {spacing-4} (16px)
   ```

3. **Typography**
   - ❌ Font sizes inconsistentes
   - ✅ Text styles del sistema
   ```
   Antes: Font size 17px, weight 500
   Después: Text style "Body/Medium"
   ```

4. **Componentes**
   - ❌ Componentes locales
   - ✅ Componentes del design system
   ```
   Antes: Button local en la pantalla
   Después: Instancia de "Inputs/Button/Primary"
   ```

#### 2.3 Crear Componentes Reutilizables

Si Stitch generó algo nuevo que vale la pena:

```
1. Seleccionar elemento
2. Create Component (Cmd/Ctrl + Alt + K)
3. Nombrar según convención: "Category / Component / Variant"
4. Aplicar variables del sistema
5. Configurar variantes y propiedades
6. Mover a sección de Components
7. Documentar uso
```

---

### Fase 3: Sincronización con Git

#### 3.1 Actualizar Tokens (si es necesario)

Si Stitch introdujo nuevos valores que quieres adoptar:

```json
// tokens/component/product-card.json
{
  "product-card": {
    "padding": {
      "value": "{spacing-4}",
      "type": "spacing"
    },
    "border-radius": {
      "value": "{radius-lg}",
      "type": "borderRadius"
    },
    "shadow": {
      "value": "{shadow-md}",
      "type": "boxShadow"
    },
    "image-height": {
      "value": "240px",
      "type": "sizing"
    }
  }
}
```

#### 3.2 Exportar Componentes

Usar Figma API o plugin para exportar specs:

```javascript
// scripts/export-from-figma.js
async function exportComponent(componentId) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${componentId}`,
    {
      headers: { 'X-Figma-Token': FIGMA_TOKEN }
    }
  );
  
  const data = await response.json();
  
  // Guardar spec del componente
  fs.writeFileSync(
    `components/figma/${componentName}.json`,
    JSON.stringify(data, null, 2)
  );
}
```

---

### Fase 4: Refactorización con Antigravity

#### 4.1 Analizar Código de Stitch

**Antigravity puede:**

1. **Auditar el código generado**
   ```
   Prompt: "Analiza este código React generado por UX Pilot 
   y dame un reporte de:
   - Valores hardcoded que deberían ser tokens
   - Componentes que deberían usar nuestro design system
   - Problemas de accesibilidad
   - Oportunidades de refactorización"
   ```

2. **Generar versión refactorizada**
   ```
   Prompt: "Refactoriza este componente para:
   - Usar Stitches en lugar de CSS inline
   - Aplicar tokens de nuestro design system
   - Usar componentes existentes (Button, Card, etc.)
   - Mejorar accesibilidad
   - Añadir TypeScript types"
   ```

#### 4.2 Ejemplo de Refactorización

**Código Original de UX Pilot:**

```jsx
// Generado por UX Pilot
function ProductCard({ product }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <img 
        src={product.image} 
        style={{ width: '100%', height: '240px', objectFit: 'cover' }}
      />
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '12px' }}>
        {product.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
        {product.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#3B82F6' }}>
          ${product.price}
        </span>
        <button style={{
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
        }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

**Código Refactorizado con Stitches + Design System:**

```tsx
// Refactorizado por Antigravity
import { styled } from '../../stitches.config';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const ProductImage = styled('img', {
  width: '100%',
  height: '$productCardImageHeight', // Token del sistema
  objectFit: 'cover',
  borderRadius: '$md $md 0 0',
});

const ProductTitle = styled('h3', {
  fontSize: '$lg',
  fontWeight: '$semibold',
  color: '$textPrimary',
  marginTop: '$3',
  lineHeight: '$tight',
});

const ProductDescription = styled('p', {
  fontSize: '$sm',
  color: '$textSecondary',
  marginTop: '$2',
  lineHeight: '$normal',
});

const ProductFooter = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '$4',
});

const ProductPrice = styled('span', {
  fontSize: '$xl',
  fontWeight: '$bold',
  color: '$brandPrimary',
});

export interface ProductCardProps {
  product: {
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
  };
  onAddToCart?: (productId: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card variant="elevated">
      <ProductImage 
        src={product.image} 
        alt={product.title}
        loading="lazy"
      />
      <Card.Content>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => onAddToCart?.(product.id)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </Button>
        </ProductFooter>
      </Card.Content>
    </Card>
  );
};
```

**Mejoras aplicadas:**
- ✅ Usa Stitches en lugar de inline styles
- ✅ Todos los valores son tokens del sistema
- ✅ Reutiliza componentes existentes (Button, Card)
- ✅ TypeScript con interfaces
- ✅ Accesibilidad mejorada (alt, aria-label, loading)
- ✅ Código más limpio y mantenible

---

### Fase 5: Testing & Feedback Loop

#### 5.1 Preview en Storybook

```tsx
// ProductCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: '1',
      image: 'https://picsum.photos/400/240',
      title: 'Premium Wireless Headphones',
      description: 'High-quality sound with active noise cancellation',
      price: 299.99,
    },
  },
};

export const LongTitle: Story = {
  args: {
    product: {
      id: '2',
      image: 'https://picsum.photos/400/240',
      title: 'Ultra Premium Wireless Noise-Cancelling Over-Ear Headphones with Spatial Audio',
      description: 'Experience immersive sound',
      price: 399.99,
    },
  },
};
```

#### 5.2 Visual Regression Testing

```javascript
// tests/visual/ProductCard.spec.ts
import { test, expect } from '@playwright/test';

test('ProductCard matches Figma design', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/components-molecules-productcard--default');
  
  // Esperar que el componente cargue
  await page.waitForSelector('[data-testid="product-card"]');
  
  // Capturar screenshot
  const screenshot = await page.screenshot();
  
  // Comparar con baseline de Figma
  expect(screenshot).toMatchSnapshot('product-card-default.png');
});
```

#### 5.3 Feedback a Figma

Si encuentras discrepancias:

```javascript
// scripts/create-figma-feedback.js
async function createFigmaComment(fileKey, nodeId, message) {
  await fetch(
    `https://api.figma.com/v1/files/${fileKey}/comments`,
    {
      method: 'POST',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        client_meta: {
          node_id: nodeId,
        },
      }),
    }
  );
}

// Uso
createFigmaComment(
  'FILE_KEY',
  'NODE_ID',
  `🤖 Antigravity Feedback:
  
  Visual regression test found differences:
  - Card padding: 16px in Figma, 20px works better for touch targets
  - Button size: Consider using 'md' size for better mobile UX
  
  Suggested changes:
  1. Increase card padding to 20px (spacing-5)
  2. Update button to size='md'
  
  Preview: https://storybook.example.com/...`
);
```

---

## Workflow Automatizado

### GitHub Action: Stitch → Refactor → Deploy

```yaml
name: Process UX Pilot Export

on:
  workflow_dispatch:
    inputs:
      stitch_export_url:
        description: 'URL del export de UX Pilot'
        required: true
      component_name:
        description: 'Nombre del componente'
        required: true

jobs:
  process:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Download Stitch Export
        run: |
          curl -o stitch-export.zip ${{ github.event.inputs.stitch_export_url }}
          unzip stitch-export.zip -d stitch-export/
      
      - name: Analyze with Antigravity
        run: |
          # Aquí Antigravity analiza el código
          node scripts/analyze-stitch-export.js \
            --input stitch-export/ \
            --component ${{ github.event.inputs.component_name }}
      
      - name: Refactor Code
        run: |
          # Antigravity refactoriza el código
          node scripts/refactor-to-stitches.js \
            --input stitch-export/ \
            --output components/
      
      - name: Run Tests
        run: |
          npm run test
          npm run test:a11y
      
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          title: 'feat: Add ${{ github.event.inputs.component_name }} from UX Pilot'
          body: |
            ## 🤖 Auto-generated from UX Pilot
            
            Component: ${{ github.event.inputs.component_name }}
            
            ### Changes
            - ✅ Refactored to use Stitches
            - ✅ Applied design tokens
            - ✅ Added TypeScript types
            - ✅ Improved accessibility
            
            ### Review Checklist
            - [ ] Visual matches Figma design
            - [ ] All tokens are from design system
            - [ ] Accessibility tests pass
            - [ ] Storybook story created
          branch: stitch-import/${{ github.event.inputs.component_name }}
```

---

## Best Practices

### 1. Prompts Efectivos para Stitch

**✅ DO:**
```
- Ser específico con medidas y colores
- Mencionar tu design system
- Especificar responsive behavior
- Incluir requisitos de accesibilidad
- Pedir componentes modulares
```

**❌ DON'T:**
```
- Prompts vagos ("make it nice")
- Ignorar tu design system existente
- Pedir todo en una sola pantalla
- Olvidar mobile/tablet
```

### 2. Cuándo Usar Stitch vs Diseñar en Figma

**Usar UX Pilot para:**
- ✅ Prototipos rápidos
- ✅ Exploración de ideas
- ✅ Pantallas complejas con muchos elementos
- ✅ Generar variaciones rápidamente
- ✅ Kickstart de nuevos proyectos

**Diseñar directamente en Figma para:**
- ✅ Componentes del design system
- ✅ Refinamiento de detalles
- ✅ Animaciones complejas
- ✅ Branding y identidad visual

### 3. Refactorización Sistemática

**Checklist de Refactorización:**

```
[ ] Reemplazar inline styles con Stitches
[ ] Aplicar design tokens (colors, spacing, typography)
[ ] Usar componentes existentes del design system
[ ] Añadir TypeScript types
[ ] Mejorar accesibilidad (ARIA, keyboard nav)
[ ] Optimizar performance (lazy loading, memoization)
[ ] Añadir tests (unit, visual regression)
[ ] Crear Storybook story
[ ] Documentar uso y props
[ ] Review de código
```

---

## Ejemplo Completo: Dashboard

### 1. Prompt para UX Pilot

```
Create a sales analytics dashboard with:

Layout:
- Top navigation bar with logo, search, notifications, and user menu
- Left sidebar with navigation items (Dashboard, Analytics, Reports, Settings)
- Main content area with:
  - Welcome header with user name and date
  - 4 metric cards in a row (Revenue, Orders, Customers, Conversion Rate)
  - Large line chart showing sales trends (last 30 days)
  - Data table with recent orders (5 rows)
  - "View All" button below table

Design System:
- Font: Inter
- Primary color: #3B82F6
- Background: #F9FAFB
- Card background: #FFFFFF
- Text primary: #111827
- Text secondary: #6B7280
- Spacing: 8px grid (8, 16, 24, 32px)
- Border radius: 8px for cards
- Shadows: subtle elevation (0 2px 8px rgba(0,0,0,0.1))

Components:
- MetricCard: icon, label, value, change percentage
- Chart: responsive, interactive tooltips
- Table: sortable columns, row hover effect
- Navigation: active state indicator

Responsive:
- Desktop: 4 metric cards in row
- Tablet: 2 metric cards in row
- Mobile: 1 metric card per row, stack all elements

Accessibility:
- WCAG AA contrast
- Keyboard navigation
- Screen reader labels
- Focus indicators
```

### 2. Export y Refactorización

```tsx
// Dashboard.tsx (refactorizado)
import { styled } from '../../stitches.config';
import { MetricCard } from '../MetricCard/MetricCard';
import { Chart } from '../Chart/Chart';
import { DataTable } from '../DataTable/DataTable';
import { Button } from '../Button/Button';

const DashboardLayout = styled('div', {
  display: 'grid',
  gridTemplateColumns: '240px 1fr',
  minHeight: '100vh',
  backgroundColor: '$bgSecondary',
  
  '@mobile': {
    gridTemplateColumns: '1fr',
  },
});

const MainContent = styled('main', {
  padding: '$8',
  
  '@mobile': {
    padding: '$4',
  },
});

const WelcomeHeader = styled('header', {
  marginBottom: '$6',
});

const MetricsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$6',
  marginBottom: '$8',
  
  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  '@mobile': {
    gridTemplateColumns: '1fr',
  },
});

const ChartSection = styled('section', {
  backgroundColor: '$bgPrimary',
  borderRadius: '$lg',
  padding: '$6',
  marginBottom: '$8',
  boxShadow: '$sm',
});

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Sidebar />
      <MainContent>
        <WelcomeHeader>
          <h1>Welcome back, Sarah!</h1>
          <p>Here's what's happening with your store today.</p>
        </WelcomeHeader>
        
        <MetricsGrid>
          <MetricCard
            icon={<DollarIcon />}
            label="Revenue"
            value="$45,231"
            change="+12.5%"
            trend="up"
          />
          <MetricCard
            icon={<ShoppingBagIcon />}
            label="Orders"
            value="1,234"
            change="+8.2%"
            trend="up"
          />
          <MetricCard
            icon={<UsersIcon />}
            label="Customers"
            value="892"
            change="+5.1%"
            trend="up"
          />
          <MetricCard
            icon={<TrendingUpIcon />}
            label="Conversion"
            value="3.24%"
            change="-0.4%"
            trend="down"
          />
        </MetricsGrid>
        
        <ChartSection>
          <h2>Sales Trends</h2>
          <Chart data={salesData} />
        </ChartSection>
        
        <DataTable
          title="Recent Orders"
          data={recentOrders}
          columns={orderColumns}
        />
        
        <Button variant="secondary" fullWidth>
          View All Orders
        </Button>
      </MainContent>
    </DashboardLayout>
  );
};
```

---

## Resumen del Flujo

```
1. 💭 Idear → Crear prompt detallado
2. 🤖 UX Pilot → Generar pantalla
3. 🎨 Figma → Refinar diseño, aplicar tokens
4. 🔄 Git → Sincronizar cambios
5. 🧠 Antigravity → Analizar y refactorizar código
6. 💅 Stitches → Implementar con design system
7. 📚 Storybook → Documentar y preview
8. ✅ Testing → Visual regression + A11y
9. 💬 Feedback → Comentarios en Figma si hay discrepancias
10. 🚀 Deploy → Producción
```

---

## Próximos Pasos

1. **Probar UX Pilot**
   - Crear cuenta en [UX Pilot](https://labs.google/stitch)
   - Generar primera pantalla
   - Exportar a Figma

2. **Configurar integración**
   - Setup Figma API
   - Crear scripts de refactorización
   - Configurar GitHub Actions

3. **Definir convenciones**
   - Template de prompts
   - Checklist de refactorización
   - Proceso de review

¿Listo para empezar a usar UX Pilot? 🚀
