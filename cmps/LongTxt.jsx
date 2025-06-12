const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
    const [isLong, setIsLong] = useState(false)

    console.log('length', length)

    function toggleIsReadMore() {
        setIsLong(isLong => !isLong)
    }

    const descriptionTxt = (isLong || txt.length <= length) ? txt : txt.substring(0, length) + '...'
    const isBtnShow = txt.length > length
    return (
        <section className="long-txt container">
            <p>Description: {descriptionTxt}</p>
            {isBtnShow && <button onClick={toggleIsReadMore}>
                {isLong ? 'Read Less' : 'Read More..'}
            </button>}
        </section>
    )
}