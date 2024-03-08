import './Pictures.scss';

export default function Pictures({pictures}) {
  return (
    <div id='picture-grid'>
      {pictures.map((picture) => (
        <div className="picture-container" key={picture.id}>
          <div className="picture-info">
            <p className="alt">{picture.alt}</p>
            <p className="photographer">{picture.photographer}</p>
          </div>
          <img className='picture' src={picture.src.medium} alt={picture.alt} />
        </div>
      ))}
    </div>
  );
}
