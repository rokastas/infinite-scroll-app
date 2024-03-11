import './Button.scss';

export default function Button({ onClick, favorited }) {
  return (
    <button className={`button ${favorited ? 'favorited' : ''}`} onClick={onClick}>
      {favorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}
