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
export const Dropdown = ({ data, multiselect, size, selectName }) => {

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

    useEffect(() => {

        // check whether or not 
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

    const updateSelectionStatus = (e, clickedItem) => {
        console.log('called');
        e.preventDefault();

        if (multiselect) {
            if (selected.includes(clickedItem))
                setSelected(prevState => prevState.filter(item => item !== clickedItem));
            else setSelected(prevState => [...prevState, clickedItem]);
        } else {
            setSelected([clickedItem]);
        }

        if (!multiselect) setOptionsVisible(!optionsVisible);
    };

    const selectAll = () => {
        setSelected([...data]);
    };

    const deselectAll = () => {
        setSelected([]);
    };

    const genSelectorPrompt = () => {
        if (selected.length === 0 || selected[0] === 'None') return 'Select an option';
        else if (selected.length === 1) return selected[0];
        else {
            let prompt = selected[0];
            for (let i = 1; i < selected.length; i++) {
                prompt += `, ${selected[i]}`;
            }
            return prompt;
        }
    };

    const Options = () => {

        const dataWithAdditionalOptions = (
            multiselect 
            ? ['Select all', 'Deselect all', ...data]
            : ['None', ...data]
        );
        return (
            <div className="dropdown-options">
                {dataWithAdditionalOptions.map((item, index) => {
                    const isSpecialOption = index < 2 && specialOptions.includes(item);

                    let onClick;
                    if (isSpecialOption && item == 'Select all') onClick = selectAll;
                    else if (isSpecialOption && item === 'Deselect all') onClick = deselectAll;
                    else onClick = updateSelectionStatus;

                    return (
                        <DropdownItem
                            content={item}
                            onClick={onClick}
                            isSpecialOption={isSpecialOption}
                            isMultiSelect={multiselect}
                            isChecked={selected.includes(item)}
                            key={item}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className={dropdownClass} ref={ref}>
            <div className="dropdown" onClick={() => setOptionsVisible(!optionsVisible)}>
                <span>{genSelectorPrompt()}</span>
                <DropdownIcon />
            </div>
            {optionsVisible ? Options() : null}
        </div>
    );
};
