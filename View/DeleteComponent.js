import React from 'react';

const DeleteComponent = ({ songDetails, deleteSong }) => {
    return (
        <div>
            <p>Are you sure want to delete this?</p>
            <button onClick={() => deleteSong(songDetails.song)}>Delete</button>
        </div>
    )
}

export default DeleteComponent;