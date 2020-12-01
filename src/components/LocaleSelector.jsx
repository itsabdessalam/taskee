import { useContext } from "react";
import Select from "./Select";
import Option from "./Option";
import Icon from "./Icon";
import LocaleContext from "../context/Locale";
import locales from "../config/locales";
import styled from "styled-components";

const StyledLocaleSelector = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 12px;
  position: relative;

  select {
    width: 100%;
    height: 100%;
    padding-left: 52px;
    cursor: pointer;
  }

  .locale {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
`;

const LocaleSelector = () => {
  const { activeLocale, updateLocale } = useContext(LocaleContext);

  // TODO: get stored user locale and update if necessery

  return (
    <StyledLocaleSelector
      className={`locale__selector locale__selector--${activeLocale}`}
    >
      <div className={`locale locale--${activeLocale}`}>
        <Icon name={`flag-${activeLocale}`} width={24} />
      </div>
      <Select
        value={activeLocale}
        onChange={({ target: { value } }) => updateLocale(value)}
      >
        {Object.values(locales).map(({ label, locale }, index) => (
          <Option key={index} value={locale}>
            {label}
          </Option>
        ))}
      </Select>
    </StyledLocaleSelector>
  );
};

export default LocaleSelector;
