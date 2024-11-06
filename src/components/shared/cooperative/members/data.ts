export type Member = {
  id: string;
  name: string;
  phone: string;
  type: string;
  location: string;
  category: string;
  date_joined: string;
  avatar: string;
};

export const sampleMembers: Member[] = [
  {
    id: "M001",
    name: "John Doe",
    phone: "+234 801 234 5678",
    type: "Farmer",
    location: "Lagos",
    category: "Crop",
    date_joined: "2023-01-15",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M002",
    name: "Amina Ibrahim",
    phone: "+234 802 345 6789",
    type: "Supplier",
    location: "Kano",
    category: "Livestock",
    date_joined: "2023-02-20",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M003",
    name: "Chukwu Okafor",
    phone: "+234 803 456 7890",
    type: "Distributor",
    location: "Enugu",
    category: "Poultry",
    date_joined: "2023-03-10",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M004",
    name: "Fatima Bello",
    phone: "+234 804 567 8901",
    type: "Farmer",
    location: "Kaduna",
    category: "Vegetables",
    date_joined: "2023-04-05",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M005",
    name: "Oluwaseun Adeyemi",
    phone: "+234 805 678 9012",
    type: "Processor",
    location: "Ibadan",
    category: "Grains",
    date_joined: "2023-05-12",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M006",
    name: "Hauwa Musa",
    phone: "+234 806 789 0123",
    type: "Farmer",
    location: "Sokoto",
    category: "Fruits",
    date_joined: "2023-06-18",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M007",
    name: "Emmanuel Okonkwo",
    phone: "+234 807 890 1234",
    type: "Supplier",
    location: "Port Harcourt",
    category: "Fish",
    date_joined: "2023-07-22",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M008",
    name: "Aisha Yusuf",
    phone: "+234 808 901 2345",
    type: "Distributor",
    location: "Abuja",
    category: "Dairy",
    date_joined: "2023-08-30",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M009",
    name: "Tunde Bakare",
    phone: "+234 809 012 3456",
    type: "Processor",
    location: "Abeokuta",
    category: "Cassava",
    date_joined: "2023-09-14",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "M010",
    name: "Zainab Abdullahi",
    phone: "+234 810 123 4567",
    type: "Farmer",
    location: "Maiduguri",
    category: "Rice",
    date_joined: "2023-10-25",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];
