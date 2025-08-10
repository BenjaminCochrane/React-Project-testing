import React from 'react'

const Search = ({searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
        <div>
            <img src="src\assets\search.svg" alt="Search Icon" />

            <input
            type="text"
            placeholder= "Search for somthin slick"
            value = {searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search