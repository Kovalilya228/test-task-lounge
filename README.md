# 🧰 Inventory App (Vue 3 + Pinia)

Простое инвентарное приложение с управлением предметами, количеством и подсчётом суммарных значений (вес, количество).

---

## 🚀 Tech Stack

- Vue 3 (Composition API)
- Pinia (state management)
- TypeScript
- Vite
- Pure CSS (без UI библиотек)

---

## 📦 Features

### 🧾 Inventory system
- Добавление / удаление предметов
- Увеличение / уменьшение количества
- Автоматический пересчёт веса

### 📊 Summary
- Общее количество предметов
- Общий вес инвентаря
- Закреплённый блок (sticky footer)

### 🎨 UI/UX
- Скроллируемый список предметов
- Адаптивный дизайн (desktop → mobile cards)

---

## ⚙️ Architecture

### 🧠 State management
Все данные хранятся в Pinia store:

- `items` — список доступных предметов
- `inventory` — состояние инвентаря
- `totalCount` — общее количество
- `totalWeight` — общий вес

---

### 📌 Key design decisions

#### 1. Map-based access (O(1))
Для быстрого доступа к количеству используется Map вместо `.find()`:

```ts
inventoryMap.get(id)
