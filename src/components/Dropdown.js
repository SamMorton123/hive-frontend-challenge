import React, { useEffect, useRef, useState } from 'react';

import { DropdownItem } from './DropdownItem';

import './dropdown.css';

/* 
Options allowing the user to select all or deselect all in the case of multiselect, or
none if multiselect is off.
*/
const specialOptions = ['None', 'Select all', 'Deselect all'];

/*
Just displays a downward chevron icon.
Note: this was taken from:
https://medium.com/tinyso/how-to-create-a-dropdown-select-component-in-react-bf85df53e206
*/
const DropdownIcon = () => (
    <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
);

/*
The Dropdown component as described in the takehome prompt.
*/
export const Dropdown = ({ data, multiselect, size }) => {

    // using ref to help the dropdown detect when the user clicks outside of it
    const ref = useRef(null);

    // determine class of dropdown based on given size prop
    const dropdownClass = size === 'large' ? 'dropdown-large-container' : 'dropdown-default-container';

    /*
    Selected state is an array which tracks which item or items are selected. If
    multiselect is on, then the array can have multiple elements. If it's off, then 
    the component will enforce that it has at most one element.
    */
    const [selected, setSelected] = useState([]);

    // controls whether the dropdown options are visible
    const [optionsVisible, setOptionsVisible] = useState(false);

    /*
    Callback for handling clicks on individual dropdown options. Enforces that
    the array of selected elements is at most length 1 if multiselect is off.
    */
    const updateSelectionStatus = (e, clickedItem) => {

        // prevent method from being run more than once
        e.preventDefault();

        if (multiselect) {
            if (selected.includes(clickedItem))
                setSelected(prevState => prevState.filter(item => item !== clickedItem));
            else setSelected(prevState => [...prevState, clickedItem]);
        
        } else {

            // handle the case where the clicked item is the special option "None"
            if (clickedItem.toLowerCase() === 'none') setSelected([]);
            
            // otherwise the selected array contains the clicked item
            else setSelected([clickedItem]);
        }

        // if multiselect is off, then the options close when the user selects an option
        if (!multiselect) setOptionsVisible(!optionsVisible);
    };

    /*
    Handles when the user clicks "Select all" when multiselect is on.
    */
    const selectAll = () => {
        setSelected([...data]);
    };

    /*
    Handles when the user clicks "Deselect all" when multiselect is on.
    */
    const deselectAll = () => {
        setSelected([]);
    };

    /*
    Determine the text which goes in the dropdown. If nothing is selected, then the dropdown
    defaults to displaying "Select an option". If multiselect is off, then the dropdown just
    displays the single element selected by the user. If multiselect is on, the dropdown
    displays each selected element separated by commas.
    */
    const genDropdownPrompt = () => {
        
        if (selected.length === 0) return 'Select an option';
        else if (selected.length === 1) return selected[0];
        
        // create a string of each selected option, separated by commas
        else {
            let prompt = selected[0];
            for (let i = 1; i < selected.length; i++) {
                prompt += `, ${selected[i]}`;
            }
            return prompt;
        }
    };

    /*
    Component container for dropdown options. For multiselect, it adds "Select all"
    and "Deselect all" options. For single select, it offers a "None" option, which just
    returns the user to the state of having nothing selected. Further, it tags the "None", 
    "Select all", "Deselect all" options as "special options," as they're not typical 
    options for the user.
    */
    const DropdownOptionsContainer = ({ data, selected }) => {

        // disregard any option in the data that is equal to any of the special terms
        // ("special terms" are the contents of the specialOptions array)
        const specialOptionsLowered = specialOptions.map(elem => elem.toLowerCase());
        const dataFiltered = data.filter(item => !specialOptionsLowered.includes(item.toLowerCase()));

        // add select all/deselect all or none to the options that'll be listed
        const dataWithAddedOptions = (
            multiselect 
            ? ['Select all', 'Deselect all', ...dataFiltered]
            : ['None', ...dataFiltered]
        );

        return (
            <div className="dropdown-options">
                {dataWithAddedOptions.map((item, index) => {
                    
                    // to tag as special option, make sure the index of the item is at
                    // most 1, and that it is included in the specialOptions array. This
                    // makes it so that if the terms "None", "Select all", or "Deselect all"
                    // were to appear in the given data, they wouldn't be mixed up with the
                    // special options
                    const isSpecialOption = specialOptions.includes(item);
                    
                    // determine which method will be sent as the option's onClick
                    let onClick;
                    if (isSpecialOption && item === 'Select all') onClick = selectAll;
                    else if (isSpecialOption && item === 'Deselect all') onClick = deselectAll;
                    else onClick = updateSelectionStatus;
    
                    return (
                        <DropdownItem
                            key={`${item}${index}`}
                            content={item}
                            onClick={onClick}
                            isSpecialOption={isSpecialOption}
                            isMultiSelect={multiselect}
                            isChecked={selected.includes(item)}
                        />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {

        // check whether or not the user has clicked outside the component
        const detectOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOptionsVisible(false);
            }
        };

        document.addEventListener('mousedown', detectOutsideClick);
        return () => {
            document.removeEventListener('mousedown', detectOutsideClick);
        };
    
    }, [ref]);

    return (
        <div className={dropdownClass} ref={ref}>
            <div className="dropdown" onClick={() => setOptionsVisible(!optionsVisible)}>
                <span>{genDropdownPrompt()}</span>
                <DropdownIcon />
            </div>
            {
                optionsVisible
                    ? <DropdownOptionsContainer data={data} selected={selected} />
                    : null
            }
        </div>
    );
};
