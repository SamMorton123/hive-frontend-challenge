import React from 'react';

import './dropdown.css';

export const DropdownItem = ({ content, onClick, isSpecialOption, isMultiSelect, isChecked }) => {

    // determine the class of given option
    let classname;
    if (isSpecialOption) {
        classname = content === 'None' ? 'dropdown-option-special' : 'dropdown-option-special-multi';
    } else classname = isMultiSelect ? 'dropdown-option-multi' : 'dropdown-option';

    const genItemContent = () => {
        if (isSpecialOption || !isMultiSelect) return <span>{content}</span>;

        const id = isChecked ? "checked" : null;
        return (
            <label className="check-container">
                <input type="checkbox" />
                <span className="checkmark" id={id} />
                {content}
            </label>
        );
    }

   return (
       <div className={classname} onClick={(e) => onClick(e, content)}>
           {genItemContent()}
       </div>
   );
};
