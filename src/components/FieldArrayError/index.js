import React from "react";
import { getIn, Field } from "formik";

export default function ErrorMessage({ name }) {
  return (
<Field name={ name }>
      { ({ form, field }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? <div name={ name } key={ name } style={ { color: "red" } }>{`Field ${error.replace(name, "")}`}</div> : null;
      } }
    </Field>
  );
}
