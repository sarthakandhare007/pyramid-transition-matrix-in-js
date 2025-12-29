# pyramid-transition-matrix-in-js

Here is a **clean, interview-ready JavaScript solution** for **LeetCode 756 – Pyramid Transition Matrix**, with **clear explanation**.

-------------------------

## 🧩 Problem Summary (Short)

* You start with a **bottom string**
* You are given **allowed patterns** of length 3 (`XY -> Z`)
* Each upper block depends on **two adjacent blocks below**
* You must check if it’s possible to build **up to a single top block**

---

## 💡 Key Idea (Important)

* Convert `allowed` into a **map**
* Use **DFS + Backtracking**
* Build pyramid **level by level**
* Try **all valid combinations**
* Stop early if any path works

---

## ✅ JavaScript Solution (Accepted)

```js
var pyramidTransition = function (bottom, allowed) {
  // Step 1: Build mapping
  const map = new Map();

  for (let rule of allowed) {
    const base = rule.slice(0, 2);
    const top = rule[2];
    if (!map.has(base)) map.set(base, []);
    map.get(base).push(top);
  }

  // DFS function
  function dfs(curr) {
    // If pyramid is built to the top
    if (curr.length === 1) return true;

    const nextLevels = [];

    // Build all possible next rows
    function buildNextRow(index, path) {
      if (index === curr.length - 1) {
        nextLevels.push(path);
        return;
      }

      const pair = curr[index] + curr[index + 1];
      if (!map.has(pair)) return;

      for (let ch of map.get(pair)) {
        buildNextRow(index + 1, path + ch);
      }
    }

    buildNextRow(0, "");

    // Try all possible next rows
    for (let next of nextLevels) {
      if (dfs(next)) return true;
    }

    return false;
  }

  return dfs(bottom);
};
```

---

## 🧠 Explanation (Easy Words)

### Step 1️⃣ Mapping

Convert:

```js
["ABC", "BCE"]
```

Into:

```js
{
  "AB": ["C"],
  "BC": ["E"]
}
```

---

### Step 2️⃣ DFS

* From current row → generate all possible next rows
* For each next row → recursively check
* If **any path reaches length 1**, return `true`

---

### Step 3️⃣ Backtracking

* If a path fails → backtrack and try another
* Ensures **all combinations** are tested

---

## ⏱️ Time Complexity

* Worst case: **Exponential**
* Constraints are small → DFS is acceptable

---

## 📌 Example

```js
console.log(
  pyramidTransition("BCD", ["BCC","CDE","CEA","FFF"])
); 
// true
```

```js
console.log(
  pyramidTransition("AAAA", ["AAB","AAC","BCD","BBE","DEF"])
);
// false
```

---
---
