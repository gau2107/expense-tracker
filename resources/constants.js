module.exports = Object.freeze({
  cr: "Credit",
  dr: "Debit",
  frequencies: [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Semi-annually", label: "Semi Annually" },
    { value: "Annually", label: "Annually" },
  ],
  categories: [
    { value: "Salary", label: "Salary" },
    { value: "Shopping", label: "Shopping" },
    { value: "Food", label: "Food" },
    { value: "Travelling", label: "Travelling" },
  ],
  navMenus: [
    { title: "Budget", link: "/budget/add" },
    { title: "Add Expense", link: "/expense/add" },
    { title: "Expenses", link: "/expense" },
  ],
  budgetThs: [
    "#",
    "Cr",
    "Date",
    "Frequency",
    "Category",
    "Note",
    "Amount",
    "Actions",
  ],
});
