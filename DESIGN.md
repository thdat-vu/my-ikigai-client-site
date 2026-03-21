# Design System Strategy: Modern Mystic

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Astral"**
This design system rejects the "flat and boxy" SaaS standard in favor of a layered, multi-dimensional experience. It bridges the gap between scientific precision (EdTech) and spiritual intuition (Ikigai). We achieve this by breaking the traditional grid with intentional asymmetry, where elements don't just sit on a page—they float within a cohesive, atmospheric space. 

By utilizing high-contrast typography scales and overlapping glass textures, we move away from "templates" toward a high-end editorial feel that feels both futuristic and deeply personal.

## 2. Colors & Surface Philosophy
The palette is rooted in the depth of the cosmos (`surface: #060e20`) and the electric clarity of human purpose (`primary: #5bf4de`).

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning or containment. Traditional lines create a "boxed-in" feeling that kills the spiritual energy of this system. Boundaries must be defined solely through:
*   **Background Color Shifts:** Use `surface-container-low` sections sitting on `surface` backgrounds.
*   **Tonal Transitions:** Transitioning from `surface` to `surface-container-high` to define a new content area.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass. 
*   **Base:** `surface` (#060e20)
*   **Sectioning:** `surface-container-low` (#091328)
*   **Content Cards:** `surface-container-highest` (#192540)
Instead of a flat grid, each inner container uses a slightly higher tier to define its importance, creating a natural, sophisticated sense of depth.

### The "Glass & Gradient" Rule
To move beyond a generic UI, use **Glassmorphism** for floating elements (modals, navigation, or featured cards). 
*   **Formula:** `surface-variant` at 40% opacity + `backdrop-blur: 24px`.
*   **Signature Textures:** Apply a subtle radial gradient on Hero sections, transitioning from `primary` (#5bf4de) at 10% opacity to `surface` to create a "glow" that feels like a light source behind the screen.

## 3. Typography
The typography strategy pairs the structural authority of **Manrope** for headlines with the modern, high-legibility of **Inter** for functional text.

*   **Display & Headlines (Manrope):** Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero statements. This creates an editorial, authoritative voice.
*   **Body & Labels (Inter):** Use `body-lg` (1rem) for most copy to ensure the "EdTech" side of the brand feels trustworthy and readable.
*   **Hierarchy as Identity:** Create "breathing room" by using exaggerated vertical spacing between `headline-lg` and `body-lg`. The contrast between the bold, large headlines and the clean, light body text is what defines the premium feel.

## 4. Elevation & Depth
Depth is a functional tool in this system, not just an aesthetic choice. We use **Tonal Layering** instead of structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The subtle shift in dark tones creates a "soft lift" that feels premium and organic.
*   **Ambient Shadows:** For "floating" items (CTAs or active cards), use a shadow with a 40px–60px blur at 6% opacity. The shadow color must be a tinted version of `on-surface` (#dee5ff) to mimic natural light diffraction rather than a muddy grey.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at 15% opacity. **Never use 100% opaque borders.**
*   **Glow States:** Interactive elements (buttons, active chips) should utilize a `primary` glow (8px blur, 20% opacity) to signify "energy" and "life."

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#5bf4de). Text: `on-primary` (#00594f). Shape: `full` (pill). Add a subtle `primary_container` outer glow on hover.
*   **Secondary (Glass):** Background: `surface-variant` at 20% opacity with `backdrop-blur`. Border: "Ghost Border" (15% opacity `outline`).
*   **Tertiary:** Text: `primary`. No background. Use for low-emphasis actions.

### Cards & Lists
*   **Layout:** Forbid the use of divider lines. Separate items using `Spacing-6` (2rem) of vertical white space or by alternating background tones (`surface-container-low` vs `surface-container-high`).
*   **Rounding:** Use `xl` (1.5rem) for main cards to maintain the "Soft Mystic" aesthetic.

### Input Fields
*   **Style:** Minimalist. No bottom line. Use `surface-container-highest` as the background fill with a `md` (0.75rem) corner radius.
*   **Focus State:** The border transitions from 0% opacity to 40% `primary` (#5bf4de) with a subtle outer glow.

### Signature Component: The "Ikigai Portal"
*   A custom container using `surface-variant` at 10% opacity, an `xl` corner radius, and a `primary` to `secondary` linear gradient "Ghost Border" (1px at 20% opacity). This is used for high-value insights or data visualizations.

## 6. Do's and Don'ts

### Do:
*   **DO** use white space as a structural element. If an interface feels cluttered, increase the spacing scale rather than adding a border.
*   **DO** use intentional asymmetry. Overlap a glass card 20px over a section break to create a sense of movement.
*   **DO** ensure all text on `primary` (#5bf4de) uses `on-primary` (#00594f) for AA accessibility compliance.

### Don't:
*   **DON'T** use pure black (#000000) for backgrounds. Stick to the Deep Indigo `surface` (#060e20) to maintain "visual soul."
*   **DON'T** use standard 1px dividers or "boxes within boxes" with high-contrast outlines.
*   **DON'T** use sharp 0px corners. This system is about flow and spiritual energy; use the `md` to `xl` roundedness scale.