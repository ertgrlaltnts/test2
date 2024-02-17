import React, { useState, useEffect } from "react";
import {
  Dropdown,

} from "reactstrap";


import { withTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const [singlebtn, setSinglebtn] = useState(false);
  const [selectLang, setselectLang] = useState("en");

  useEffect(() => {
    const selectLang = localStorage.getItem("I18N_LANGUAGE");
    setselectLang(selectLang);
  }, [selectLang]);

  const changeLanguageAction = (lang) => {
    //set language as i18n

    localStorage.setItem("I18N_LANGUAGE", lang);
    setselectLang(lang);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={singlebtn}
        toggle={() => setSinglebtn(!singlebtn)}
        className="d-inline-block d-sm-inline-block"
      >
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(LanguageDropdown);
