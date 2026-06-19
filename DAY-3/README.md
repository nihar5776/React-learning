# React Props — Complete Notes

> Compiled from a video tutorial on React Props. Includes concept explanations, the JavaScript-function analogy used to build intuition, code examples, and a mini-project (reusable Pizza Card).

---

## Table of Contents

1. [What are Props?](#1-what-are-props)
2. [The JavaScript Analogy](#2-the-javascript-analogy)
3. [Three Core Features of Props](#3-three-core-features-of-props)
4. [Setting Up: Parent → Child](#4-setting-up-parent--child)
5. [Two Ways to Access Props](#5-two-ways-to-access-props)
6. [Props are Read-Only (Immutability)](#6-props-are-read-only-immutability)
7. [Multiple Props & Props as an Object](#7-multiple-props--props-as-an-object)
8. [Mini Project: Reusable Pizza Card](#8-mini-project-reusable-pizza-card)
9. [Quick-Revision Cheat Sheet](#9-quick-revision-cheat-sheet)
10. [Interview Questions & Answers](#10-interview-questions--answers)
11. [Practice Assignment](#11-practice-assignment)

---

## 1. What are Props?

**Props = Properties.**

> **Props are used to send data from one component to another component.**

Since a React **component** is essentially just a **JavaScript function**, sending data from one component to another is conceptually identical to passing **arguments** from one function to another.

```
Plain JS:     Function A  --(arguments)-->  Function B
React:        Parent Component --(props)--> Child Component
```

Props are the mechanism React uses for **component communication** — specifically, **one-way (parent → child) data flow**.

---

## 2. The JavaScript Analogy

This is the foundation the entire video builds on. Understanding this mapping makes props trivial.

| JavaScript Concept | React Equivalent |
|---|---|
| Function | Component |
| Passing arguments to a function | Passing props to a component |
| Function receiving parameters | Component receiving `props` |
| Accessing parameter inside function | Accessing `props.xyz` inside component |

### Plain JavaScript Example

```javascript
function parent() {
  const name = "Rohit";
  const age = 21;

  child(name, age); // sending data — like sending props
}

function child(name, age) {
  console.log(name, age); // receiving data — like receiving props
}

parent();
// Output: Rohit 21
```

🔑 **Key takeaway:** Whatever data you pass from one function to another in JS is conceptually the same as what you pass from a Parent component to a Child component in React — React just formalizes and automates this pattern.

---

## 3. Three Core Features of Props

### a) Props make components **Dynamic**

If you change the *values* of the variables being passed (e.g., `name = "Surya"`, `age = 20` instead of `"Rohit"`, `21`), the **same function/component** automatically reflects the new data — no structural code change needed.

```javascript
// Just change the values passed in:
child("Surya", 20);
// Same child function, different output — that's dynamic behavior
```

### b) Props make components **Reusable**

Because you don't need to create a *new* component for different data — you simply pass different values into the **same** component — that component becomes reusable across the app.

```jsx
<Child name="Rohit" age={21} />
<Child name="Surya" age={20} />
// Same <Child /> component reused with different data
```

### c) Props enable **Parent ↔ Child Communication**

Changes made to data in the Parent are reflected in the Child when passed via props — enabling structured, predictable communication between components.

---

## 4. Setting Up: Parent → Child

### Step-by-step Setup

```bash
npm create vite@latest
# choose project name → React → JavaScript
npm run dev
```

### File Naming Rule ⚠️

> **The first letter of a component's file name (and the component itself) must always be Capital.**
> Example: `Child.jsx` ✅  `child.jsx` ❌ (will throw an error / not work as a component)

### Folder Structure Used

```
src/
 ├── App.jsx          (Parent Component)
 ├── components/
 │    └── Child.jsx   (Child Component)
 └── assets/
      └── pizza.jpg
```

### Passing Data — Parent Side (`App.jsx`)

```jsx
import Child from "./components/Child";

function App() {
  const name = "Rohit";
  const age = 21;

  return (
    <div>
      <Child name={name} age={age} />
    </div>
  );
}

export default App;
```

- Props are passed like **HTML attributes**: `name={name}` `age={age}`
- Each `attribute="value"` pair becomes a key-value pair in the props object automatically.

### Receiving Data — Child Side (`Child.jsx`)

```jsx
function Child(props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.age}</p>
    </div>
  );
}

export default Child;
```

### Diagram: Data Flow

```
┌─────────────────────────┐
│   App.jsx (Parent)      │
│                          │
│   name = "Rohit"         │
│   age  = 21               │
│                          │
│   <Child name={name}    │
│          age={age} />    │───────┐
└─────────────────────────┘        │  props passed as attributes
                                    ▼
┌─────────────────────────┐
│  Child.jsx (Child)       │
│                          │
│  function Child(props)  │
│    props.name → Rohit   │
│    props.age  → 21      │
└─────────────────────────┘
```

---

## 5. Two Ways to Access Props

### Way 1 — `props.propertyName` (Dot Notation)

```jsx
function Child(props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.age}</p>
    </div>
  );
}
```

**Why dot notation?** Because internally, React collects *all* the attributes you pass into a **single object** called `props`. So you must access individual values the same way you'd access properties of any JS object.

```javascript
// This is exactly what React does behind the scenes (conceptually):
const props = { name: "Rohit", age: 21, country: "India" };
console.log(props.name);  // Rohit
console.log(props.age);   // 21
```

JS Analogy:

```javascript
function child(props) {
  console.log(props.name, props.age);
}

const data = { name: "Rohit", age: 21 };
child(data); // passing a single object, same as React props
```

### Way 2 — Destructuring Props

Instead of repeating `props.` every time, destructure directly in the function parameter:

```jsx
function Child({ name, age, country }) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{country}</p>
    </div>
  );
}
```

✅ Cleaner, more readable, and the **industry-preferred** style.

> ⚠️ Important: Use `{ }` (curly braces) for destructuring in the parameter — not just `(props)`.

---

## 6. Props are Read-Only (Immutability)

> **Props are read-only and cannot be modified inside the Child component.**

This is one of React's core rules (related to **one-way data binding**).

### Demonstration from the video

```jsx
function Child(props) {
  age = 50; // ❌ trying to "modify" the prop value directly

  console.log(age); // logs 50 in console — but...

  return <p>{props.age}</p>;
}
```

**What actually happens:**
- The webpage *may visually appear* to show `50` due to how the example was structured, but the **original variable in the Parent is NOT changed**.
- The actual `age` variable declared with `const` in the Parent **remains 20 (or whatever it originally was)** — it is unaffected.
- Reassigning/mutating a prop inside the Child does **not propagate back** to the Parent.

### Why this matters (Interview Angle)

This is **one-way data flow**: data flows **Parent → Child only**. A Child can *read* and *use* a prop, but cannot send updates back upstream by mutating it directly. (To send data back up, you'd need callback functions passed as props — a separate, more advanced pattern.)

```
Parent (source of truth)
   │
   │  props (read-only)
   ▼
Child (consumer only — cannot modify the original)
```

---

## 7. Multiple Props & Props as an Object

You can pass **as many props as you like** — React automatically bundles them into one `props` object.

```jsx
// Parent
<Child name="Rohit" age={21} country="India" />
```

```jsx
// Child — receiving multiple props
function Child(props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.age}</p>
      <p>{props.country}</p>
    </div>
  );
}
```

Conceptually, React converts this:
```jsx
<Child name="Rohit" age={21} country="India" />
```
into this object automatically:
```javascript
props = {
  name: "Rohit",
  age: 21,
  country: "India"
}
```

This mirrors the manual JS pattern:

```javascript
const data = { name: "Rohit", age: 21, country: "India" };
child(data);

function child(props) {
  console.log(props.name, props.age, props.country);
}
```

---

## 8. Mini Project: Reusable Pizza Card

**Goal:** Build a reusable `Card` component that displays a pizza image, title, and price — driven entirely by props.

### Folder Structure

```
src/
 ├── App.jsx
 ├── assets/
 │    └── pizza.jpg
 └── components/
      ├── Child.jsx
      └── Child.css
```

### Parent (`App.jsx`)

```jsx
import Child from "./components/Child";
import pizza from "./assets/pizza.jpg";

function App() {
  const title = "Pizza";
  const price = 300;

  return (
    <div>
      <Child pizza={pizza} title={title} price={price} />
    </div>
  );
}

export default App;
```

### Child (`Child.jsx`)

```jsx
import "./Child.css";

function Child(props) {
  return (
    <div className="card">
      <img src={props.pizza} alt={props.title} />
      <h3>{props.title}</h3>
      <p>₹{props.price}/-</p>
      <button>Order Now</button>
    </div>
  );
}

export default Child;
```

### Styling (`Child.css`)

```css
.card {
  width: 300px;
  padding: 15px;
  border: 2px solid white;
  border-radius: 10px;
}

.card img {
  width: 200px;
  border-radius: 10px;
}

.card h3 {
  font-size: 20px;
}

.card p {
  font-size: 15px;
  font-style: italic;
}
```

### Resulting Card Layout

```
┌───────────────────────┐
│                       │
│     [ Pizza Image ]    │
│                       │
│   Pizza               │  ← props.title
│   ₹300/-               │  ← props.price (italic)
│                       │
│   [ Order Now ]        │
│                       │
└───────────────────────┘
```

This demonstrates **all three core features together**:
- **Dynamic** → change `title`/`price`/`pizza` values and the card updates
- **Reusable** → render `<Child .../>` multiple times with different data for multiple cards
- **Parent-Child Communication** → all display data originates in `App.jsx` and flows down

---

## 9. Quick-Revision Cheat Sheet

| Concept | One-Line Summary |
|---|---|
| **Props** | Used to send data from one component to another (Parent → Child) |
| **JS analogy** | Components = functions; Props = function arguments |
| **Dynamic** | Same component, different output, just by changing prop values |
| **Reusable** | Same component used multiple times with different prop values |
| **Parent-Child Communication** | Data defined in Parent flows down and renders in Child |
| **Passing props** | `<Child name={value} age={value} />` (like HTML attributes) |
| **Receiving (Way 1)** | `function Child(props) { props.name }` |
| **Receiving (Way 2)** | `function Child({ name, age }) { name }` — destructuring |
| **Props object** | All passed attributes auto-bundle into one `props` object |
| **Read-only** | Props cannot be mutated inside the Child; original Parent data is unaffected |
| **Data flow direction** | One-way: Parent → Child only |
| **File naming rule** | Component file names must start with a capital letter |

---

## 10. Interview Questions & Answers

**Q1: What are props in React?**
A: Props (short for "properties") are a mechanism to pass data from a parent component to a child component, similar to how arguments are passed into a function.

**Q2: Are props mutable or immutable?**
A: Props are **read-only (immutable)** from the child's perspective. A child component cannot modify the props it receives; doing so does not affect the original data in the parent.

**Q3: How does data flow with props — one-way or two-way?**
A: **One-way (unidirectional)** — strictly from Parent to Child. To send data back up, a different pattern (passing callback functions as props) is required.

**Q4: How are multiple props received in a component?**
A: They're automatically bundled into a single `props` object by React. You can access them via `props.key` or destructure them as `{ key1, key2 }` in the function parameter.

**Q5: What are the two ways to access props inside a component?**
A:
1. Using the `props` object directly: `props.name`
2. Destructuring in the parameter: `function Child({ name }) {}`

**Q6: Why are components compared to functions when explaining props?**
A: Because a React component is fundamentally a JavaScript function. Just as a function receives data through parameters/arguments, a component receives data through props — making the concept intuitive for anyone who already knows JS functions.

**Q7: What is the significance of capitalizing component file/function names?**
A: React distinguishes custom components from regular HTML tags by capitalization. A lowercase name (e.g., `child`) would be treated as an HTML tag, causing errors or unexpected behavior.

**Q8: Give a real-world use case for props.**
A: A reusable Card/Product component (e.g., a Pizza Card) where the image, title, and price differ per product but the structure and styling stay the same — props let one component template serve many data variations.

---

## 11. Practice Assignment

> *(As given at the end of the video)*

1. Import **2–3 different pizza images** into `App.jsx`.
2. Create separate variables: `title1`, `title2`, `title3` and `price1`, `price2`, `price3` (and corresponding image variables: `pizza1`, `pizza2`, `pizza3`).
3. Pass each set of data into the `Child` component as **props**, rendering the `Child` component multiple times.
4. In `Child.jsx`, wrap everything inside a `main` div containing **3 sub-divs** — one per pizza — each displaying its own title, image, and price using props.
5. Style each card appropriately using CSS.

### Suggested Structure

```jsx
// App.jsx
<div className="main">
  <Child pizza={pizza1} title={title1} price={price1} />
  <Child pizza={pizza2} title={title2} price={price2} />
  <Child pizza={pizza3} title={title3} price={price3} />
</div>
```

This reinforces **reusability** — the same `Child` component rendering three different cards just by varying the props passed to it.
