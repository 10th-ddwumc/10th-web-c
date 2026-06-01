export interface CartItem {
  id: number;
  title: string;
  artist: string;
  amount: number;
  price: number;
  img: string;
}

export const cartItems: CartItem[] = [
  {
    id: 1,
    title: "Vancouver",
    artist: "OG Ocianic / 에픽하이",
    amount: 1,
    price: 29000,
    img: "https://picsum.photos/seed/1/60/60",
  },
  {
    id: 2,
    title: "Empty Island",
    artist: "루시",
    amount: 1,
    price: 16000,
    img: "https://picsum.photos/seed/2/60/60",
  },
  {
    id: 3,
    title: "golden hour",
    artist: "IVE",
    amount: 1,
    price: 18000,
    img: "https://picsum.photos/seed/3/60/60",
  },
  {
    id: 4,
    title: "Home Sweet Home",
    artist: "기리보이",
    amount: 1,
    price: 35000,
    img: "https://picsum.photos/seed/4/60/60",
  },
  {
    id: 5,
    title: "Lemon",
    artist: "Kenshi Yonezu",
    amount: 1,
    price: 30000,
    img: "https://picsum.photos/seed/5/60/60",
  },
];