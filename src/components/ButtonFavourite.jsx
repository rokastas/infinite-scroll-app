import './Buttons.scss';

export default function ButtonFavourite({ onClick, favorited }) {
  return (
    <button className={`btn-favourite ${favorited ? 'favorited' : ''}`} onClick={onClick}>
      {favorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}
