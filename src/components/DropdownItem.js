import React from 'react';
import './dropdown.css';

/*
Component controlling each individual item displayed with the dropdown.
Props:
    - content: the content to be displayed in the item
    - onClick: the method to be performed when the item is clicked
    - isSpecialOption: indicates whether the content is "special" (i.e. it's 
        one of "None", "Select all", or "Deselect all")
    - isMultiSelect: indicates whether the display should reflect multiselect or not
    - isChecked: if multiselect is on, determines whether or not the item appears as
        checked or not
*/
export const DropdownItem = ({ content, onClick, isSpecialOption, isMultiSelect, isChecked }) => {

    // determine the class of given option to control its appearance
    let classname;
    if (isSpecialOption) {
        classname = content === 'None' ? 'dropdown-option-special' : 'dropdown-option-special-multi';
    } else classname = isMultiSelect ? 'dropdown-option-multi' : 'dropdown-option';

    /*
    Control the content displayed by the DropdownItem.
    */
    const ItemContent = () => {
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
           <ItemContent />
       </div>
   );
};
