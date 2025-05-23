import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SidebarDropdown = ({ item }: any) => {
    const pathname = usePathname();

    return (
        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
            {item.map((data: any) => (
                <li key="menu">
                    <Link
                        href={data.route}
                        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                            pathname === data.route ? 'text-white' : ''
                        }`}
                    >
                        {data.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SidebarDropdown;
