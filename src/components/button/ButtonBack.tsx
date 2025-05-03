import { Icon } from '@iconify/react';
import React from 'react';

const ButtonBack = () => {
    return (
        <button
            className="flex size-10 justify-center rounded-full hover:bg-slate-50"
            type="button"
            onClick={() => window.history.back()}
            aria-label="back-button"
        >
            <Icon
                className="m-auto"
                icon="fluent:arrow-left-24-filled"
                width={24}
                height={24}
            />
        </button>
    );
};

export default ButtonBack;
