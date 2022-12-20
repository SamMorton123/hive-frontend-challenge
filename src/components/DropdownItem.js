import React from 'react';

import './dropdown.css';

export const DropdownItem = ({ content, updateSelectionStatus, isItalic, isMultiSelect, isChecked }) => {

    const italicId = isItalic ? 'italic' : null;
    const classname = isMultiSelect ? 'dropdown-option-multi' : 'dropdown-option';

    // console.log('is checked for ', content, 'is ', isChecked);
    const genItemContent = () => {
        if (!isMultiSelect) return <span>{content}</span>;

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
       <div className={classname} id={italicId} onClick={(e) => updateSelectionStatus(e, content)}>
           {genItemContent()}
       </div>
   );
};
