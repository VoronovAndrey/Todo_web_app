import React from 'react'
import { StoreManager } from '../context/Context'

function Filter({colorFilter, setColorFilter}) {
    const {colors: {colors}} = React.useContext(StoreManager)
    return (
        <div className='filter__container'>
            {colors.map((item, idx) => {
                return (
                    <span className='circle__modal'
                        style={{
                            marginLeft: idx === 0 ? '0' : '10px',
                            background: item,
                            border: `3px solid ${item === colorFilter ? 'rgba(0, 0, 0, 0.3)' : 'transparent'
                                }`
                        }}
                        key={idx}
                        onClick={() => setColorFilter(item)}
                    ></span>
                )
            })}
            <span className={`filter__span ${colorFilter === null ? 'filter__span__active' : ''}`}
                onClick={() => setColorFilter(null)}
            >All</span>
        </div>
    )
}

export default Filter
