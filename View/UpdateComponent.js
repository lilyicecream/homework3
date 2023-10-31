import React, { useState } from 'react';

const UpdateComponent = ({ songDetails, updateSong }) => {

    const [song, setSong] = useState(songDetails.song);

    const onUpdate = () => {
        updateSong(songDetails.id, song);
    }

    return (
        <div>
            <label for="title">Title:</label>
            <input value={song} onChange={e => setSong(e.target.value)} />
            <button onClick={onUpdate}>Submit</button>
        </div>
    )
}

export default UpdateComponent;