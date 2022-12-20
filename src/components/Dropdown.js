import React, { useEffect, useRef, useState } from 'react';

import { DropdownItem } from './DropdownItem';

import './dropdown.css';

const Icon = () => {
    /*
    Note, this was taken from:
    https://medium.com/tinyso/how-to-create-a-dropdown-select-component-in-react-bf85df53e206
    */

    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

export const Dropdown = ({ data, multiselect, size, selectName }) => {

    const ref = useRef(null);

    // determine class of dropdown based on given size prop
    const dropdownSelectClass = size === 'large' ? 'dropdown-select-large' : 'dropdown-select-default';

    /*
    selected state is an array which tracks which item or items are selected. If
    multiselect is on, then the array can have multiple elements. If it's off, then 
    the component will enforce that it has at most one element.
    */
    const [selected, setSelected] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);

    useEffect(() => {
        const detectOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOptionsVisible(false);
            }
        }

        document.addEventListener('mousedown', detectOutsideClick);
        return () => {
            document.removeEventListener('mousedown', detectOutsideClick);
        };
    }, [ref]);

    const updateSelectionStatus = (e, clickedItem) => {
        e.preventDefault();

        if (multiselect) {
            if (selected.includes(clickedItem))
                setSelected(prevState => prevState.filter(item => item !== clickedItem));
            else setSelected(prevState => [...prevState, clickedItem]);
        } else {
            setSelected([clickedItem]);
        }

        //setOptionsVisible(!optionsVisible);
    };

    const selectAll = () => {
        setSelected([...data]);
    };

    const deselectAll = () => {
        setSelected([]);
    };

    const selectorPrompt = (selected.length === 0 || selected[0] === 'None') ? 'Select an option' : selected[0];

    const Options = () => {
        return (
            <div className="dropdown-options">
                {['None', ...data].map((item) => {
                    const isItalic = item === 'None';
                    return (
                        <DropdownItem
                            content={item}
                            updateSelectionStatus={updateSelectionStatus}
                            isItalic={isItalic}
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
        <div className="select-container" ref={ref}>
            <div className="select-default" onClick={() => setOptionsVisible(!optionsVisible)}>
                <span>{selectorPrompt}</span>
                <Icon />
            </div>
            {optionsVisible ? Options() : null}
        </div>
    );
};
