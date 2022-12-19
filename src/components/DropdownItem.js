import React from 'react';

export const DropdownItem = ({ content, updateSelectionStatus, isMultiSelect_, isChecked_ }) => {

    /*
    A brief arg check first. I'll check: whether the isMultiSelect and isChecked are booleans,
    and have them default to false if they aren't booleans
    */
   const isMultiSelect = (typeof isMultiSelect_ === 'boolean') ? isMultiSelect_ : false;
   const isChecked = (typeof isChecked_ === 'boolean') ? isChecked_ : false;

   return (
       <option className="dropdown-item" onClick={updateSelectionStatus}>
           {content}
       </option>
   );
};
