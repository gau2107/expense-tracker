import AddExpenseForm from "components/forms/AddExpense";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";

export default function Add() {
  return (
    <BaseLayout>
      <div className="max-w-lg mx-auto">
        <Heading heading={`Add Expense`} />
        <AddExpenseForm />
      </div>
    </BaseLayout>
  );
}
