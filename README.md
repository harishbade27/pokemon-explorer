# Pokémon Explorer 🏆

A **Next.js Pokémon Explorer** that allows users to browse, search, filter, and view Pokémon details with a smooth UI and pagination.

---

## 🚀 Features
✅ **Browse Pokémon** with pagination  
✅ **Search Pokémon** by name  
✅ **Sort Pokémon** alphabetically or by base experience  
✅ **Filter Pokémon** by type (Fire, Water, Grass, etc.)  
✅ **View detailed Pokémon stats, abilities, and types**  
✅ **Fully responsive UI** (Works on mobile & desktop)  
✅ **Loading indicators** for a smooth experience  

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/harishbade27/pokemon-explore
cd pokemon-explorer

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Install Axios (for API Requests)

npm install axios

## 4️⃣ Run the Development Server

npm run dev

## 🔍 Approach & Explanation

## 1️⃣ Fetching Pokémon Data

* The app fetches paginated Pokémon data from PokéAPI.
* Pokémon details (name, type, stats, abilities) are fetched on demand when clicking a Pokémon.

## 2️⃣ Search, Sort & Filter
* Search: Filters Pokémon by name instantly.
* Sorting: Users can sort Pokémon alphabetically or by base experience.
* Filtering: Pokémon can be filtered by type (Fire, Water, etc.).

## 3️⃣ Responsive UI
* Mobile-friendly grid layout ensures Pokémon display nicely on all devices.
* Smooth animations and hover effects improve UX.
* Gradient buttons & loading spinners provide a modern feel.


## ⚖️ Challenges & Trade-offs

## 1️⃣ API Rate Limits
* Challenge: PokéAPI has rate limits, so fetching detailed Pokémon data for sorting can be slow.
* Solution: We fetch only paginated Pokémon first, then make parallel API calls to fetch details.

## 2️⃣ Performance Optimization
* Challenge: Fetching Pokémon details separately increases network requests.
* Solution: Used Promise.all() to fetch details asynchronously & efficiently.

## 3️⃣ UI & Responsiveness
* Challenge: Designing a UI that looks good on both desktop & mobile.
* Solution: Used Tailwind CSS for easy grid layouts, responsive padding, and adaptive buttons.

