# Design System Document: The Cinematic Archive

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Cinematic Archive."** 

This is not a standard utility app; it is a digital gallery where the user’s pace is intentionally slowed to appreciate the heritage of automotive engineering. We move away from the "template" look by treating the screen like a high-end editorial spread. We break the rigid grid through **intentional asymmetry**—offsetting car names from their metadata and using high-contrast typography scales. The UI should feel like gallery lighting: it exists only to illuminate the subject (the photography) and the narrative (the typography). No human figures, no illustrations—only the machine as art.

## 2. Colors
Our palette is rooted in the depth of **Obsidian Dark** and the brilliance of **Champagne Gold**. The color tokens are designed to provide a sense of luxury that feels whispered, not shouted.

*   **Primary (#e6c364 / #c9a84c):** Our "Champagne Gold." Use this sparingly for interactive highlights, thin rules, and key emphasis.
*   **Surface Hierarchy & Nesting:** To create depth without visual clutter, we utilize `surface-container` tiers. 
    *   The base of the exhibition is `surface` (#131313). 
    *   Secondary information modules should use `surface-container-low` (#1c1b1b).
    *   Interactive cards or "featured" timeline nodes should sit on `surface-container-high` (#2a2a2a) to create a soft, natural lift.
*   **The "No-Line" Rule:** Sectioning must be achieved through background shifts, not 1px solid borders. To separate a car’s history from its technical specs, transition from `surface` to `surface-container-low`. The eye should perceive a change in "room" without seeing a "fence."
*   **The Glass & Gradient Rule:** For floating navigation or overlays, use `surface-bright` (#3a3939) with a 60% opacity and a 20px backdrop-blur. This "frosted lens" effect mimics the glass of a museum display case.
*   **Signature Textures:** For high-value CTAs, use a subtle linear gradient from `primary` (#e6c364) to `primary-container` (#c9a84c) at a 45-degree angle. This adds a "metallic" soul to the button that flat color cannot replicate.

## 3. Typography
The typography is a dialogue between the heritage of the past and the precision of the present.

*   **The Soul (notoSerif / Cormorant Garamond):** Used for `display` and `headline` tiers. This font represents the "History." It should be set with generous leading. car names in `display-lg` should feel monumental.
*   **The Specs (Inter):** Used for `title`, `body`, and `label` tiers. This font represents the "Archive." It provides the technical contrast to the serif. 
*   **Hierarchy as Identity:** Use `label-sm` in all-caps with 0.1rem letter-spacing for metadata (e.g., "ENGINE TYPE" or "CIRCA 1954"). This creates an authoritative, catalog-like feel.

## 4. Elevation & Depth
In a premium environment, traditional drop shadows are too aggressive. We use **Tonal Layering** to define space.

*   **The Layering Principle:** Stack `surface-container-lowest` elements on top of `surface-container-low` sections to create a "recessed" effect, or use `surface-container-highest` for a "protruding" effect.
*   **Ambient Shadows:** If a card must float (e.g., a modal), use a shadow color tinted with `surface-container-highest` at 8% opacity. The blur should be high (40px+) and the spread low to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** Where containment is strictly required for accessibility, use the `outline-variant` (#4d4637) at 20% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use `surface-variant` with a 40% alpha for header backgrounds to maintain a cinematic bleed-through of the car photography as the user scrolls.

## 5. Components

### Buttons
*   **Primary (Pill):** Fully rounded (`full`). Background: `primary`. Text: `on-primary` (Inter, Title-sm).
*   **Secondary (Ghost):** Fully rounded (`full`). Border: `outline-variant` at 40%. Text: `primary`. No fill.
*   **Tertiary:** No container. Text: `primary` with a 1px `primary` underline offset by 4px.

### Chips (Filter & Selection)
*   **Filter Chips:** Pill-shaped. Unselected: `surface-container-high` background. Selected: `primary` background with `on-primary` text. Use `sm` rounding (0.5rem) for a more modern, technical look compared to the buttons.

### Timeline Layouts
*   **The Timeline Node:** Cards use `DEFAULT` rounding (1rem). 
*   **Separation:** Forbid the use of divider lines between cards. Use vertical white space of `2rem` (matching the `lg` roundedness scale) to let the content breathe. 
*   **The Golden Rule:** Use a single vertical 1px rule in `primary-container` only to connect timeline nodes, representing the "thread of history."

### Input Fields
*   **Style:** Minimalist. No background fill. Only a bottom border using `outline-variant`. 
*   **States:** On focus, the bottom border transitions to `primary` (Champagne Gold). Helper text uses `label-sm`.

### Cards
*   **Execution:** Forbid 100% opaque borders. Use a `surface-container-lowest` fill on a `surface` background. This creates a "submerged" look that keeps the focus on the photography within the card.

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. If a section feels "full," double the padding.
*   **Do** use asymmetrical layouts. Place a car’s year in the top-left and the car name in the bottom-right of a hero container.
*   **Do** ensure all photography has a slight "Obsidian" vignette to blend into the `#0A0A0A` background.

### Don't:
*   **Don't** use standard icons (e.g., Material Icons). If an icon is needed, it must be ultra-thin (0.5px to 1px stroke) and match the `Champagne Gold` accent.
*   **Don't** use pure white (#FFFFFF). Always use `on-surface` (#e5e2e1) to maintain the "aged paper" or "muted gallery" feel.
*   **Don't** use fast, "snappy" animations. Use ease-in-out durations of 400ms-600ms to maintain the "unhurried" luxury aesthetic.