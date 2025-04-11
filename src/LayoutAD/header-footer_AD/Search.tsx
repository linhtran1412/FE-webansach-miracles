import React from "react";

interface SearchProps {
    search: string;
    setSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
    return (
        <div className="col-sm-6 mb-4">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control"
                    type="search"
                    role="searchbox"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Search;

