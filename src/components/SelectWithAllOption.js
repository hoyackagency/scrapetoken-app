import React from "react";
import PropTypes from "prop-types";
// import { injectIntl } from "react-intl"; // for our bonus, see below
import { default as ReactSelect } from "react-select";

// specify props.allowSelectAll = true to enable!
const SelectWithAllOption = props => {
  if (props.allowSelectAll) {
    if (props.value.length === props.options.length) {
      return (
        <ReactSelect
          {...props}
          value={[props.allOption]}
          onChange={selected => props.onChange(selected.slice(1))}
        />
      );
    }

    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={selected => {
          if (
            selected.length > 0 &&
            selected[selected.length - 1].value === props.allOption.value
          ) {
            return props.onChange(props.options);
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

SelectWithAllOption.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

SelectWithAllOption.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

export default SelectWithAllOption;

// /**
//  * This is a bonus: i18n wrapper using react-intl
//  */
// const I18nSelect = props => {
//   const ourProps = {
//     placeholder: props.intl.formatMessage({
//       id: props.placeholderId
//     }),
//     clearAllText: props.intl.formatMessage({
//       id: props.clearAllTextId
//     }),
//     allOption: {
//       label: props.intl.formatMessage({ id: props.allOptionId }),
//       value: "*"
//     },
//     ...props
//   };

//   return <Select {...ourProps} />;
// };

// I18nSelect.propTypes = {
//   intl: PropTypes.object.isRequired,
//   placeholderId: PropTypes.string,
//   clearAllTextId: PropTypes.string,
//   allOptionId: PropTypes.string
// };

// I18nSelect.defaultProps = {
//   placeholderId: "app.components.Select.ReactSelect.placeholder",
//   clearAllTextId: "app.components.Select.ReactSelect.clearAllText",
//   allOptionId: "app.components.Select.ReactSelect.selectAllText"
// };

// export default injectIntl(I18nSelect);