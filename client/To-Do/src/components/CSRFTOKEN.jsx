import React from "react";
import { csrftoken } from "../csrfToken";

const CSRFTOKEN = () => {
  console.log(csrftoken);

  return <input name="csrfmiddlewaretoken" value={csrftoken} type="hidden" />;
};

export default CSRFTOKEN;
