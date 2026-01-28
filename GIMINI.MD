# Project Profile: React Native Accessibility Engine (Core)

## 1. Project Identity
**Name:** `@qpmtx/react-native-a11y`
**Type:** Pure TypeScript Library (React Native)
**Goal:** A strictly typed library to enforce WCAG 2.1 AAA standards in React Native apps without native code linking.
**Philosophy:** "Safety by Default" — The library actively prevents developers from shipping inaccessible code by abstracting platform differences (TalkBack vs. VoiceOver).

## 2. Core Architecture
The library avoids Redux or external state managers to remain lightweight. It uses a **Context + Reducer** pattern.

### A. State Management
* **Pattern:** `useContext` + `useReducer`.
* **Single Source of Truth:** `AccessibilityContext` holds the global state.
* **Reducer:** Handles complex state transitions for system settings (Font Scale, Reduce Motion, Screen Reader status).
* **Config:** Accepts a configuration object to toggle strictness ('AA' vs 'AAA') and feature flags.

### B. Services
* **LoggerService:** A centralized singleton for logging.
    * *Rule:* NEVER use `console.log` directly. ALWAYS use `LoggerService.info/warn/error`.
    * *Prefix:* All logs must be prefixed with `[QPMTX-A11Y]`.

### C. Logic Layer (Hooks)
* The library logic must be exposed via **Custom Hooks**.
* Hooks should handle raw device settings, component props generation, and focus management.
* *Note:* Specific hook names are decided during implementation, not enforced here.

## 3. Strict Coding Standards
You must strictly adhere to the following conventions.

| Entity | Convention | Example |
| :--- | :--- | :--- |
| **Object Definitions** | ALWAYS use `type`, NEVER `interface` | `type Config = { ... }` |
| **Type Naming** | PascalCase (No Hungarian prefixes) | `AccessibilityConfig`, `SystemState` |
| **Props** | Must end with `Props` & defined as `type` | `type ButtonProps = { ... }` |
| **Services** | Must end with `Service` | `LoggerService` |
| **Export Strategy** | Barrel files | `export * from './types'` |

## 4. Testing Strategy
We use **Jest** and **@testing-library/react-native**.

### A. Unit Testing
* Use `renderHook` to test hooks in isolation.
* *Requirement:* Mock `AccessibilityInfo` in every test suite to simulate system changes (e.g., toggling Screen Reader on/off).

### B. Integration Testing
* Test the Provider to ensure it correctly initializes the Reducer and updates context when system events fire.

## 5. File Structure
```text
src/
  ├── context/
  │   ├── AccessibilityContext.tsx  <-- The Provider
  │   └── accessibilityReducer.ts   <-- The Logic (Reducer)
  ├── hooks/
  │   └── [SpecificHooks].ts        <-- Logic abstraction
  ├── services/
  │   └── LoggerService.ts          <-- Central Logging
  ├── types/
  │   └── index.ts                  <-- Shared Type Definitions
  ├── __tests__/                    <-- Jest Tests
  └── index.ts                      <-- Main Barrier Export