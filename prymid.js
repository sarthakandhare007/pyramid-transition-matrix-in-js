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
