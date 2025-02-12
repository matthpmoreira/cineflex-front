export default {
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    arrowParens: "avoid",
    experimentalTernaries: true,
    importOrder: ["^\\.+/"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    printWidth: 120,
    tabWidth: 4,
    trailingComma: "es5",
};
