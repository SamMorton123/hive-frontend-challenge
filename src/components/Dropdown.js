import React, { useState } from 'react';

import { DropdownItem } from './DropdownItem';

export const Dropdown = ({ data, multiselect }) => {

    /*
    selected state is an array which tracks which item or items are selected. If
    multiselect is on, then the array can have multiple elements. If it's off, then 
    the component will enforce that it has at most one element.
    */
    const [selected, setSelected] = useState([]);

    const updateSelectionStatus = (clickedItem) => {

        if (selected.includes(clickedItem)) {
            setSelected(prevState => prevState.filter(item => item !== clickedItem));
        } else {

            if (multiselect) {
                setSelected(prevState => [...prevState, clickedItem]);
            } else {
                setSelected([clickedItem]);
            }
        }
    };

    const selectAll = () => {
        setSelected([...data]);
    };

    const deselectAll = () => {
        setSelected([]);
    };

    return (
        <div className="dropdown">
            <select>
                {data.map((item, index) => (
                    <DropdownItem content={item} updateSelectionStatus={updateSelectionStatus} key={item} />
                ))}
            </select>
        </div>
    );
};
