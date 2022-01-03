import ExpenseTable from "components/ExpenseTable";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";

export default function Expenses() {
  return (
    <BaseLayout>
      <Heading heading={"Expense"} />
      <ExpenseTable />
    </BaseLayout>
  );
}
