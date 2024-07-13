import React, { useState, useRef, useEffect } from 'react';
import ARROW from '../../assets/arrow.png';
import './Dropdown.css';

const Dropdown = ({
    options,
    firstSelectedText,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(firstSelectedText);
    const [originalOptions, setOriginalOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setOriginalOptions(
            options.map(option => ({
                original: option,
                lower: option.toLowerCase()
            }))
        );
    }, [options]);

    useEffect(() => {
        setFilteredOptions(
            originalOptions.filter(({ lower }) => lower && lower.includes(searchTerm.toLowerCase()))
                    .map(({ original }) => original)
        );
    }, [searchTerm, originalOptions]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleAddOption = () => {
        const newOption = searchTerm.trim();
        const lowerCaseNewOption = newOption.toLowerCase();

        if (newOption !== '' && !originalOptions.some(({ lower }) => lower === lowerCaseNewOption)) {
            const updatedOptions = [...options, newOption];

            const updatedOriginalOptions = [...originalOptions, {
                original: newOption,
                lower: lowerCaseNewOption
            }];

            setFilteredOptions(updatedOptions);
            setOriginalOptions(updatedOriginalOptions); 
            setSearchTerm('');
        }
    };

    const hasExactMatch = filteredOptions.some(option => option.toLowerCase() === searchTerm.toLowerCase());

    return (
        <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <div className={`dropdown-selected ${isOpen ? 'border' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption}
                <img src={ARROW} alt={'arrow'} className={`dropdown-selected-arrow ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-search-container">
                        <input
                            type="text"
                            className="dropdown-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Пошук..."
                        />

                        {!hasExactMatch && searchTerm.trim() !== '' && (
                            <button className="dropdown-add-button" onClick={handleAddOption}>
                                Додати
                            </button>
                        )}
                    </div>

                    <ul className="dropdown-list">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                className="dropdown-option"
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
