
export default function Map({location}) {
    return (
    <iframe
        width={400}
        height={300}
        className="chart"
        style={{border:0}}
        loading="lazy"
        allowfullscreen
        src={`https://www.google.com/maps?q=${location}&output=embed`}>
    </iframe>);
}