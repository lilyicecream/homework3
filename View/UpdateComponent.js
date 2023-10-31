import React, { useState } from 'react';

const UpdateComponent = ({ songDetails, updateSong }) => {
    const [updatedSong, setUpdatedSong] = useState(songDetails.song);

    const handleUpdate = () => {
        updateSong(songDetails.id, updatedSong);
    }

    return (
        <div>
            <input
                type="text"
                value={updatedSong}
                onChange={(e) => setUpdatedSong(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdateComponent;