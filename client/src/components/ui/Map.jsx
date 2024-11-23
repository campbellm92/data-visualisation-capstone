
export default function Map({location}) {
    return (
    <iframe
        width={400}
        height={300}
        className="chart"
        style={{border:0}}
        loading="lazy"
        allowfullscreen
        src={`https://www.google.com/maps?q=${location === 'Whitsunday' ? 'Whitsundays' : location}&output=embed`}
        aria-label={`Map showing the location of ${location === 'Whitsunday' ? 'Whitsundays' : location}`}
        >
    </iframe>);
}