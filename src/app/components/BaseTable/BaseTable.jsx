'use client'
import React, {useState, useEffect} from 'react'
import styles from './BaseTable.module.css'

function BaseTable({tableData, filterByProp}) {

  const [tableState, setTableState] = useState({
    search: "",
    elementsPerPage: 4,
    currentPage: 1
  })

  const [data, setData] = useState([])
  const [filteredElements, setFilteredElements] = useState(0)


  useEffect(() => {
    setData(
      filter(tableState.search, tableState.elementsPerPage, tableState.currentPage)
    )
  }, [tableState])

  function filter(searchValue, elementsPerPage, currentPage) {

    const filteredElementsArray = tableData.filter(eventObj => eventObj[filterByProp].toLowerCase().includes(searchValue))
    setFilteredElements(filteredElementsArray.length)

    if(searchValue){
      return filteredElementsArray.slice((currentPage - 1)*elementsPerPage, ((currentPage - 1) * elementsPerPage + elementsPerPage))
    }else{
      return tableData.slice((currentPage - 1)*elementsPerPage, ((currentPage - 1) * elementsPerPage + elementsPerPage))
    }
  }

  const handleChange = (e) => {
      const { value, name } = e.target;
    
      const updateState = (newState) => {
        setTableState((prev) => ({
          ...prev,
          ...newState,
        }));
      };
    
      if (name === 'search') {
        updateState({ [name]: value.toLowerCase() });
      } else if (name === 'elementsPerPage') {
        updateState({ [name]: Number(value) });
      } else {
        updateState({ currentPage: name === 'previous' ? tableState.currentPage - 1 : tableState.currentPage + 1 });
      }
    
      setData(filter(tableState.search, tableState.elementsPerPage, tableState.currentPage));
  };

  function totalPages(){
      return Math.ceil(filteredElements / tableState.elementsPerPage)
  }
  

  return (
    <div className={styles.container}>
        <input 
          placeholder={`Search for ${filterByProp}...`}
          type="text"
          name="search"
          value={tableState.search}
          onChange={handleChange}
        />
        <table>
              <thead>
                    <tr>
                        {Object.keys(tableData[0]).map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                      {Object.keys(tableData[0]).map((header) => (
                          <td key={header}>{row[header]}</td>
                      ))}
                    </tr>
                ))}
              </tbody>
        </table>
        <div className={styles.pagesWrapper}>
              <label>
                Page {tableState.currentPage} of {totalPages()}
                    <select name='elementsPerPage' onChange={handleChange}>
                        <option name='elementsPerPage' value="4">4</option>
                        <option name='elementsPerPage' value="8">8</option>
                    </select>
              </label>
              <span>
                    <button 
                      className={tableState.currentPage <= 1 ? styles.disabledButton : ''} 
                      name="previous" 
                      onClick={handleChange}
                    >
                        Previous
                    </button>
                    <button 
                      className={tableState.currentPage >= totalPages() ? styles.disabledButton : ''} 
                      name="next" 
                      onClick={handleChange}
                    >
                        Next
                    </button>
              </span>
        </div>
    </div>
  )
}

export default BaseTable