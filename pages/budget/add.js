import AddBudgetForm from "components/forms/AddBudget";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useForm } from "react-hook-form";
export default function Add() {
  return (
    <BaseLayout>
      <div className="max-w-lg mx-auto">
        <Heading heading={`Add Budget`} />
        <AddBudgetForm />
      </div>
    </BaseLayout>
  );
}
