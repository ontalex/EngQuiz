import React from 'react';

import { Link } from 'react-router-dom';
import { joinStyle } from '../../utils/styles';

type TPropsLink = {
    link: string,
    hasArrow: boolean,
    children: React.ReactNode | React.ReactNode[]

    fullWidth: boolean
}

export default function LinkComponent(props: TPropsLink) {
    return (
        <Link
            to={props.link}
            className={joinStyle(props.fullWidth == true ? "w-full" : "w-max", "hover:bg-water-0 bg-water-100 duration-75 rounded-lg py-3 px-6 flex justify-center items-center gap-4 font-medium text-dark-400")}
        >
            {props.children}

            {
                props.hasArrow ?
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_186)">
                            <path d="M1 13.5L6.08579 8.41421C6.86683 7.63317 6.86683 6.36683 6.08579 5.58579L1 0.5" stroke="#ffffff" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_186">
                                <rect width="14" height="8" fill="white" transform="matrix(0 -1 1 0 0 14)" />
                            </clipPath>
                        </defs>
                    </svg> :
                    null
            }
        </Link>
    )
}
