import React, { useState } from 'react';

const SearchBar = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="relative z-20">
            {/* Large screens: always visible */}
            <div className="hidden lg:flex items-center bg-opacity-80 border border-gray-300 bg-none rounded-2xl p-3 w-fit max-w-md shadow-md">
                <input
                    type="text"
                    placeholder="Search vehicles..."
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                />
                <button className="ml-2 bg-primary text-white px-4 py-1 rounded-xl transition">
                    Search
                </button>
            </div>

            {/* Small/medium screens: button that toggles input */}
            <div className="flex lg:hidden items-center">
                {!searchOpen ? (
                    <button
                        onClick={() => setSearchOpen(true)}
                        className=" text-white px-4 py-2 rounded-full hover:font-bold hover:scale-110 border border-gray-400 bg-none transition"
                    >
                        Search...
                    </button>
                ) : (
                    <div className="relative w-full max-w-xs transition-all duration-300">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-[150px] h-[45px] pl-4 pr-16 rounded-2xl border border-gray-300 outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                        >
                            Go
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SearchBar;
