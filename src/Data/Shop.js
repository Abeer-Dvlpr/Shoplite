
import Drone from "../Images/ShopIMG/Drone.png"
import Applewatch from "../Images/ShopIMG/Watch.png"
import Monitor from "../Images/ShopIMG/Monitor.png"
import Mac from "../Images/ShopIMG/Mac.png"
// import highspe from "../Images/ShopIMG/Highspeaker.png"
// import Watch from "../Images/ShopIMG/sWatch.png"
// import Applelaptop from "../Images/ShopIMG/Mac.png"
import Headphone from "../Images/ShopIMG/Headphone.png"
// import Airpod from "../Images/ShopIMG/Airpods.png"
import bluspeaker from "../Images/ShopIMG/Bluspeaker.png"
// import laptop from "../Images/ShopIMG/Applelaptop.png"





const Sproduct = [
  {
    id: "Mac",
    name: "Mac book Pro",
    IMG: Mac,
    price: 2000,
    stock: 2,
    images: [Mac, Mac, Mac],
    colors: ["Orange", "Green", "Blue", "Black"],
    sizes: ["XL", "L", "M", "S"],
    sku: "1223",
    category: "Phone",
    tags: ["Classic", "Modern"],
    description: "Flagship Apple device with A17 Bionic chip and Titanium body.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: [
      {
        name: "Emma Chamberlin",
        date: "11/22/2022",
        rating: 5,
        comment: "Awesome product! Loved it.",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Thompson Jr.",
        date: "11/22/2022",
        rating: 4,
        comment: "Solid performance and camera quality!",
        image: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    ]
  },
  {
    id: "iphone-16",
    name: "iPhone 16 Pro Max",
    price: 2100,
    stock: 2,
    IMG:Drone,
    images: [Drone, Drone,Drone ],
    colors: ["Orange", "Green", "Blue", "Black"],
    sizes: ["XL", "L", "M", "S"],
    sku: "1224",
    category: "Phone",
    tags: ["Flagship", "New"],
    description: "Latest Apple device with enhanced camera and faster processor.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: []
  },
  {
    id: "Apple Watch",
    name: "Apple Watch 17",
    price: 2200,
    stock: 3,
    IMG:Applewatch,
    images: [Applewatch, Applewatch, Applewatch],
    colors: ["Red", "Black", "Silver"],
    sizes: ["128GB", "256GB", "512GB"],
    sku: "1225",
    category: "Phone",
    tags: ["Elegant", "Luxury"],
    description: "Premium build with best-in-class performance and features.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: []
  },
  {
    id: "Monitor",
    name: "Monitor HD",
    price: 2300,
    stock: 4,
    IMG:Monitor,
    images: [Monitor, Monitor, Monitor],
    colors: ["White", "Blue", "Gold"],
    sizes: ["128GB", "256GB", "512GB"],
    sku: "1226",
    category: "Phone",
    tags: ["Powerful", "Stylish"],
    description: "Cutting-edge smartphone with revolutionary performance upgrades.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: []
  },
  {
    id: "Headphone",
    name: "Best Headphone",
    price: 600,
    stock: 3,
    IMG:Headphone,
    images: [Headphone, Headphone, Headphone],
    colors: ["White", "Blue", "Gold"],
    sizes: ["128GB", "256GB", "512GB"],
    sku: "1226",
    category: "Phone",
    tags: ["Powerful", "Stylish"],
    description: "Cutting-edge smartphone with revolutionary performance upgrades.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: []
  },
  {
    id: "Blutooth Speaker",
    name: "Blutooth Speaker",
    price: 900,
    stock: 1,
    IMG:bluspeaker,
    images: [bluspeaker, bluspeaker, bluspeaker],
    colors: ["White", "Blue", "Gold"],
    sizes: ["128GB", "256GB", "512GB"],
    sku: "1226",
    category: "Phone",
    tags: ["Powerful", "Stylish"],
    description: "Cutting-edge smartphone with revolutionary performance upgrades.",
    additional_information: {
      name: "Dimensions",
      height: "6.33",
      width: "6.33",
      depth: "6.33",
      weight: "6.33"
    },
    reviews: []
  }
];

export default Sproduct;
