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
    cursor: pointer;
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

    &--project {
      color: #ec6c14;
      background-color: rgba(236, 108, 20, 0.1);
    }

    &--blank {
      color: #41bdfe;
      background-color: rgba(65, 189, 254, 0.1);
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
