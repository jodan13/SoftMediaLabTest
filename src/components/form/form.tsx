import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm,
} from "redux-form";
import Popover from "../popover";

import "./form.scss";

type TypeSalary =
  | "monthly salary"
  | "minimal salary"
  | "payment per day"
  | "payment per hour";

interface Props {
  paymentType: TypeSalary;
  personalIncomeTax: boolean;
  salary: string;
}

interface FormData {
  paymentType: TypeSalary;
  personalIncomeTax: boolean;
  salary: string;
}

const Form: React.FC<Props & InjectedFormProps<FormData, Props>> = (
  props: any
) => {
  const {
    handleSubmit,
    personalIncomeTax = "",
    paymentType,
    salary = "",
    change
  } = props;
  const [value, setValues] = useState({
    salaryIncomeTax: "0",
    salaryEmployee: "0",
    salary: "0",
  });

  useEffect(() => {
    const amount = Number(salary.replace(/ /g, ""));
    if (amount > 0) {
      const salaryIncomeTax = personalIncomeTax
        ? amount / 0.87 - amount
        : amount * 0.13;
      const newValues: any = {
        salary: personalIncomeTax
          ? (amount + salaryIncomeTax).toFixed(0)
          : amount.toFixed(0),
        salaryIncomeTax: salaryIncomeTax.toFixed(0),
        salaryEmployee: personalIncomeTax
          ? amount.toFixed(0)
          : (amount - salaryIncomeTax).toFixed(0),
      };
      setValues(newValues);
    } else {
      setValues({ salaryIncomeTax: "0", salaryEmployee: "0", salary: "0" });
    }
  }, [personalIncomeTax, salary]);

  useEffect(() => {
    switch (paymentType) {
      case "monthly salary":
        change("salary", "80000");
        break;
      case "minimal salary":
        change("salary", "30000");
        break;
      case "payment per day":
        change("salary", "4000");
        break;
      case "payment per hour":
        change("salary", "500");
        break;
      default:
        break;
    }
  }, [paymentType, change]);
  return (
    <>
      <div className="container h-100">
        <div className="row justify-content-center row-cols-auto h-100">
          <div className="col mt-5">
            <p className="lead">Сумма</p>
            <form onSubmit={handleSubmit}>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    value="monthly salary"
                    component={"input"}
                  />
                  Оклад за месяц
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    value="minimal salary"
                    component={"input"}
                  />
                  МРОТ
                </label>
                <Popover />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    value="payment per day"
                    component={"input"}
                  />
                  Оплата за день
                </label>
              </div>
              <div className="form-check mb-3">
                <label className="form-check-label">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    value="payment per hour"
                    component={"input"}
                  />
                  Оплата за час
                </label>
              </div>
              <div className="d-flex personalIncomeTax">
                <span className={personalIncomeTax ? "text-muted" : ""}>
                  Указать с НДФЛ
                </span>
                <div className="form-check form-switch mb-3">
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="personalIncomeTax"
                      component={"input"}
                    />
                    <span className={!personalIncomeTax ? "text-muted" : ""}>
                      Без НДФЛ
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex mb-3 salary">
                <Field
                  type="text"
                  name="salary"
                  className="form-control"
                  component={"input"}
                  onChange={() => console.log("onChange", props)}
                />
                <span className="">&#8381; в день</span>
              </div>
            </form>
            {paymentType === "monthly salary" && (
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <b>{value.salaryEmployee} &#8381;</b> сотрудник будет
                    получать на руки
                  </p>
                  <p className="card-text">
                    <b>{value.salaryIncomeTax} &#8381;</b> НДФЛ, 13% от оклада
                  </p>
                  <p className="card-text">
                    <b>{value.salary} &#8381;</b> за сотрудника от оклада
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const form = reduxForm<FormData, Props>({ form: "salary" })(Form);

const selector = formValueSelector("salary");

export default connect((state) => {
  const personalIncomeTax = selector(state, "personalIncomeTax");
  const salary = selector(state, "salary");
  const paymentType = selector(state, "paymentType");
  const initialValues: FormData = {
    paymentType: "monthly salary",
    personalIncomeTax: true,
    salary: "60000",
  };
  return {
    initialValues,
    personalIncomeTax,
    salary,
    paymentType,
  };
})(form);
