import styled from "styled-components";
import Option from "./Option";
import Select from "./Select";
import Icon from "./Icon";

const StyledTemplateSelector = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 12px;
  position: relative;

  select {
    width: 100%;
    height: 100%;
    padding-left: 52px;
  }

  .template {
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

    svg {
      color: #ffffff;
    }

    &--project {
      background-color: #ec6c14;
    }

    &--blank {
      background-color: #41bdfe;
    }
  }
`;

const TemplateSelector = ({ template, onChange, ...props }) => {
  const selector = template ? template : "blank";

  return (
    <>
      <StyledTemplateSelector
        className={`template__selector template__selector--${selector}`}
      >
        <div className={`template template--${selector}`}>
          <Icon name={selector} width={18} />
        </div>
        <Select onChange={onChange} name="template" type="select">
          <Option value="">Blank</Option>
          <Option value="project">Project</Option>
        </Select>
      </StyledTemplateSelector>
    </>
  );
};

export default TemplateSelector;