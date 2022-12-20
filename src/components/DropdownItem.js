import React from 'react';

import './dropdown.css';

export const DropdownItem = ({ content, updateSelectionStatus, isItalic, isMultiSelect_, isChecked_ }) => {

    /*
    A brief arg check first. I'll check: whether the isMultiSelect and isChecked are booleans,
    and have them default to false if they aren't booleans
    */
   const isMultiSelect = (typeof isMultiSelect_ === 'boolean') ? isMultiSelect_ : false;
   const isChecked = (typeof isChecked_ === 'boolean') ? isChecked_ : false;

   const italicId = isItalic ? 'italic' : null;

   return (
       <div className="dropdown-option" id={italicId} onClick={updateSelectionStatus}>
           {content}
       </div>
   );
};
