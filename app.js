const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Initialize environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Dummy data array
let products = [
  {
    id: 1,
    name: "Diva Bridal Gowns",
    description: "A luxurious beaded silk dress perfect for weddings.",
    brand: "Hanel",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736344077/diva_bridal_gowns_yxkoar.jpg",
    ],
    categories: ["Evening Wear", "Dresses", "Weddings"],
  },
  {
    id: 2,
    name: "Viva Party Collection",
    description: "A stylish and comfortable party dresses for every occasion.",
    brand: "Evi's",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736344022/viva_party_collection_bspyfe.jpg",
    ],
    categories: ["Evening Wear", "Dresses", "Weddings"],
  },
  {
    id: 3,
    name: "Wedding Party Collection",
    description: "A beautiful Collection of Wedding Party Dresses.",
    brand: "Ara",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343869/wedding_party_collection_ijecs9.jpg",
    ],
    categories: ["Dresses", "Casual Wear", "Evening Wear", "Weddings"],
  },
  {
    id: 4,
    name: "Kimora Elegant Gowns",
    description: "Elegant gowns designed for comfort and all occasions.",
    brand: "Nira",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343706/kimora_elegant_gown_uykeaw.jpg",
    ],
    categories: ["Dresses", "Casual Wear", "Evening Wear", "Weddings"],
  },

  {
    id: 5,
    name: "Turtle Neck Beaded Gown",
    description: "A stylish turtle neck beaded gown for all occasions.",
    brand: "Nira",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343630/stylish_turtle-neck_beaded_gown_tczggw.jpg",
    ],
    categories: ["Dresses", "Casual Wear", "Evening Wear", "Weddings"],
  },
  {
    id: 6,
    name: "Lala African Party Gowns",
    description: "A luxurious silk dress perfect for evening wear.",
    brand: "Hanel",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343511/lala_african_party_gowns_nk1tws.jpg",
    ],
    categories: ["Evening Wear", "Dresses"],
  },
  {
    id: 7,
    name: "Sora Elite Gown",
    description: "A classic, stylish and party gown for all Occasions.",
    brand: "Evi's",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343374/sora_elite_gown_xcygkt.jpg",
    ],
    categories: ["Casual", "Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 8,
    name: "The Beauty Pageant Gown",
    description: "A beautiful beaded dress with a flowy silhouette.",
    brand: "Ara",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343307/beauty_pagent_gowns_qv1ekp.jpg",
    ],
    categories: ["Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 9,
    name: "Zoe Bridal Gowns",
    description: "Bridal gowns designed for exquisite Brides.",
    brand: "Nira",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343202/zoe_bridal_gowns_mauxjn.jpg",
    ],
    categories: ["Casual", "Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 10,
    name: "Stunning Pink Party Gown",
    description: "A stylish beaded gown for stunning ladies.",
    brand: "Hanel",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736343060/elegant_pink_bridal_gown_z02ndu.jpg",
    ],
    categories: ["Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 11,
    name: "Ella Stunning Bridal Gowns",
    description: "Vibrant Stunning Party Gowns.",
    brand: "M&C",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736342963/Ella_stunning_bridal_gowns_ufrdzr.jpg",
    ],
    categories: ["Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 12,
    name: "Cleo Gowns",
    description: "Party Dresses for the everyday woman.",
    brand: "Nira",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736342917/cleo_gowns_fwsk0z.jpg",
    ],
    categories: ["Dresses", "Evening Wear", "Weddings"],
  },
  {
    id: 13,
    name: "Funke Beaded Party Gowns",
    description:
      "A simple, comfortable african beautiful gowns  made of high-quality.",
    brand: "Evi's",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736342864/funke_beaded_party_gown_lmoe2c.jpg",
    ],
    categories: ["Dresses", "Casual"],
  },
  {
    id: 14,
    name: "Coral Gowns",
    description: "Beautiful gown designed to create a sleek silhouette.",
    brand: "Hanel",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736342817/coral_gown_l3tswz.jpg",
    ],
    categories: ["Dresses", "Casual"],
  },
  {
    id: 15,
    name: "Bella Party Dresses",
    description: "A soft and gorgeous dress, ideal for all party occasions.",
    brand: "Divalane",
    image: [
      "https://res.cloudinary.com/dxvfabxw8/image/upload/v1736342685/bella_party_dresses_py32kl.jpg",
    ],
    categories: ["Dresses", "Weddings", "Evening Wear"],
  },
];

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Route to create a new product
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, description, brand, categories } = req.body;
  const imageFile = req.file;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Image upload failed", error });
        }

        // Add new product to the array
        const newProduct = {
          id: uuidv4(),
          name,
          description,
          brand,
          image: result.secure_url, // Cloudinary image URL
          categories: categories ? categories.split(",") : [],
        };
        products.push(newProduct);

        // Respond with the newly created product
        res.status(201).json(newProduct);
      }
    );

    // Create a stream from the file
    const stream = cloudinary.uploader.upload_stream(result);
    stream.end(imageFile.buffer); // Upload the image file buffer
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
