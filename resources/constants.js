module.exports = Object.freeze({
  cr: "Credit",
  dr: "Debit",
  categories: [
    { value: "salary", label: "Salary" },
    { value: "Shopping", label: "Shopping" },
    { value: "Food", label: "Food" },
    { value: "Travelling", label: "Travelling" }
  ],
  navMenus: [
    {title: 'Budget', link: '/budget/add'},
    {title: 'Add Expense', link: '/expense/add'},
    {title: 'Expenses', link: '/expense'},
  ],
});
