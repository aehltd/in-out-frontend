import React, {useEffect} from 'react';

const Menu = ({isOpen, onClick, onClose, position, options}) => {
    useEffect(() => {
        console.log(options);
    }, [options])
    
    if (!isOpen) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full z-50" onClick={onClose}>
            <div className="absolute container p-0 max-w-fit top" style={{top: position.y, left: position.x}}>
                <ul>
                    {   
                        Object.keys(options).map((option) => (
                            <li key={option} className="flex my-2 first:mt-2 last:mb-2">
                                <button className="btn btn-icon hover:bg-gray-100 w-full flex my-0" onClick={() => {
                                    onClick(option);
                                }}>
                                    <span className="material-icons-outlined align-middle">
                                        {option}
                                    </span>
                                    <span className="align-middle justify-end flex-grow">
                                        {options[option]}
                                    </span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu;