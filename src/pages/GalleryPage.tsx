import InfiniteMenu from '../components/InfiniteMenu';
import '../components/InfiniteMenu.css';

const items = [
  { image: '/images/img00.jpg', link: 'https://google.com/' },
  { image: '/images/img03.webp', link: 'https://google.com/', title: 'Item 2', description: 'This is pretty cool, right?' },
  { image: 'https://picsum.photos/500/500?grayscale', link: 'https://google.com/', title: 'Item 3', description: 'This is pretty cool, right?' },
  { image: 'https://picsum.photos/600/600?grayscale', link: 'https://google.com/', title: 'Item 4', description: 'This is pretty cool, right?' },
  { image: 'https://picsum.photos/700/700?grayscale', link: 'https://google.com/', title: 'Item 5', description: 'This is pretty cool, right?' },
];

export default function Gallery() {
  return (
    <div className="infinite-menu-container">
      <InfiniteMenu items={items} />
    </div>
  );
}