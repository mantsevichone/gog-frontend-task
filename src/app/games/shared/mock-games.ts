import { Game } from './game.model';

export const GAMES: Game[] = [
  {
    id: 1,
    name: 'oddworld: stranger’s wrath',
    price: 9.99,
    discount: '-50%',
    imgSrc: '/assets/oddworld.jpg',
  },
  {
    id: 2,
    name: 'chaos on deponia',
    price: 9.99,
    discount: '',
    imgSrc: '/assets/deponia.jpg',
  },
  {
    id: 3,
    name: 'The settlers 2: gold edition',
    price: 5.99,
    discount: '',
    imgSrc: '/assets/settlers2.jpg',
  },
  {
    id: 4,
    name: 'neverwinter nights',
    price: 9.99,
    discount: '-50%',
    imgSrc: '/assets/nn.jpg',
  },
  {
    id: 5,
    name: 'assassin’s creed: director’s cut',
    price: 9.99,
    discount: '',
    imgSrc: '/assets/ac.jpg',
  },
];
